import { Router } from 'express'
import { Todo } from '../schema'

export const router = Router()

router.get('/', async (_, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

router.get('/:id', async (req, res) => {
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
})

router.post('/', async (req, res) => {
    try {
        const todo = await new Todo(req.body).save()
        res.json(todo)
    } catch (e) {
        console.error(e)
        res.status(500)
        res.json({ message: 'There was an error' })
    }
})

router.patch('/:id', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findByIdAndDelete(id)
        res.json({ message: `Todo ${id} deleted` })
    } catch (e) {
        res.status(500)
        res.json({ message: 'There was an error ' })
    }
})
