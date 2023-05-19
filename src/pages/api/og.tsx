import { ImageResponse } from "@vercel/og";

import { PlexoVerticalLogo } from "components/resources/ogImages/PlexoVerticalLogo";
import { PlexoLines } from "components/resources/ogImages/PlexoLines";

export const config = {
  runtime: "experimental-edge",
};

const imageOg = () => {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            color: "#DFDFDF",
            backgroundColor: "#0C0C0C",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", position: "absolute", top: 0, left: 150 }}>
            <PlexoVerticalLogo />
          </div>
          <div style={{ display: "flex", position: "absolute", top: 0, right: 150 }}>
            <PlexoLines />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginLeft: 200,
              width: 550,
              textAlign: "left",
            }}
          >
            <h1 style={{ fontSize: 130, fontWeight: 700, lineHeight: "4rem" }}>Plexo</h1>
            <h2 style={{ fontSize: 28 }}>
              Open-Source Project Management System for modern innovators
            </h2>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log({ error: e });
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default imageOg;
