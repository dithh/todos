import {Router} from "express";
import {Todo} from "../schema";

const router = Router()

router.get('/',async (_, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

router.get('/:id',async (req,res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findById(id)
        if (todo) {
            res.json(todo)
        }
    } catch(e) {
        res.status(500)
        res.json({message:'There was an error'})
    }
})

router.post('/',async (req,res) => {
   try {
       const todo  = await new Todo(req.body).save()
       res.json(todo)
   } catch(e) {
       res.status(500)
       res.json({message:'There was an error'})
   }

})


export default router;