export default function getCookie(cookies, cookieName) {
  console.log(cookies);
  const cookiesSplit = cookies.split(";");
  const cookie = cookiesSplit.find((cookie) => cookie.includes(cookieName));
  return cookie.split("=")[1];
}
