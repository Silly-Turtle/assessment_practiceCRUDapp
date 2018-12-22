const List = require('./models')
controllers = {};


controllers.create = function (req, res, next) {
  console.log("***", req.body)
  console.log("****", req.params)
  const newTask = List({...req.body, status: 'undone'});

  newTask.save(function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully added to db!')
    }
  })
  next();
}

controllers.find = function (req, res, next) {
  List.find({}, function(err, docs) {
    if (err) {
      console.log(err)
    } else {
      const tmp = docs;

      let tasks = [];
      for (let i=0; i<tmp.length; i++) {
        tasks.push(tmp[i].task)
        if (tmp[i].status === 'done') {
          tasks.push(tmp[i].status)
        }
      }
      res.locals.taskList = tasks
      console.log('before locals', res.locals)
    }
    next();
  })
}

controllers.update = function (req, res, next) {
  console.log('update body', req.body.completed)
  List.findOneAndUpdate({"task": req.body.completed}, {$set: {'status': 'done'}}, {new: true}, () => {})
  next();
}

controllers.delete = function(req, res, next) {
  List.findOneAndDelete({"task": req.body.delete}, () => {})
  next();
}

module.exports = controllers
