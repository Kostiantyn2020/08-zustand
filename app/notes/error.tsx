"use client";

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      {reset && (
        <button
          onClick={reset}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
