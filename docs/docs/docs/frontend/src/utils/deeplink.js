// /frontend/src/utils/deeplink.js
export function buildDeepLink(baseUrl, params = {}) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
}
