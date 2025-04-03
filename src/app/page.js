"use client";

import { useState } from "react";
import { useTask } from "./context/taskContext";
import AddForm from "./component/addForm";

export default function Home() {
  const { tasks, updateTask, deleteTask } = useTask();
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true; // Show all tasks
  });

  const handleCheckboxChange = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    updateTask(taskId, { completed: !taskToUpdate.completed });
  };

  return (
    <main className="p-4 bg-[#EAECC6] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <AddForm />
      <div className="mb-4">
        <button onClick={() => setFilter("All")} className="mr-2">All</button>
        <button onClick={() => setFilter("Completed")} className="mr-2">Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2 rounded flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <p className="ml-2">{task.description}</p>
            <p className="text-sm text-gray-500 ml-2">Due: {task.dueDate}</p>
            <p className={`text-sm ml-2 ${task.priority === "High" ? "text-red-500" : "text-blue-500"}`}>
              Priority: {task.priority}
            </p>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  deleteTask(task.id);
                }
              }}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
