import { Todo } from '../schema'
import { Request, Response } from 'express'

export const getAllUsers = async (req: Request, res: Response) => {
    const todos = await Todo.find()
    res.json(todos)
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        if (todo) {
            res.json(todo)
        }
    } catch (e) {
        console.error(e)
        res.status(500)
        res.json({ message: 'There was an error' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const todo = await new Todo(req.body).save()
        res.json(todo)
    } catch (e) {
        console.error(e)
        res.status(500)
        res.json({ message: 'There was an error' })
    }
}

export const patchUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update = req.body
        console.log(update)
        const todo = await Todo.findByIdAndUpdate(id, update, { new: true })
        res.json({ message: `Todo ${id} updated`, data: todo })
    } catch (e) {
        console.error(e)
        res.status(500)
        res.json({ message: 'There was an error ' })
    }
}

export const replaceUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const update = req.body
        const todo = await Todo.findOneAndReplace({ _id: id }, update, {
            new: true,
        })
        res.json({ message: `Todo ${id} updated`, todo })
    } catch (e) {
        res.status(500)
        res.json({ message: 'There was an error ' })
    }
}
export const deleteUserByid = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Todo.findByIdAndDelete(id)
        res.json({ message: `Todo ${id} deleted` })
    } catch (e) {
        res.status(500)
        res.json({ message: 'There was an error ' })
    }
}
