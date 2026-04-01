// src/helper/media.ts
import { API_URL } from "@/constants";

export const getMediaUrl = (path?: string | null): string | undefined => {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = API_URL.replace("/api", "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};
