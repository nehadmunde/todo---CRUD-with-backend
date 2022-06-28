const todoModel = require("../model/todoModel");

class todoController {
  static getTodoData = async (req, res) => {
    try {
      const todoList = await todoModel.find();
      res.send(todoList);
    } catch (err) {
      console.log(err);
    }
  };

  static createTodo = async (req, res) => {
    try {
      let newData = new todoModel(req.body);
      let result = await newData.save();
      // console.log("data in result", result);
      res.send("data saved sucessfully");
    } catch (err) {
      res.send(err);
    }
  };

  // edit data
  static editTodo = async (req, res) => {
    // console.log(req.params.id);
    try {
      let newData = req.body;
      let result = await todoModel.findOne({ _id: req.params.id });
      // console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };

  //update data
  static updateTodo = async (req, res) => {
    // console.log("req.params.id", req.params.id);
    // console.log("req.body", req.body);
    try {
      let newData = req.body;
      let result = await todoModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
          },
        }
      );
      // console.log(result);

      res.send("data updated");
    } catch (err) {
      console.log(err);
    }
  };

  //delete data
  static deleteTodo = async (req, res) => {
    try {
      let newData = await todoModel.deleteOne({ _id: req.params.id });
      res.send(newData);
      // res.send("Data deleted");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = todoController;
