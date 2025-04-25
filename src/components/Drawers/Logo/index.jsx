import React from "react";
import "./logo.css";
import { Link } from "react-router-dom";
function DrawerLogo({
  isSelected,
  data,
  handleSelectBlock,
  handleDeleteBlock,
  cloneblock,
  handleMoveDown,
  handleMoveUp,
  handleAddBlockFromBlock,
}) {
  console.log(data, "checkdatafotthisss");
  return (
    <div
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("logo", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div
        className="main-block block-3"
        style={{
          textAlign: `${data?.position?.value}`,
          padding: `${data?.top}px ${data?.right}px ${data?.bottom}px ${data?.left}px`,
        }}
      >
        <img
          className=""
          src={data?.url}
          style={{ width: `${data?.width}%` }}
          alt="logo"
        />
      </div>
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
        <li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Clone"
          role="button"
          onClick={() => cloneblock(data.id)}
        >
          <i className="fa-solid fa-copy"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Remove"
          data-test="delete-block"
          role="button"
          onClick={() => handleDeleteBlock(data?.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  );
}

export default DrawerLogo;
