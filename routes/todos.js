var express = require('express');
var router = express.Router({ mergeParams : true });

  // {
  //   id: 1,
  //   title: '',
  //   desc: '',
  //   created_at: '',
  //   due_date: '',
  //   completed: true,
  // },
let todosList = [
  'Buy milk',
  'Read a book',
  'Call mom',
  'Buy a gift for BFF'
];

let completedTodos = [
  'Buy goreceries'
];

// CRUD functionality

/* GET todos listing. */
// R = Read
router.get('/', function(req, res, next) {
  res.render('list_all_todos', {
    activeTodos: todosList,
    completedTodos: completedTodos,
    actionUrl: 'store',
  });
});

// C = Create
router.post('/store', (req, res) => {
  // let newtodo = req.body.new_todo;
  todosList.push(req.body.new_todo);
  res.redirect('/todos');
});

router.get('/complete/:id', (req, res) => {
  deleteTodo(req.params.id, true);
  res.redirect('/todos');
});

// D = Delete
router.delete('/delete/:id', (req, res) => {
  deleteTodo(req.params.id);
  res.redirect('/todos');
});

// U = Update
router.get('/edit/:id', (req, res) => {
  let todo = todosList[req.params.id];

  if (todo === undefined) {
    return;
  }

  res.render('edit_todo', {
    todo_id: req.params.id,
    todo: todo,
    actionUrl: 'update',
  });
});

router.put('/update', (req, res) => {
  todosList[req.body.todo_id] = req.body.new_todo;
  res.redirect('/todos');
});

function deleteTodo(idx, shouldComplete = false) {
  let foundTodo = todosList[idx];

  if (foundTodo === undefined) {
    return;
  }

  if (shouldComplete) {
    completedTodos.push(foundTodo);
  }

  delete todosList[idx];
}

module.exports = router;
