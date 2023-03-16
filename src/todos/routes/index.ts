import { Router } from 'express'
import {
    getAllUsers,
    getUserById,
    createUser,
    patchUser,
    deleteUserByid,
} from '../controllers/todosController'

export const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.patch('/:id', patchUser)

router.delete('/:id', deleteUserByid)

// router.put('/:id', putUserById)
