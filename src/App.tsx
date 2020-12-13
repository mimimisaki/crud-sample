import React, { useEffect, useState } from "react";
import "./App.css";

interface Tasks {
  id: number;
  body: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Tasks[] | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const fetchTasks = async () => {
    const getTasks = await (await fetch("http://localhost:3001/tasks")).json();
    setTasks(getTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    console.log(inputText);
    setInputText(inputText);
  };

  const submitTask = () => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: inputText }),
    }).then(fetchTasks);
  };

  const putTask = (taskId: number) => {
    fetch("http://localhost:3001/tasks/" + taskId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: "やったよ" }),
    }).then(fetchTasks);
  };

  const deleteTask = (taskId: number) => {
    fetch("http://localhost:3001/tasks/" + taskId, {
      method: "DELETE",
    }).then(fetchTasks);
  };

  return (
    <div className="App">
      <div className="tasks">
        {tasks?.map((task) => {
          return (
            <div className="task" key={task.id}>
              {task.body}
              <button
                className="put"
                onClick={() => {
                  putTask(task.id);
                }}
              >
                put
              </button>
              <button
                className="delete"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
      <div id="task-form">
        <input type="text" id="task-input" onChange={changeText} />
        <button id="submit" onClick={submitTask}>
          submit
        </button>
      </div>
    </div>
  );
}
