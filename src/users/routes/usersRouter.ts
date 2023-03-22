import { Router } from 'express'
import {
    createUser,
    loginUser,
    logoutUser,
} from '../controllers/usersController'

export const usersRouter = Router()

usersRouter.post('/signup', createUser)
usersRouter.post('/login', loginUser)
usersRouter.get('/logout', logoutUser)
