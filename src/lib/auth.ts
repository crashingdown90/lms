import { SignJWT, jwtVerify, JWTPayload } from "jose";

export const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "solasido-rahasia-super-aman-12345"
);

export async function signJwt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyJwt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
