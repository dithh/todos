import jwt, { decode, JwtPayload } from 'jsonwebtoken'
import { TokenDataType } from '../types/TokenDataType'
import { Response } from 'express'

export interface AuthTokenData extends JwtPayload {
    id?: string
}

export const setAuthTokenCookie = (tokenData: TokenDataType, res: Response) => {
    const token = jwt.sign(tokenData, <string>process.env['JWT_SECRET'])
    res.cookie('authToken', token, { httpOnly: true, secure: true })
}
