"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ChartCard from "@/components/ui/ChartCard";

interface Props {
  api_id: string | null;
}

interface CountryData {
  country: string;
  count: string | number;
}

export default function CountryData({ api_id }: Props) {
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    if (!api_id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/dashboard?api_id=${api_id}`);
        setCountries(res.data.countries || []);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchData();
  }, [api_id]);

  // Transform to generic format for ChartCard
  const formatted = countries.map((c) => ({
    label: c.country,
    value: c.count,
  }));

  return <ChartCard title="Country" data={formatted} />;
}
