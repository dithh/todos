import {model, Schema} from "mongoose";

export interface ITodo  {
    name:string,
    description:string,
    isFinished:boolean
}

const todoSchema = new Schema<ITodo>({
    name: {type:String,required:true,},
    description: {type:String,required:true,},
    isFinished: {type:Boolean,required:true,}
});

export const Todo = model<ITodo>('Todo',todoSchema)
