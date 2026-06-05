import { useEffect, useState, useCallback } from "react";
import {
  mockProvinces,
  mockDistrictsByProvince,
  getPropertiesByFilter,
} from "../mocks/data";

// Lightweight mock-API layer. Replaces axios calls with realistic
// in-memory data + simulated network delay, so the demo runs without a backend.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function resolveMock(url) {
  if (!url) return {};

  if (url.startsWith("divisions/p")) {
    return { provinces: mockProvinces };
  }

  if (url.startsWith("divisions/d")) {
    const match = url.match(/provinceId=([^&]+)/);
    const provinceId = match ? match[1] : null;
    return { districts: mockDistrictsByProvince[provinceId] || [] };
  }

  if (url.includes("/properties")) {
    const params = new URLSearchParams(url.split("?")[1] || "");
    const provinceId = params.get("provinceId");
    const districtId = params.get("districtId");
    return { properties: getPropertiesByFilter({ provinceId, districtId }) };
  }

  return {};
}

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await delay(200);
      setData(resolveMock(url));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, reFetch: fetchData };
};

export default useFetch;
