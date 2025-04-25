import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css"; // Make sure to import the default Quill styles

const CustomEditor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState(`
    <p className="ql-align-center">
  <span style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">Click</span></p>`);
  const [theme, setTheme] = useState("snow");

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  const handleThemeChange = useCallback((newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  }, []);

  return (
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={CustomEditor.modules}
        formats={CustomEditor.formats}
        bounds={".app"}
        placeholder={placeholder}
      />
  );
};

/*
 * Quill modules to attach to editor
 * Includes font family, font size, text color, background color, alignment, list styles
 */
CustomEditor.modules = {
  toolbar: [
    [
      { font: [] },
      {
        size: [
          "8px",
          "10px",
          "12px",
          "14px",
          "18px",
          "24px",
          "32px",
          "48px",
          "64px",
          "96px",
        ],
      },
    ],
    [{ bold: true }, { italic: true }, { underline: true }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"],
    ["clean"], // Clear formatting button
  ],
  clipboard: {
    matchVisual: false, // Prevent extra line breaks when pasting HTML
  },
};

/*
 * Quill editor formats
 * Font family, font size, text color, text background, alignment, line height, list
 */
CustomEditor.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

/*
 * PropType validation
 */
CustomEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default CustomEditor;
