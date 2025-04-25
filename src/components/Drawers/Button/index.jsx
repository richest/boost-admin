import React, { useEffect, useState } from "react";
import "./button.css";
import TextEditor from "components/Text-editor";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerButton({
  isSelected,
  handleSelectBlock,
  data,
  handleDeleteBlock,
  cloneblock,
  handleMoveDown,
  handleMoveUp,
  handleAddBlockFromBlock,
}) {
  console.log(data, "data?.textdata?.textdata?.text");
  const [mainData, setMainData] = useState();
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [editorText, setEditorText] = useState(`${data?.text}`);

  const handleChange = (html) => {
    setEditorText(html);
  };
  const dispatch = useDispatch();

  const handleSaveText = () => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id ? { ...block, text: editorText } : block
          ),
        })),
      },
    };
    setMainData(_data);
  };

  useEffect(() => {
    if (mainData) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails?.project_structure,
          pages: templateDetails?.project_structure?.pages?.map((page) => ({
            ...page,
            blocks: page?.blocks?.map((block) =>
              block.id === data?.id ? { ...block, text: editorText } : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainData]);

  useEffect(() => {
    setEditorText(`${data?.text}`);
  }, [data]);

  return (
    <div
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("button", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="main-block block-5 button-wrap">
        <div className={`${data?.pulse ? "pulseAnimation" : ""}`}>
          <div
            className="block-button"
            style={{
              borderRadius: `${data?.brad || "2"}px`,
              backgroundColor: `${data?.bc || "#20A2B8"}`,
              minWidth: "150px",
            }}
          >
            <TextEditor
              handleChange={handleChange}
              handleSave={handleSaveText}
              text={editorText}
            />
          </div>
        </div>
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
