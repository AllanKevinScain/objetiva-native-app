export type ColorFieldsType = {
  primary: string;
  secondary: string;
  bg: string;
  bgModal: string;
  text: string;
  border: string;
};

export type ColorsType = {
  dark: ColorFieldsType;
  light: ColorFieldsType;
};

export const color: ColorsType = {
  dark: {
    primary: "#6366f1", // Indigo
    secondary: "#ec4899", // Pink
    bg: "#0f172a", // Slate 900
    bgModal: "#45556C", // Slate 500
    text: "#f8fafc", // Slate 50
    border: "#1e293b", // Slate 800,
  },
  light: {
    primary: "#4f46e5", // Indigo 600
    secondary: "#db2777", // Pink 600
    bg: "#ffffff",
    bgModal: "#D4D4D8", // Zink 400
    text: "#0f172a", // Slate 900
    border: "#e2e8f0", // Slate 200,
  },
};
