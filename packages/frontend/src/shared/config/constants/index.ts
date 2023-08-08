export const getEnvVar = (key: string) => {
  /*@ts-ignore*/
  const env = process.env[key];
  if (env === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return env || "";
};

export const NEXT_PUBLIC = "NEXT_PUBLIC_";
export const NAME_SERVICE = getEnvVar(`${NEXT_PUBLIC}NAME_SERVICE`);
export const SERVER_URI = getEnvVar(
  `${NEXT_PUBLIC}NEXT_PUBLIC_SERVER_URI`
);

export { Theme, LOCAL_STORAGE_THEME_KEY } from "./theme";
