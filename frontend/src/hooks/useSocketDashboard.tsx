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
     setLoading(true);

    socket = io(BACKEND_URL); // backend WebSocket server
    
    socket.emit('GetDashboardData', { selectedAPI });

    socket.on('DashboardData', (incomingData) => {
        // console.log(incomingData)
           setLoading(false); // ✅ data received
      setData(incomingData);
    });

    return () => {
      socket.emit('disconnectFromApi', { selectedAPI });
      socket.disconnect();
    };
  }, [selectedAPI]);

  return {data , loading};
};
