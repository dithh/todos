import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { todosRouter as todosRouter } from './todos/routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import type { ErrorRequestHandler } from 'express'
import { usersRouter } from './users/routes/usersRouter'

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
    const { token } = req.cookies
    if (!token) {
        res.status(401)
        res.send({ message: 'Unathorized' })
    } else {
        next()
    }
}

export const app = express()
mongoose
    .connect(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/todos`)
    .then(() => console.log('mongo connected'))
    .catch((error) => console.log(error))

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', usersRouter)
app.use(authorizationHandler)
app.use('/api/todos', todosRouter)
app.use(globalErrorHandler)
