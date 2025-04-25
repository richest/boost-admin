import React, { useEffect, useState } from "react";
import "./text-image.css";
import TextEditor from "components/Text-editor";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
function DrawerTextImage({
  isSelected,
  handleSelectBlock,
  data,
  handleDeleteBlock,
  handleMoveUp,
  handleMoveDown,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [editorText, setEditorText] = useState(`${data?.text}`);
  const [editorTextButton, setEditorTextButton] = useState(
    `${data?.buttonText}`
  );

  const [mainData, setMainData] = useState();
  const [mainDataButton, setMainDataButton] = useState();
  const dispatch = useDispatch();

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
            block.id === data?.id ? { ...block, text: editorText } : block
          ),
        })),
      },
    };
    setMainData(_data);
  };

  const handleChangeButtonText = (html) => {
    setEditorTextButton(html);
  };

  const handleSaveTextButtonText = () => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? { ...block, buttonText: editorTextButton }
              : block
          ),
        })),
      },
    };
    setMainDataButton(_data);
  };

  useEffect(() => {
    if (mainData) {
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
      dispatch(updateTemplateAction(_data));
    }
  }, [mainData]);

  useEffect(() => {
    if (mainDataButton) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === data?.id
                ? { ...block, buttonText: editorTextButton }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainDataButton]);

  return (
    <div
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("text-image", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div
        className={`main-block block-8 ${data?.textPosition === "left" && "text-right-left"}`}
        style={{
          backgroundColor: `${data?.isTransparentBackground ? "transparent" : data?.backgroundColor}`,
          flexDirection: `${data?.textPosition === "left" ? "row-reverse" : "row"} `,
        }}
      >
        <img src={data?.imageUrl} className="image-text_ewe21" />
        <div className="textImage-content_jsbf3">
          <p className="TextAndImage_contentText__YN2O8">
            <div>
              <TextEditor
                text={editorText}
                handleChange={handleChange}
                handleSave={handleSaveText}
              />
            </div>
          </p>
          {data?.isShowButton && (
            <div className="TextAndImage_Button__osWetw">
              <div
                className="Button_button__QOWDSA"
                style={{
                  borderRadius: `${data?.buttonBorderRadius}px`,

                  backgroundColor: `${data?.buttonBackgroundColor}`,
                }}
              >
                <div>
                  <TextEditor
                    text={editorTextButton}
                    handleChange={handleChangeButtonText}
                    handleSave={handleSaveTextButtonText}
                  />
                </div>
              </div>
            </div>
          )}
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

export default DrawerTextImage;
