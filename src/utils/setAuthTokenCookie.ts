import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { TokenDataType } from '../users/types/TokenDataType'

export const setAuthTokenCookie = (tokenData: TokenDataType, res: Response) => {
    const token = jwt.sign(tokenData, 'key')
    res.cookie('authToken', token, { httpOnly: true, secure: true })
}
