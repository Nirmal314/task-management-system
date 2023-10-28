"use client";

import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import Task from "./components/Task/page";
import "rodal/lib/rodal.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import "jspdf-autotable";

async function startJob() {
  await fetch("http://localhost:3000/api/schedule");
}
export default function Home() {
  const { user } = UserAuth();
  const router = useRouter();
  const tableRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (uid) {
      console.log("first");
      readTasks();
      startJob();
    }
  }, [uid]);

  const readTasks = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/getTasks/", {
      method: "POST",
      body: JSON.stringify({ uid }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await res.json();
    setTasks(data.tasksArr);
    setLoading(false);
  };

  const handleEditTask = async (tid) => {
    const res = await fetch("http://localhost:3000/api/markAsDone/", {
      method: "POST",
      body: JSON.stringify({ tid, uid }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const resp = await res.json();
    console.log(resp);
    readTasks();
  };

  const generateAndDownloadPDF = async () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#task-table" });
    pdf.save("table.pdf");
  };

  const handleDeleteTask = async (tid) => {
    const res = await fetch("http://localhost:3000/api/deleteTask/", {
      method: "DELETE",
      body: JSON.stringify({ tid, uid }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const resp = await res.json();
    console.log(resp);
    readTasks();
  };

  return (
    <div className="flex items-start justify-center w-full h-screen bg-gray-100">
      {user ? (
        <>
          {tasks.length === 0 && !loading ? (
            <>
              <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-center text-4xl mb-4 font-bold tracking-wide text-primary">
                  Welcome to Taskify!
                </p>
                <p className="text-2xl font-semibold text-center">
                  You did all your work! :D <br />{" "}
                  <span className="text-normal text-xl">
                    Or maybe... you did not add your tasks yet? :/ <br />
                    You can{" "}
                    <Link href={"/addtask"} className="text-primary underline">
                      add your first task from here :)
                    </Link>
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="container h-3/4 overflow-scroll mx-auto mt-28">
                <p className="text-center text-3xl">Your tasks</p>
                <button
                  // onClick={handleDownloadPDF}
                  onClick={generateAndDownloadPDF}
                  className="float-right mb-3 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-150"
                >
                  Export PDF
                </button>
                <table ref={tableRef} className="min-w-full border">
                  <thead className="sticky top-0 z-1 bg-white">
                    <tr>
                      <th className="px-4 py-2 bg-gray-100">Title</th>
                      <th className="px-4 py-2 bg-gray-100">Description</th>
                      <th className="px-4 py-2 bg-gray-100">Due Date</th>
                      <th className="px-4 py-2 bg-gray-100">Priority</th>
                      <th className="px-4 py-2 bg-gray-100">Status</th>
                      <th className="px-4 py-2 bg-gray-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks?.map((task, i) => (
                      <React.Fragment key={task.id}>
                        {loading || !uid ? (
                          <tr
                            className="border-t animate-pulse"
                            style={{ animationDelay: `${i * 500}ms` }}
                          >
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                          </tr>
                        ) : (
                          <>
                            <Task
                              key={i}
                              tasks={task}
                              onEdit={handleEditTask}
                              onDelete={handleDeleteTask}
                            />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <table id="task-table" className="min-w-full border hidden">
                  <thead className="sticky top-0 z-1 bg-white">
                    <tr>
                      <th className="px-4 py-2 bg-gray-100">Title</th>
                      <th className="px-4 py-2 bg-gray-100">Description</th>
                      <th className="px-4 py-2 bg-gray-100">Due Date</th>
                      <th className="px-4 py-2 bg-gray-100">Priority</th>
                      <th className="px-4 py-2 bg-gray-100">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks?.map((task, i) => (
                      <React.Fragment key={task.id}>
                        {loading || !uid ? (
                          <tr
                            className="border-t animate-pulse"
                            style={{ animationDelay: `${i * 500}ms` }}
                          >
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                            <td className="px-4 py-2 bg-gray-300">&nbsp;</td>
                          </tr>
                        ) : (
                          <>
                            <Task
                              key={i}
                              tasks={task}
                              onEdit={handleEditTask}
                              onDelete={handleDeleteTask}
                              disable={true}
                            />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <p className="text-4xl font-bold tracking-wide text-primary">
            Welcome to Taskify
          </p>
        </div>
      )}
    </div>
  );
}
