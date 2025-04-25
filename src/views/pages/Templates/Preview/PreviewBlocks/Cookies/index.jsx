import React, { useState } from "react";
import LeadForm from "../Form";
import { Link } from "react-router-dom";

function CookiesPreview({ data, handleLink }) {
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  const cards = data?.struct?.shuffleCards
    ? shuffleArray(data?.struct?.cards)
    : data?.struct?.cards;
  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(
    data?.struct?.isShowLeadForm
  );
  const handleOpenDetails = (data) => {
    setDetails(data);
    setShowDetails(true);
  };

  const handleBack = () => {
    setDetails({});
    setShowDetails(false);
  };
  const onSubmit = (e) => {
    setShowLeadForm(false);
  };
  console.log(showLeadForm, "showLeadFormshowLeadForm");
  return (
    <div>
      <div className="game_mainParent">
        <div className="game_mainParent">
          <div className="">
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
                  <>
                    {showLeadForm ? (
                      <LeadForm data={data} onSubmit={onSubmit} />
                    ) : (
                      <div className="final-screen is-win">
                        {details?.illustrationImage && (
                          <div className="final-screen__image-container">
                            <div
                              className="final-screen__image"
                              style={{
                                backgroundImage: `url(${details?.illustrationImage})`,
                              }}
                            ></div>
                          </div>
                        )}

                        <div className="final-screen__content">
                          <div className="final-screen__content-header">
                            {details?.header}
                          </div>
                          {data?.struct?.callToActionEnabled && (
                            <>
                              {data?.struct?.innerPageLink ? (
                                <div className="restart-button__wrapper">
                                  <button
                                    onClick={() =>
                                      handleLink(data?.struct?.callToActionLink)
                                    }
                                    style={{
                                      background: `${data?.struct?.colorTheme}`,
                                      border: 0,
                                    }}
                                    className="btn btn-outline-dark"
                                  >
                                    {data?.struct?.callToActionText}
                                  </button>
                                </div>
                              ) : (
                                <div className="restart-button__wrapper">
                                  <Link
                                    to={data?.struct?.callToActionLink}
                                    style={{
                                      background: `${data?.struct?.colorTheme}`,
                                      border: 0,
                                    }}
                                    className="btn btn-outline-dark"
                                  >
                                    {data?.struct?.callToActionText}
                                  </Link>
                                </div>
                              )}
                            </>
                          )}
                          <div className="final-screen__content-description">
                            {details?.description}
                          </div>
                          {data?.struct?.isHideRestartButton && (
                            <div className="restart-button__wrapper">
                              <button
                                className="btn btn-outline-dark"
                                onClick={handleBack}
                              >
                                Back
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiesPreview;
