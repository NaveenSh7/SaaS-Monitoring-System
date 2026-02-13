// hooks/useSocketDashboard.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface DashboardData {
  StatusData: string;
  HoursData: HoursData1[];
  LatencyData : string | number;
  TrafficData : string | number;
}

type HoursData1 = {
  status : string;
  total_hours : number | string;
}


let socket: Socket;

export const useSocketDashboard = (selectedAPI: string ) => {
    const [data, setData] = useState<DashboardData>({
    StatusData: '',
    HoursData: [],
    LatencyData: 0,
    TrafficData: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!BACKEND_URL || !selectedAPI) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const loadingTimeout = setTimeout(() => {
      // Avoid infinite skeleton if backend never responds
      setLoading(false);
    }, 5000);

    socket = io(BACKEND_URL); // backend WebSocket server

    socket.emit('GetDashboardData', { selectedAPI });

    socket.on('DashboardData', (incomingData) => {
      setLoading(false); // ✅ data received
      clearTimeout(loadingTimeout);
      setData(incomingData);
    });

    socket.on('connect_error', () => {
      setLoading(false);
      clearTimeout(loadingTimeout);
    });

    return () => {
      clearTimeout(loadingTimeout);
      socket.emit('disconnectFromApi', { selectedAPI });
      socket.disconnect();
    };
  }, [selectedAPI]);

  return {data , loading};
};
