import { Schema } from 'mongoose'

export type TodoType = {
    name: string
    description: string
    isFinished: boolean
    owner: Schema.Types.ObjectId
}
