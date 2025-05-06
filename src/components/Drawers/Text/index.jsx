import React, { useEffect, useState } from "react";
import "./text.css";
import TextEditor from "components/Text-editor";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { debounce } from "lodash";

function DrawerText({
  isFirst,
  isLast,
  isSelected,
  handleSelectBlock,
  data,
  handleAddBlock,
  handleDeleteBlock,
  setIsOpenDeleteModal,
  handleCloneBlock,
  handleMoveUp,
  handleMoveDown,
  handleAddBlockFromBlock,
  cloneblock,
}) {
  const { isTransparentBackground, wP_bg, text, id } = data;
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "TTEEEMPPPP");
  const dispatch = useDispatch();
  const [editorText, setEditorText] = useState(`${text}`);
  const [mainData, setMainData] = useState({});

  const handleChange = (html) => {
    setEditorText(html);
  };

  const handleSaveText = () => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === id ? { ...block, text: editorText } : block
          ),
        })),
      },
    };
    setMainData(_data);
  };

  useEffect(() => {
    if (mainData) {
      console.log(mainData, "jljljljl");
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails?.project_structure,
          pages: templateDetails?.project_structure?.pages?.map((page) => ({
            ...page,
            blocks: page?.blocks?.map((block) =>
              block.id === id ? { ...block, text: editorText } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainData]);
  useEffect(() => {
    setEditorText(data.text || "");
  }, [data.text]);
  return (
    <div
      className={
        isSelected === "text" ? "block-builder selected" : "block-builder"
      }
      onClick={() => handleSelectBlock("text", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div
        className={`main-block block-1`}
        style={{
          backgroundColor: ` ${isTransparentBackground ? "transparent" : `${wP_bg}`}`,
        }}
      >
        <TextEditor
          text={editorText}
          handleChange={handleChange}
          handleSave={handleSaveText}
        />
      </div>
      {console.log(editorText, "editorText")}
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
        {console.log(isFirst, "isFirstisFirst")}
        {!isFirst && (<li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>)}
        {!isLast && (<li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>)}
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

export default DrawerText;
