import { TodoType } from '../../todos/types/TodoType'
import { Schema } from 'mongoose'

export type UserType = {
    username: string
    password: string
    todos: Array<TodoType | Schema.Types.ObjectId>
}
