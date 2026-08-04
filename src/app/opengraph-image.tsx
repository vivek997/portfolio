import { ImageResponse } from "next/og";
import { personal } from "@/data/portfolio";

export const alt = `${personal.name} - ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#05070a",
          padding: 64,
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            border: "1px solid #21262d",
            borderRadius: 16,
            background: "#0d1117",
            boxShadow: "0 0 80px -20px rgba(57,217,122,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "22px 28px",
              borderBottom: "1px solid #21262d",
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#f85149" }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#e3b341" }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#39d97a" }} />
            <div style={{ marginLeft: 16, color: "#6e7681", fontSize: 22 }}>
              guest@vivekrawal: ~
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "48px 56px",
              gap: 18,
            }}
          >
            <div style={{ display: "flex", color: "#39d97a", fontSize: 30 }}>$ whoami</div>
            <div style={{ display: "flex", color: "#f3f6f8", fontSize: 76, fontWeight: 700 }}>
              {personal.name}
            </div>
            <div style={{ display: "flex", color: "#22d3ee", fontSize: 34 }}>
              {personal.role}
            </div>
            <div style={{ display: "flex", color: "#6e7681", fontSize: 28, marginTop: 8 }}>
              {personal.location}
            </div>
            <div
              style={{
                display: "flex",
                color: "#5cf7a3",
                fontSize: 30,
                marginTop: "auto",
              }}
            >
              vivekrawal.in
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
