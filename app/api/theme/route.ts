// app/api/theme/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const theme = {
    colors: {
      primary: "#2e86c1",
      secondary: "#17a589",
      backgroundLight: "##ecf0f1",
      backgroundDark: "#aeb6bf",
      textPrimary: "#2c3e50",
      textSecondary: "#85929e",
      border: "#8e44ad",
      divider: "#f1c40f",
      hover: "#f3f4f6",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "2rem",
      lg: "3rem",
      xl: "4rem",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        small: "12px",
        medium: "16px",
        large: "20px",
        extraLarge: "24px",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    borderRadius: {
      small: "1rem",
      medium: "1.5rem",
      large: "2rem",
    },
    shadows: {
      small: "0 1px 2px rgba(0, 0, 0, 0.1)",
      medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
      large: "0 10px 15px rgba(0, 0, 0, 0.2)",
    },
    breakpoints: {
      mobile: "480px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1200px",
    },
  };

  return NextResponse.json(theme); // Respond with the theme object
}
