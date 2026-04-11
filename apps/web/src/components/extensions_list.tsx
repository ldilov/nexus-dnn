import { useEffect, useState } from "react";
import { type Extension, fetchExtensions } from "../api/client";

export function ExtensionsList() {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExtensions()
      .then(setExtensions)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      );
  }, []);

  if (error) return <div style={{ color: "#e55" }}>{error}</div>;

  return (
    <div>
      <h3>Extensions</h3>
      {extensions.length === 0 && <p>No extensions loaded</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {extensions.map((ext) => (
          <li key={ext.id} style={{ marginBottom: 6 }}>
            <strong>{ext.name}</strong> v{ext.version}
            <span style={{ marginLeft: 8, opacity: 0.7 }}>{ext.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
