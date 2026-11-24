import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px", background: "#f8fafc", color: "#111827",
      }}>
        <div style={{ fontSize: 28, color: "#1d4ed8", marginBottom: 24 }}>SAN LORENZO WARD</div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>Sacrament Meeting Planner</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#4b5563" }}>Plan and view sacrament meeting programs.</div>
      </div>
    ),
    { ...size },
  );
}
