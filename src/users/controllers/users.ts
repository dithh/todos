import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../schema/user'
import { setAuthTokenCookie } from '../../utils/setAuthTokenCookie'

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(body.password, saltRounds)
        await User.create({ username: body.username, password: hashedPassword })
        res.json({ message: 'User was created' })
    } catch (e) {
        next(e)
    }
}

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req
        const user = await User.findOne({ username: body.username })

        if (!user) {
            return res.json({ message: 'User not found' })
        }
        const isPasswordValid = await bcrypt.compare(
            body.password,
            user.password
        )

        if (!isPasswordValid) {
            return res.json({ message: 'Password invalid' })
        }
        setAuthTokenCookie({ id: user.id }, res)
        res.json({ message: 'User logged in' })
    } catch (e) {
        next(e)
    }
}

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.clearCookie('token')
        res.json({ message: 'Logged out' })
    } catch (e) {
        next(e)
    }
}
