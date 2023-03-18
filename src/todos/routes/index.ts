import { Router } from 'express'
import {
    getAllTodos,
    getTodoById,
    createTodo,
    patchTodoById,
    deleteTodoById,
    replaceTodoById,
} from '../controllers/todos'

export const router = Router()

router.get('/', getAllTodos)

router.get('/:id', getTodoById)

router.post('/', createTodo)

router.patch('/:id', patchTodoById)

router.delete('/:id', deleteTodoById)

router.put('/:id', replaceTodoById)
