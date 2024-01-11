export function redirectUrl(url) {
  if (url.includes("http://") || url.includes("https://")) return url;
  return `http://${url}`;
}
