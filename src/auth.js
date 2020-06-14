export function isUserAuthenticated(user) {
  const currentTime = Date.now() / 1000;
  return !!user && currentTime < user.expires;
}

export function isAdmin(user) {
  return isUserAuthenticated(user) && user.role === "admin";
}
