import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { todosRouter as todosRouter } from './todos/routes/todosRouter'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import type { ErrorRequestHandler } from 'express'
import { usersRouter } from './users/routes/usersRouter'
import jwt from 'jsonwebtoken'
import { TokenDataType } from './types/TokenDataType'

dotenv.config()

const globalErrorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    res.status(400)
    res.json({ message: err.message })
}

const authorizationHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authToken } = req.cookies
    const tokenData = <TokenDataType>(
        jwt.verify(authToken, <string>process.env['JWT_SECRET'])
    )

    if (!authToken || !tokenData) {
        res.status(401)
        res.send({ message: 'Unathorized' })
        return
    }
    req.body.userId = tokenData.id
    next()
}

export const app = express()
mongoose
    .connect(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/todos`)
    .then(() => console.log('mongo connected'))
    .catch((error) => console.error(error))

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', usersRouter)
app.use(authorizationHandler)
app.use('/api/todos', todosRouter)
app.use(globalErrorHandler)
