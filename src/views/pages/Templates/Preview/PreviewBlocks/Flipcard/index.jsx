import React, { useState } from "react";
import LeadForm from "../Form";
import { Link } from "react-router-dom";

function FlipcardPreview({ data }) {
  console.log(data, "FlipcardPreview");

  const cards = data?.struct?.cards;

  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(
    data?.struct?.isShowLeadForm
  );
  const [flipped, setFlipped] = useState(false); // Add flipped state

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

  const handleFlip = () => {
    setFlipped(!flipped); // Toggle the flipped state on click
  };

  console.log(showLeadForm, "showLeadFormshowLeadForm");
  return (
    <div>
      <div className="game_mainParent">
        <div
          className="flip-card"
          style={{ height: minHeight }}
          onClick={handleFlip} // Add onClick handler to flip the card
        >
          <div
            className="flip-card-inner"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front Side */}
            <div
              className="flip-card-front"
              style={{
                backgroundImage: `url(${data?.frontSrc})`,
                backgroundColor: data?.frontColor,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-area-cnt">
                <div className="text-area">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: data?.frontText }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="flip-card-back"
              style={{
                backgroundColor: data?.backColor,
                backgroundImage: `url(${data?.backSrc})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="text-area-cnt">
                <div className="text-area">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: data?.backText }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_flip bg-transparent">
            <button className="button button-primary border-0 font-sm sm">
              <i class="fa-solid fa-rotate"></i> Click to flip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipcardPreview;
