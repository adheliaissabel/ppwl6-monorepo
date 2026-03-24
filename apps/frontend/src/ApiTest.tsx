import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ApiResponse, HealthCheck } from "shared";

export default function App() {
  const [response, setResponse] = useState<string>("");

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000");

      // Parse JSON sesuai tipe shared
      const data: ApiResponse<HealthCheck> = await res.json();

      // Gunakan data dari response
      setResponse(data.data.status); // "ok" atau "error"
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button onClick={handleClick}>Get Response</Button>

      <div className="p-4 border rounded w-96">
        <b>Server Response:</b>
        <p>{response}</p>
      </div>
    </div>
  );
}