import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#003f2c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 800, opacity: 0.85 }}>CivoraX Infra Pvt. Ltd.</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16, lineHeight: 1.05 }}>
          House Designs &amp; Construction in Nepal
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.8 }}>
          Itahari · Dharan · Damak · Biratnagar · Birtamode — house designs, cost estimates, turnkey homes
        </div>
      </div>
    ),
    { ...size }
  );
}
