import { Todo } from '../schema'
import { NextFunction, Request, Response } from 'express'
import { handleResourceResponse } from '../../utils/handleResourceResponse'
import { TodoType } from '../types/TodoType'

export const getAllTodos = async (req: Request, res: Response) => {
    const todos = await Todo.find()
    res.json(todos)
}

export const getTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        handleResourceResponse<TodoType>(res, todo)
    } catch (e) {
        next(e)
    }
}

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await new Todo(req.body).save()
        res.json(todo)
    } catch (e) {
        next(e)
    }
}

export const patchTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const update = req.body
        const todo = await Todo.findByIdAndUpdate(id, update, { new: true })
        handleResourceResponse<TodoType>(res, todo)
    } catch (e) {
        next(e)
    }
}

export const replaceTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const update = req.body
        const todo = await Todo.findOneAndReplace({ _id: id }, update, {
            new: true,
        })
        handleResourceResponse<TodoType>(res, todo)
    } catch (e) {
        next(e)
    }
}
export const deleteTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)
        handleResourceResponse<TodoType>(res, todo)
    } catch (e) {
        next(e)
    }
}
