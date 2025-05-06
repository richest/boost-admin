import React, { useEffect, useState } from "react";
import "./cover.css";
import TextEditor from "components/Text-editor";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
function DrawerCover({
  isSelected,
  isFirst,
  isLast,
  handleSelectBlock,
  data,
  handleDeleteBlock,
  handleMoveDown,
  handleMoveUp,
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

  let minHeight;
  if (data?.imageProportions === "1:1") {
    minHeight = "800px";
  } else if (data?.imageProportions === "5:4") {
    minHeight = "640px";
  } else if (data?.imageProportions === "4:3") {
    minHeight = "600px";
  } else if (data?.imageProportions === "3:2") {
    minHeight = "533.333px";
  } else if (data?.imageProportions === "16:9") {
    minHeight = "450px";
  } else {
    minHeight = "450px";
  }

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
      onClick={() => handleSelectBlock("cover", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="main-block block-7 cover-block">
        <div
          className="cover_background-image_derw21"
          style={{
            backgroundImage: `url(${data?.imageUrl})`,
            "--overlayColor": `rgba(0,0,0,${data?.darkenBackground / 100})`,
          }}
        ></div>

        <div
          className="conver-content_ddetw1"
          style={{
            minHeight: `${minHeight}`,
            justifyContent: `${"space-between"}`,
          }}
        >
          <div
            className="cover-content-logo_qwasf"
            style={{ textAlign: `${data?.logotypePosition}` }}
          >
            {data?.isShowLogotype && (
              <img
                src={data?.logotypeUrl}
                alt="logo"
                style={{ width: `${data?.logotypeScale}%` }}
              />
            )}
          </div>

          <div>
            <p className="cover-content-mainText_qwqwwqwq">
              <div>
                <TextEditor
                  text={editorText}
                  handleChange={handleChange}
                  handleSave={handleSaveText}
                />
              </div>
            </p>
            {data?.isShowButton && (
              <div
                className="conver-button-main_piewew"
                style={{ textAlign: `${data?.buttonPosition}` }}
              >
                <div style={{ display: `inline-block` }}>
                  <div
                    className="button_button_mainproperty_wewew"
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
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>

      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
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

export default DrawerCover;
