import { Router } from 'express'
import {
    getAllUsers,
    getUserById,
    createUser,
    patchUserById,
    deleteUserByid,
    replaceUserById,
} from '../controllers/todos'

export const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.patch('/:id', patchUserById)

router.delete('/:id', deleteUserByid)

router.put('/:id', replaceUserById)
