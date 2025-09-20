export const StatusColor = {
  PENDING: "#F0AD4E",
  PROCESSING: "#5BC0DE",
  CANCELLED: "#D8534E",
  COMPLETED: "#5CB85B",
};

export const defaultTheme = {
  colors: {
    primary: "#6BBD49",
    secondary: "#1A1A1A",
    backgroundLight: "#FFFFFF",
    backgroundDark: "#333E48",
    textPrimary: "#333E48",
    textSecondary: "#FFFFFF",
    border: "#DDDDDD",
    divider: "#CCCCCC",
    hover: "#F3F4F6",
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

export const formatCurrency = (number: number, currency: string = "NPR") => {
  if (currency == null) currency = "NPR";
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return CURRENCY_FORMATTER.format(number);
};

export const capitalizeWords = (str: string) =>
  str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");