import { Router } from 'express'
import {
    getAllTodos,
    getTodoById,
    createTodo,
    patchTodoById,
    deleteTodoById,
    replaceTodoById,
} from './todosController'

export const todosRouter = Router()

todosRouter.get('/', getAllTodos)

todosRouter.get('/:id', getTodoById)

todosRouter.post('/', createTodo)

todosRouter.patch('/:id', patchTodoById)

todosRouter.delete('/:id', deleteTodoById)

todosRouter.put('/:id', replaceTodoById)
