export function getSavedContext(cacheKey: string, sessionStorage?: boolean) {
  if (sessionStorage) {
    return window.sessionStorage.getItem(cacheKey);
  }

  return window.localStorage.getItem(cacheKey);
}
