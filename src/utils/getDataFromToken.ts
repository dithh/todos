import { decode, JwtPayload } from 'jsonwebtoken'

export interface AuthTokenData extends JwtPayload {
    id?: string
}
export const getDataFromToken = (
    token: string
): string | AuthTokenData | null => decode(token)
