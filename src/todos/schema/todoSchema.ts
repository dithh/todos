import { model, Schema } from 'mongoose'
import { TodoType } from '../../types/TodoType'

const todoSchema = new Schema<TodoType>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isFinished: { type: Boolean, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export const Todo = model<TodoType>('Todo', todoSchema)
