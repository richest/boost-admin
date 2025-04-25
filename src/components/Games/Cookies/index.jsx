import React, { useEffect, useRef, useState } from "react";

function Cookies({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  setShowTemplatePreview,
  cloneblock,
  handleMoveDown,
  handleMoveUp,
  handleAddBlockFromBlock,
}) {
  console.log(data, "chekcdttatsasasayavoa");

  const cards = data?.struct?.cards;

  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenDetails = (data) => {
    setDetails(data);
    setShowDetails(true);
  };

  const handleBack = () => {
    setDetails({});
    setShowDetails(false);
  };

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("cookies", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="editButton">
          <button
            className="button-boost"
            onClick={() => handleEditModal("cookies", data?.id)}
          >
            Edit
          </button>
        </div>
        <div className="preview-alert">
          You can try the game in action in the{" "}
          <span type="button" onClick={() => setShowTemplatePreview("preview")}>
            <i class="fa-regular fa-eye"></i> Preview mode
          </span>
        </div>
        <div className="disabled-panel">
          <div className="container py-4 w-100">
            <div className="position-relative">
              {!showDetails ? (
                <div
                  className="cards-block-area"
                  style={{
                    backgroundColor: `${data?.struct?.colorTheme}`,
                    backgroundImage: `url(${data?.struct?.backgroundImage})`,
                  }}
                >
                  {cards?.map((item, i) => (
                    <div
                      onClick={() => handleOpenDetails(item)}
                      key={i}
                      className="cards-block-area__card"
                    >
                      <div
                        className="cards-block-area__card-cover-image"
                        style={{
                          backgroundImage: `url(${item.coverImage || "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1739271156/Group_3_jl6d69.png"})`,
                        }}
                      />
                      <div
                        className="cards-block-area__card-disclaimer"
                        style={{ color: "#000" }}
                      >
                        {item.disclaimer}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="final-screen is-win">
                  <div className="final-screen__image-container">
                    <div
                      className="final-screen__image"
                      style={{
                        backgroundImage: `url(${details?.illustrationImage})`,
                      }}
                    ></div>
                  </div>

                  <div className="final-screen__content">
                    <div className="final-screen__content-header">
                      {details?.header}
                    </div>
                    <div className="final-screen__content-description">
                      {details?.description}
                    </div>
                    <div className="restart-button__wrapper">
                      <button
                        className="btn btn-outline-dark"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

export default Cookies;
