const router = require('express').Router();

const controller = require('../../../controllers/controller');
// /api/schedule prepended to every route


router.route('/getcustomersessions')
  .post(controller.getCustomerSessions)



// router.route('/:todoId')
//   .delete(controller.deleteTodoById)
//   .get(controller.getTodoById)
//   .patch(controller.updateTodoTitleById);


// when you want to update more than 1 property in an object

// PATCH  when you only want to update 1 property in an object
// router.get('/', (req, res) => {
//     connection.query(todoQueries.getschedule, (err, schedule) => {
//         res.json(schedule);
//     });
// });

// router.post('/', (req, res) => {
//     const { title } = req.body;

//     connection.query(todoQueries.insertTodo, title, (err, responseFromDb) => {
//         // This needs to be done on a DELETE REQUEST, UPDATE REQUEST, OR A POST REQUEST
//         connection.query(todoQueries.getschedule, (err, schedule) => {
//             res.json(schedule);
//         });
//     });
// });

module.exports = router;
