import React, { useEffect, useRef, useState } from "react";
import QuilEditor from "./QuilEditor";

function TextEditor({ text, handleChange, handleSave }) {
  const [isEditable, setIsEditable] = useState(false);
  const editorRef = useRef(null);

  const handleTextClick = () => {
    setIsEditable(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setIsEditable(false);
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`quill-text-editor ${isEditable ? "" : "read-only"}`}
      onClick={handleTextClick}
      ref={editorRef}
    >
      <QuilEditor
        handleChange={(val) =>
          handleChange(val.trim() === "<p><br></p>" ? "" : val)
        }
        placeholder="" // Static placeholder
        isEditable={isEditable}
        text={text || ""}
      />
    </div>
  );
}

export default TextEditor;
