"use client";

import { useState } from "react";
import { useTask } from "../context/taskContext";

const AddForm = () => {
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded p-2 mb-2 w-full" required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 mb-2 w-full" required></textarea>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border rounded p-2 mb-2 w-full" required />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded p-2 mb-2 w-full">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default AddForm;
