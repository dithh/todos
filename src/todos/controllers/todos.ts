import { Todo } from '../schema/todo'
import { NextFunction, Request, Response } from 'express'
import { sendResourceIfExists } from '../../utils/sendResourceIfExists'
import { TodoType } from '../../types/TodoType'
import { User } from '../../users/schema/user'

export const getAllTodos = async (req: Request, res: Response) => {
    const { userId } = req.body
    const user = await User.findById(userId)

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
        const { userId } = req.body
        const todo = await Todo.findOne({ owner: userId, _id: todoId })

        sendResourceIfExists<TodoType>(res, todo, Todo.modelName)
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
        const { userId } = req.body
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ message: 'User not found' })
        }

        const todo = await new Todo({ ...req.body, owner: userId }).save()

        user.todos.push(todo.id)
        await user.save()

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
        const { id: todoId } = req.params
        const update = req.body
        const { userId } = req.body
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, owner: userId },
            { ...update, owner: userId },
            { new: true }
        )

        sendResourceIfExists<TodoType>(res, todo, Todo.modelName)
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
        const { userId } = req.body
        const update = req.body
        const todo = await Todo.findOneAndReplace(
            { _id: todoId, owner: userId },
            { ...update, owner: userId },
            {
                new: true,
            }
        )

        sendResourceIfExists<TodoType>(res, todo, Todo.modelName)
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
        const { userId } = req.body
        const todo = await Todo.findOneAndDelete(
            { owner: userId, _id: todoId },
            { new: true }
        )

        sendResourceIfExists<TodoType>(res, todo, Todo.modelName)
    } catch (e) {
        next(e)
    }
}
