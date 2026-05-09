export type ColorFieldsType = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textOnPrimary: string;
  success: string;
  warning: string;
  error: string;
  border: string;
  white: string;
  black: string;
  transparent: string;
};
export type ColorsType = {
  dark: ColorFieldsType;
  light: ColorFieldsType;
};

export const color: ColorsType = {
  dark: {
    primary: "#3b82f6",
    secondary: "#a855f7",

    background: "#0f172a",
    surface: "#1e293b",
    surfaceSecondary: "#334155",

    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textOnPrimary: "#ffffff",

    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",

    border: "#334155",

    white: "#ffffff",
    black: "#000000",
    transparent: "transparent",
  },
  light: {
    primary: "#3b82f6",
    secondary: "#a855f7",

    background: "#f8fafc",
    surface: "#ffffff",
    surfaceSecondary: "#f1f5f9",

    textPrimary: "#0f172a",
    textSecondary: "#64748b",
    textOnPrimary: "#ffffff",

    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",

    border: "#e2e8f0",

    white: "#ffffff",
    black: "#000000",
    transparent: "transparent",
  },
};
