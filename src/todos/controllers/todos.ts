import { Todo } from '../schema'
import { NextFunction, Request, Response } from 'express'
import { sendResourceIfExists } from '../../utils/sendResourceIfExists'
import { TodoType } from '../types/TodoType'
import { AuthTokenData, getDataFromToken } from '../../utils/getDataFromToken'
import { User } from '../../users/schema/userSchema'

export const getAllTodos = async (req: Request, res: Response) => {
    const { authToken } = req.cookies
    const { id } = <AuthTokenData>getDataFromToken(authToken)
    const user = await User.findById(id)
    if (!user) {
        return res.json({ message: 'User not found' })
    }
    const { todos } = await user.populate('todos')
    res.json(todos)
}

export const getTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: todoId } = req.params
        const { authToken } = req.cookies
        const { id: userId } = <AuthTokenData>getDataFromToken(authToken)
        const todo = await Todo.findOne({ owner: userId, _id: todoId })
        sendResourceIfExists<TodoType>(res, todo, Todo.name)
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
        const { authToken } = req.cookies
        const { id } = <AuthTokenData>getDataFromToken(authToken)
        const user = await User.findById(id)
        if (user) {
            const todo = await new Todo({ ...req.body, owner: id }).save()
            user.todos.push(todo.id)
            await user.save()
            res.json(todo)
        }
        res.json({ message: 'User not found' })
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
        const { id: todoId } = req.params
        const update = req.body
        const { authToken } = req.cookies
        const { id: userId } = <AuthTokenData>getDataFromToken(authToken)
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, owner: userId },
            { ...update, owner: userId },
            { new: true }
        )
        sendResourceIfExists<TodoType>(res, todo, 'Todo')
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
        const { id: todoId } = req.params
        const { authToken } = req.cookies
        const { id: userId } = <AuthTokenData>getDataFromToken(authToken)
        const update = req.body
        const todo = await Todo.findOneAndReplace(
            { _id: todoId, owner: userId },
            { ...update, owner: userId },
            {
                new: true,
            }
        )
        sendResourceIfExists<TodoType>(res, todo, 'Todo')
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
        const { id: todoId } = req.params
        const { authToken } = req.cookies
        const { id: userId } = <AuthTokenData>getDataFromToken(authToken)
        const todo = await Todo.findOneAndDelete(
            { owner: userId, _id: todoId },
            { new: true }
        )
        sendResourceIfExists<TodoType>(res, todo, 'Todo')
    } catch (e) {
        next(e)
    }
}
