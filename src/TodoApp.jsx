import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleComplete,
  editTodo,
  removeAllTodo,
  removeTodo,
} from "./store/slices/TodoSlice";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  const handleAdd = () => {
    if (input === "") {
      toast.error("Enter the value");
    } else {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleEdit = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  const handleSave = () => {
    dispatch(editTodo({ id: editId, text: input }));
    setEditId(null);
    setInput("");
    toast("Item edit successfully");
  };
  return (
    <>
      <div className="container">
        <h2>TODO APP</h2>
        <input
          type="text"
          id="taskInput"
          placeholder="Write anything..."
          autoComplete="off"
          name="todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {editId === null ? (
          <button className="add-btn" onClick={handleAdd}>
            ADD
          </button>
        ) : (
          <button className="add-btn" onClick={handleSave}>
            SAVE
          </button>
        )}

        <ul>
          {todos?.map((currValue, ind) => {
            return (
              <li key={currValue.id}>
                <div className="checkbox-wrapper-29">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      checked={currValue.completed}
                      onChange={() => dispatch(toggleComplete(currValue.id))}
                    />
                    <span className="checkbox__label" />
                    <span
                      style={{ marginLeft: "4px" }}
                      className={`checkbox__label ${
                        currValue.completed ? "completed" : ""
                      }`}
                    >
                      {currValue.text}
                    </span>
                  </label>
                </div>
                <div className="btn-container">
                  <FiEdit
                    className="edit-icon"
                    onClick={() => handleEdit(currValue.id, currValue.text)}
                  />
                  <MdDelete
                    className="delete-icon"
                    onClick={() => dispatch(removeTodo(currValue.id))}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        
      {todos.length > 0 && (
        <button className="delAll-btn" onClick={() => dispatch(removeAllTodo())}>
          Remove All
        </button>
      )}
        
      </div>
    </>
  );
};

export default TodoApp;
