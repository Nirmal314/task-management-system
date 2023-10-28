import React, { useEffect, useState } from "react";

const Task = ({ tasks, onEdit, onDelete, disable }) => {
  const { title, description, due_date, priority, completed, uid, id } = tasks;
  const [isExpired, setIsExpired] = useState(null);

  useEffect(() => {
    const today = new Date();
    const dd = new Date(due_date);

    if (today <= dd) {
      setIsExpired(false);
    } else {
      setIsExpired(true);
    }
  }, [tasks]);
  return (
    <>
      <tr className={`border-t ${isExpired ? "bg-gray-300" : "bg-gray-100"}`}>
        <td className="px-4 py-2 text-center">{title}</td>
        <td className="px-4 py-2 text-center">{description}</td>
        <td className="px-4 py-2 text-center">{due_date}</td>
        <td className="px-4 py-2 text-center">{priority}</td>
        <td
          className={`px-4 py-2 text-center ${
            isExpired
              ? "text-gray-600"
              : `${completed ? "text-green-500" : "text-red-500"}`
          }`}
        >
          {isExpired ? "Expired" : `${completed ? "Completed" : "Incomplete"}`}
        </td>
        {!disable ? (
          <td className="px-4 py-2 text-center">
            {completed || isExpired ? (
              <></>
            ) : (
              <>
                <button
                  className="px-2 mr-4 py-1 bg-blue-500 text-white rounded"
                  onClick={() => onEdit(id)}
                >
                  Mark As Done
                </button>
              </>
            )}
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </td>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};

export default Task;
