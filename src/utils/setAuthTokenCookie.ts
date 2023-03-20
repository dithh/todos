import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { TokenDataType } from '../types/TokenDataType'

export const setAuthTokenCookie = (tokenData: TokenDataType, res: Response) => {
    const token = jwt.sign(tokenData, <string>process.env['JWT_SECRET'])
    res.cookie('authToken', token, { httpOnly: true, secure: true })
}
