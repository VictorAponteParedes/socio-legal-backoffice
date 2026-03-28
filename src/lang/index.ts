import Login from "./es/login.json";

// Definir el idioma actual, por ejemplo, 'es' para español
const currentLanguage = "es";

const translations = {
  es: {
    // Traducciones para el idioma español
    ...Login,
  },
};

// Función para obtener la traducción
const translate = (key: any) => {
  const keys = key.split(".");
  let result = translations[currentLanguage];

  for (const k of keys) {
    result = result[k];
    if (result === undefined) return key;
  }

  return result || key;
};

export { translate };
