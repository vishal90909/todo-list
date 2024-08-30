import { useState, useEffect } from "react";

function TodoList() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditable, setEditable] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (taskName.trim()) {
      const newTask = { task: taskName, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTaskName('');
    }
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const checkBoxChanges = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    setEditable(index);
    setEditText(tasks[index].task);
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, task: editText } : task
    ));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditable(null);
  };

  const cancelEdit = () => {
    setEditable(null);
    setEditText('');
  };

  return (
    <div className="container">
      <h1 className="textHead">Todo List</h1>
      <div className="input-data-wrapper">
        <input
          type="text"
          value={taskName}
          className="inputData"
          placeholder="Enter Task Name....."
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button className="addTask" onClick={addTask}>Add Task</button>
      </div>
      <div className="task-container">
        {tasks.length === 0 ? (
          <div className="no-task-message">No task added</div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
              {isEditable === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="editInput"
                  />
                  <button className="save-button" onClick={() => saveEdit(index)}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => checkBoxChanges(index)}
                    className="checkbox"
                  />
                  <input
                    type="text"
                    value={task.task}
                    readOnly
                    className={task.completed ? 'task-text completed' : 'task-text'}
                  />
                  <button className="edit-button" onClick={() => editTask(index)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
