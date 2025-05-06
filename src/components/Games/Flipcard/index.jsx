import TextEditor from "components/Text-editor";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";

function Flipcard({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  isFirst,
  isLast,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  console.log(data, "CHECKUNDERLIDUDJDJJDJNDKJNKJDKJJDBKJDBDqwerty");

  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);
  const [editorText, setEditorText] = useState(data?.frontText);
  const [editorTextBack, setEditorTextBack] = useState(data?.backText);
  const [mainData, setMainData] = useState();
  const [mainDataback, setMainDataback] = useState();

  const handleChangeFront = (html) => {
    console.log(html);
    setEditorText(html);
  };

  const handleChangeBack = (html) => {
    setEditorTextBack(html);
  };

  const handleSaveText = () => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id ? { ...block, frontText: editorText } : block
          ),
        })),
      },
    };
    setMainData(_data);
  };

  const handleSaveTextBack = () => {
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: page.blocks.map((block) =>
            block.id === data?.id
              ? { ...block, backText: editorTextBack }
              : block
          ),
        })),
      },
    };
    setMainDataback(_data);
  };

  const handleFlip = (side) => {
    if (side === "front") {
      setFlipped(false); // Set to front
    } else {
      setFlipped(true); // Set to back
    }
  };

  useEffect(() => {
    setEditorText(data?.frontText);
    setEditorTextBack(data?.backText);
  }, [data]);

  let minHeight;
  if (data?.imageProportions?.value === "1:1") {
    minHeight = "800px";
  } else if (data?.imageProportions?.value === "5:4") {
    minHeight = "640px";
  } else if (data?.imageProportions?.value === "4:3") {
    minHeight = "600px";
  } else if (data?.imageProportions?.value === "3:2") {
    minHeight = "533.333px";
  } else if (data?.imageProportions?.value === "16:9") {
    minHeight = "450px";
  } else {
    minHeight = "450px";
  }

  useEffect(() => {
    if (mainData) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === data?.id
                ? { ...block, frontText: editorText }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainData]);

  useEffect(() => {
    if (mainDataback) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === data?.id
                ? { ...block, backText: editorTextBack }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
    }
  }, [mainDataback]);

  useEffect(() => {
    setEditorText(`${data?.frontText}`);
    setEditorTextBack(`${data?.backText}`);
  }, [data]);

  console.log(minHeight, "dffdfdfdfdfdffdfd");

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("flip-card", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="flip-card" style={{ height: minHeight }}>
          <div
            className="flip-card-inner"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front Side */}
            <div
              className="flip-card-front"
              style={{
                backgroundImage: `url(${data?.frontSrc})`,
                backgroundColor: data?.frontSrc
                  ? "transparent"
                  : data?.frontColor,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-area-cnt">
                <div className="text-area">
                  <TextEditor
                    text={editorText}
                    handleChange={handleChangeFront}
                    handleSave={handleSaveText}
                  />
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="flip-card-back"
              style={{
                backgroundImage: `url(${data?.backSrc})`,
                backgroundColor: data?.backSrc
                  ? "transparent"
                  : data?.backColor,

                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-area-cnt">
                <div className="text-area">
                  <TextEditor
                    text={editorTextBack}
                    handleChange={handleChangeBack}
                    handleSave={handleSaveTextBack}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flip_switch">
          <p
            className={flipped ? "mb-0" : "mb-0 active"}
            onClick={() => handleFlip("front")}
          >
            Front
          </p>
          <p
            className={flipped ? "mb-0 active" : "mb-0"}
            onClick={() => handleFlip("back")}
          >
            Back
          </p>
        </div>
      </div>

      {/* Switch between front and back */}

      {/* Controls */}
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

export default Flipcard;
