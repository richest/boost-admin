import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function RankBattlePreview({ data, rankCard, rankMain }) {

  console.log(rankCard, "rankCardrankCard")
  const cards = rankCard;
  const colorTheme = data?.struct?.colorTheme;

  const [leading, setLeading] = useState({
    left: false,
    right: false,
  });
  const [votes, setVotes] = useState({
    left: 0,
    right: 0,
  });
  const [showTag, setShowTag] = useState(false);

  const handleVote = (data) => {
    if (data.text === "Card 1") {
      setVotes((prev) => ({
        ...prev,
        left: prev.left + 1,
      }));
    }

    if (data.text === "Card 2") {
      setVotes((prev) => ({
        ...prev,
        right: prev.right + 1,
      }));
    }
  };

  useEffect(() => {
    if (votes.left > votes.right) {
      setLeading({ left: true, right: false });
      setShowTag(true);
    } else if (votes.left < votes.right) {
      setLeading({ left: false, right: true });
      setShowTag(true);
    } else if (votes.left === votes.right) {
      setLeading({ left: false, right: false });
      setShowTag(false);
    }
  }, [votes]);

  return (
    <div>
      {/* <div className="game_mainParent">
        <div className="game_mainParent">
          <div className="">
            <div className="overflow-hidden">
              
            </div>
          </div>
        </div>
      </div> */}
      <div className="p-2 d-flex align-items-center gap-2">
        {cards?.map((item, i) => (
          <div key={i}
            className="rank-battle-container"
            style={{
              backgroundColor: `${colorTheme}`,
              // padding: `${showTag &&
              //   ((leading.left && item.text === "Card 1") ||
              //     (leading.right && item.text === "Card 2"))
              //   ? "5px"
              //   : "0"
              //   }`,
            }}
          >
            <div className="rank-battle-inner-container">
              <img src={item?.imageUrl} alt={item.text} style={{ aspectRatio: rankMain?.cardProportions, objectFit: 'contain' }} />
            </div>
            {showTag && (
              <div
                className="rank-battle-top-content"
                style={{ backgroundColor: `${colorTheme}` }}
              >
                {(leading.left &&
                  !leading.right &&
                  item.text === "Card 1") ||
                  (!leading.left &&
                    leading.right &&
                    item.text === "Card 2") ? (
                  <div className="d-flex align-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2.00488 19H22.0049V21H2.00488V19ZM2.00488 5L7.00488 8L12.0049 2L17.0049 8L22.0049 5V17H2.00488V5Z"></path>
                    </svg>
                    <h5>Leading</h5>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2 13H8V21H2V13ZM9 3H15V21H9V3ZM16 8H22V21H16V8Z"></path>
                    </svg>
                    <h5>2</h5>
                  </div>
                )}
              </div>
            )}
            <div className="rank-battle-wrap text-center">
              <div
                className="rank-battle-content-icon mx-auto"
                style={{ backgroundColor: `${colorTheme}` }}
                onClick={() => handleVote(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path>
                </svg>
              </div>
              <div className="rank-battle-content">
                <h4>{item.description}</h4>
                <h3>
                  VOTES: {item.text === "Card 1" && `${votes.left}`}{" "}
                  {item.text === "Card 2" && `${votes.right}`}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankBattlePreview;
