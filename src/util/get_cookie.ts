export function getCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const cookies = document.cookie.split(/\s*;\s*/);
  const match = cookies.find((cookie) => cookie.startsWith(prefix));
  return match == null ? undefined : match.slice(prefix.length);
}
