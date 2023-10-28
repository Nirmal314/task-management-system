"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Note = ({ content }) => {
  const [editorHtml, setEditorHtml] = useState("");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
    ],
  };

  if (content) {
    setEditorHtml(content);
  }
  return (
    <div className="w-[75%] p-4 rounded">
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
      />

      <button className="px-4 py-1 bg-green-500 rounded-lg text-gray-100 text-lg">
        Save
      </button>
    </div>
  );
};

export default Note;
