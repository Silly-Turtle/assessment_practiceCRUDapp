const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let listSchema = new Schema ({
  task: {type: String, required: true},
  status: {type: String}
})

module.exports = mongoose.model('list', listSchema);
