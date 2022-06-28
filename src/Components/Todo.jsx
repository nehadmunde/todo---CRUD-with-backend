import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState({
    name: "",
  });
  const [update, setUpdate] = useState({
    name: "",
  });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState([]);

  const changeHandle = (e) => {
    setTodo({ name: e.target.value });
    console.log(todo);
  };

  const updatechangeHandle = (e) => {
    setUpdate({ name: e.target.value });
    console.log("update", update);
  };

  // on submit
  const submitbtnHandle = async () => {
    await axios
      .post("http://localhost:9001/todo", todo)
      .then((res) => {
        alert("Record Saved");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on get data in edit
  const updatebtnHandle = async () => {
    console.log(id._id, update.name);
    await axios
      .put(`http://localhost:9001/todo/edit/${id._id}`, update)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //on edit
  const onEditHandle = async (i) => {
    await axios
      .get(`http://localhost:9001/todo/edit/${i}`)
      .then((res) => {
        setUpdate(res.data);
        setId(res.data);
        setEdit(true);
        console.log(res.data);
        // alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteHandle = async (i) => {
    await axios
      .delete(`http://localhost:9001/todo/delete/${i}`)
      .then((res) => {
        // console.log(res.data);
        alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on delete
  useEffect(() => {
    axios
      .get("http://localhost:9001/todo")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container row">
        <div className="col-sm-10 offset-2 mt-5">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Todo :
              </label>
              {update ? (
                <input
                  type="text"
                  name="updatename"
                  value={update.name}
                  className="form-control"
                  placeholder="Enter To do item Here.."
                  onChange={updatechangeHandle}
                />
              ) : (
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter To do item Here.."
                  onChange={changeHandle}
                />
              )}
            </div>

            {edit ? (
              <button className="btn btn-primary" onClick={updatebtnHandle}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={submitbtnHandle}>
                Submit
              </button>
            )}

            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Todo</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{ele.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning "
                          onClick={() => onEditHandle(ele._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger ms-4"
                          onClick={() => onDeleteHandle(ele._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default Todo;
