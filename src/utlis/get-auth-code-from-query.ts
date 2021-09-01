export const getAuthCodeFromQuery = (): string | null => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const authCode = urlSearchParams.get('code');
  return authCode;
};
