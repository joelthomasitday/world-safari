import { jwtVerify } from 'jose'

export async function verifyTokenEdge(token: string) {
  const secretEnv = process.env.JWT_SECRET || '';
  const secret = new TextEncoder().encode(secretEnv)
  const { payload } = await jwtVerify(token, secret)
  return payload
}
