var express = require('express')
var router = express.Router()
var createError = require('http-errors')

//mocking array of todos

const todos = [{id:1, name:'Do Something', completed:false}]

//  /todos

router.get('/', (req,res)=> {
    res.json(todos)
})

router.get('/:id', (req,res, next)=>{
    const foundTodo = todos.find((todo) => todo.id === Number(req.params.id))
   
    if (!foundTodo) {
        // 404
        return next(createError(404, 'Not Found'))
    }
    
    res.json(foundTodo)
})


router.post('/', (req,res,next)=> {
   const { body } = req

   if ( typeof body.name !== 'string') {
       return next(createError(422, 'Validation error'))
   }
   const newToDo = {
       id: todos.length + 1,
       name: body.name,
       completed: false
   }
   todos.push(newToDo)

   res.status(201).json(newToDo)
})

module.exports = router