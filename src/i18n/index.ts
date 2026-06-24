import { getLocales } from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { enUS } from "./locales/en-US";
import { ptBR } from "./locales/pt-BR";

const DEFAULT_LANGUAGE = "pt-BR";

const resources = {
  "pt-BR": {
    translation: ptBR,
  },
  "en-US": {
    translation: enUS,
  },
} as const;

type SupportedLanguage = keyof typeof resources;

const i18n = createInstance();

function isSupportedLanguage(language?: string | null): language is SupportedLanguage {
  return !!language && language in resources;
}

export function getDeviceLanguage(): SupportedLanguage {
  const locale = getLocales()[0];

  if (isSupportedLanguage(locale?.languageTag)) {
    return locale.languageTag;
  }

  if (locale?.languageCode === "en") {
    return "en-US";
  }

  return DEFAULT_LANGUAGE;
}

void i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export function syncLanguageWithDevice() {
  const deviceLanguage = getDeviceLanguage();

  if (i18n.language !== deviceLanguage) {
    void i18n.changeLanguage(deviceLanguage);
  }
}

export default i18n;
