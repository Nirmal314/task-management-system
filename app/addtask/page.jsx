"use client";

import { useState } from "react";
import { getUid } from "../uid";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const uid = getUid();
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !priority) {
      toast.error("Please enter all the fields.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (new Date() > new Date(dueDate)) {
      toast.error("Selected date is in the past.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const res = await fetch("http://localhost:3000/api/addTask/", {
        method: "POST",
        body: JSON.stringify({ title, description, dueDate, priority, uid }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      const resp = await res.json();
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-1/4 p-6 bg-white shadow rounded-lg">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center tracking-wide">
          Create Task
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-150"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
