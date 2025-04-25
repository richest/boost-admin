import React, { useEffect, useRef } from "react";
import DrawerAudio from "components/Drawers/Audio";
import DrawerButton from "components/Drawers/Button";
import DrawerCover from "components/Drawers/Cover";
import DrawerImage from "components/Drawers/Image";
import DrawerLogo from "components/Drawers/Logo";
import DrawerTextImage from "components/Drawers/Text-Image";
import DrawerYoutubeVideo from "components/Drawers/Youtube-video";
import DrawerText from "components/Drawers/Text";
import { useSelector } from "react-redux";
import QuizGames from "components/Games/Quiz";
import TreasureHunt from "components/Games/TreasureHunt";
import ThenNow from "components/Games/ThenNow";
import RankBattle from "components/Games/RankBattle";
import Slideshow from "components/Games/Slideshow";
import HoroScope from "components/Games/HoroScope";
import Cookies from "components/Games/Cookies";
import Flipcard from "components/Games/Flipcard";
import LeadFormBlock from "components/Games/LeadForm";
import ListDrawer from "./DrawerList";
import SpintheWheel from "components/Games/SpinTheWheel";
import Puzzle from "components/Games/Puzzle";
import Memory from "components/Games/Memory";
import FindOnePair from "components/Games/FIndOnePair";
import MatchUp from "components/Games/Matchup";
import Timeline from "components/Games/Timeline";
import SlidingPuzzle from "components/Games/SlidingPuzzle";
import HiddenObjects from "components/Games/HiddenObjects";

function TemplateCenter({
  handleSelectBlock,
  pageData,
  isSelected,
  handleDeleteBlock,
  handleAddBlock,
  handleCloneBlock,
  setSelectedBlock,
  setSelectedBlockSettings,
  handleEditModal,
  toggleDrawer,
  openDrawer,
  setOpenDrawer,
  handleClickDrawer,
  handleChangeLogo,
  setShowTemplatePreview,
  handleMoveUp,
  handleMoveDown,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(templateDetails, "checktemplateDetailstemplateDetails");

  console.log(templateDetails?.project_structure, "checkimagedetailsss");
  console.log(pageData, "checkifpagadataupdatyedornopt");
  return (
    <div className="dash-center ">
      <div className="block_page__container">
        <div
          className="block-page"
          style={{
            backgroundColor: templateDetails?.project_structure?.app
              ?.backgroundImage
              ? "none"
              : templateDetails?.project_structure?.app?.isTransparentBackground
                ? templateDetails?.project_structure?.app
                    ?.isTransparentBackground
                : templateDetails?.project_structure?.app?.colorTheme,

            backgroundImage: templateDetails?.project_structure?.app
              ?.backgroundImage
              ? `url(${templateDetails?.project_structure?.app?.backgroundImage})`
              : "none",
          }}
        >
          {pageData?.blocks?.map((block, index) => (
            <div key={index}>
              {block?.block === "text" && (
                <DrawerText
                  handleSelectBlock={handleSelectBlock}
                  data={block}
                  handleDeleteBlock={handleDeleteBlock}
                  isSelected={isSelected}
                  handleCloneBlock={handleCloneBlock}
                  handleAddBlock={handleAddBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "image" && (
                <>
                  <DrawerImage
                    data={block}
                    handleSelectBlock={handleSelectBlock}
                    isSelected={true}
                    handleDeleteBlock={handleDeleteBlock}
                    handleMoveUp={handleMoveUp}
                    handleMoveDown={handleMoveDown}
                    cloneblock={cloneblock}
                    handleAddBlockFromBlock={handleAddBlockFromBlock}
                  />
                </>
              )}
              {block?.block === "logo" && (
                <DrawerLogo
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "youtubeVideo" && (
                <DrawerYoutubeVideo
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "button" && (
                <DrawerButton
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "audio" && (
                <DrawerAudio
                  handleSelectBlock={handleSelectBlock}
                  data={block}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "cover" && (
                <DrawerCover
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "text-image" && (
                <DrawerTextImage
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                  
                />
              )}
              {block?.block === "quiz" && (
                <QuizGames
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "personality-quiz" && (
                <QuizGames
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "treasure-hunt" && (
                <TreasureHunt
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "then-now" && (
                <ThenNow
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}

                />
              )}
              {block?.block === "rank-battle" && (
                <RankBattle
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "slide-show" && (
                <Slideshow
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "horoscope" && (
                <HoroScope
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "cookies" && (
                <Cookies
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "flip-card" && (
                <Flipcard
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "form" && (
                <LeadFormBlock
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "spin-wheel" && (
                <SpintheWheel
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "puzzle" && (
                <Puzzle
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "memory" && (
                <Memory
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "find-pair" && (
                <FindOnePair
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "match-up" && (
                <MatchUp
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "timeline" && (
                <Timeline
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "sliding-puzzle" && (
                <SlidingPuzzle
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
              {block?.block === "hidden-objects" && (
                <HiddenObjects
                  data={block}
                  handleSelectBlock={handleSelectBlock}
                  isSelected={isSelected}
                  handleDeleteBlock={handleDeleteBlock}
                  handleEditModal={handleEditModal}
                  handleChangeLogo={handleChangeLogo}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />
              )}
            </div>
          ))}
        </div>
        <ListDrawer
          toggleDrawer={toggleDrawer}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          handleClickDrawer={handleClickDrawer}
        />
      </div>
    </div>
  );
}

export default TemplateCenter;
