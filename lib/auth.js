export function checkAdminToken(request) {
  // Check Authorization header: Bearer <token>
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  // Also allow via cookie (for browser form submissions)
  const cookieToken = request.cookies?.get("nn_admin_token")?.value || "";

  const validToken = process.env.SECRET_POST_TOKEN;

  return token === validToken || cookieToken === validToken;
}

export function isValidAdminToken(token) {
  return token === process.env.SECRET_POST_TOKEN;
}
