import { ImageResponse } from "@vercel/og";

import { PlexoVerticalLogo } from "components/resources/ogImages/PlexoVerticalLogo";
import { PlexoLines } from "components/resources/ogImages/PlexoLines";
import { getFont } from "lib/ogFonts";

export const config = {
  runtime: "experimental-edge",
};

const imageOg = async () => {
  // Used for most languages
  const inter = await getFont({
    family: "DM Sans",
    weights: [400, 700] as const,
  });

  try {
    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            color: "#DFDFDF",
            backgroundColor: "#0C0C0C",
          }}
        >
          <div style={{ position: "absolute", display: "flex", top: 0, left: 150 }}>
            <PlexoVerticalLogo />
          </div>
          <div style={{ position: "absolute", display: "flex", top: 0, right: 150 }}>
            <PlexoLines />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 200,
              width: 600,
              textAlign: "left",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 130,
                fontWeight: 700,
              }}
            >
              Plexo
            </h1>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 400 }}>
              Open-Source Project Management System for modern innovators
            </h2>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "DM Sans", data: inter[400], weight: 400 },
          { name: "DM Sans", data: inter[700], weight: 700 },
        ],
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
