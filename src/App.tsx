import React, { useState } from "react";
import "./App.css";

interface Tasks {
  id: number;
  body: string;
}

const sampleTasks: Tasks[] = [
  {
    id: 1,
    body: "とりあえず表示してみる",
  },
  {
    id: 2,
    body: "私たち、いずれ書き換えられる運命",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Tasks[]>(sampleTasks);

  return (
    <div className="App">
      <div className="tasks">
        {tasks.map((task) => {
          return (
            <div className="task" key={task.id}>
              {task.body}
            </div>
          );
        })}
      </div>
    </div>
  );
}
