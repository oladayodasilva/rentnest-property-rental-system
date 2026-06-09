import { useEffect, useState } from "react";
import api from "../api/api";

const BackendTest = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/health")
      .then((response) => {
        setMessage(response.data);
      })
      .catch(() => {
        setMessage("Could not connect to backend");
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Backend Connection Test</h1>
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default BackendTest;