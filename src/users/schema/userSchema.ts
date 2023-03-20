import { model, Schema } from 'mongoose'
import { UserType } from '../../types/UserType'

const userSchema = new Schema<UserType>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo',
        },
    ],
})

export const User = model<UserType>('User', userSchema)
