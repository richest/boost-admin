import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuilEditor = ({ placeholder, isEditable, text, handleChange }) => {
  const [theme, setTheme] = useState("snow");

  return (
    <ReactQuill
      theme={theme}
      onChange={handleChange}
      value={text}
      bounds={".app"}
      modules={QuilEditor.modules}
      formats={QuilEditor.formats}
      placeholder={placeholder}
      readOnly={!isEditable}
    />
  );
};

/*
 * Quill modules and formats configuration
 */

QuilEditor.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

QuilEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "align",
  "indent",
  "link",
  "image",
  "video",
  "color",
];

QuilEditor.propTypes = {
  placeholder: PropTypes.string,
  isEditable: PropTypes.bool.isRequired,
};

export default QuilEditor;
