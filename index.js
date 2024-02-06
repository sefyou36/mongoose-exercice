const express = require('express');
const Todo = require('./models/todo');
require('./config/config')
const app = express();

app.use(express.json());

const port = 4500;

app.post('/api/v1/todo',(req,res)=>{

  const text = req.body.text;
  const todo = new Todo({
    text
  })
  todo.save()

res.json({
  todo:todo
})

});

app.get('/api/v1/todo',  async (req, res) => {
 
    const todos = await Todo.find(); 

    res.json({
      todos: todos 
    });
 
});

app.get('/api/v1/todo/:id', async (req,res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json({
    todo : todo
  })
})

app.put('/api/v1/todo/:id' , async (req,res) => {
  const id = req.params.id;
  const updates = req.body;

  const updateTodo = await Todo.findByIdAndUpdate(id, updates, {new:true});
  if (!updateTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json({
    updateTodo : updateTodo
  })
});

app.delete('/api/v1/todo/:id' , async (req,res) => {
  const id = req.params.id;
  const deleteTodo = await Todo.findByIdAndDelete(id)
  if (!deleteTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json({
    deleteTodo : deleteTodo
  })
})


app.listen(port, () => {
    console.log(`serveur is listening to ${port}...`);
  });
  