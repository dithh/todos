import { Router } from 'express'
import { createUser, loginUser } from '../controllers/users'

export const usersRouter = Router()

usersRouter.post('/signup', createUser)
usersRouter.post('/login', loginUser)
