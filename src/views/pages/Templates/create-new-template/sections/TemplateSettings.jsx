import React from "react";
import TextSettings from "./settings/TextSettings";
import ImageSettings from "./settings/ImageSettings";
import YoutubeVideoSettings from "./settings/YoutubeVideoSettings";
import ButtonSettings from "./settings/ButtonSettings";
import LogoSettings from "./settings/LogoSettings";
import AudioSettings from "./settings/AudioSettings";
import CoverSettings from "./settings/CoverSettings";
import TextImageSettings from "./settings/TextImageSettings";
import ProjectSettings from "./settings/ProjectSettings";
import QuizSettings from "./settings/QuizSettings";
import TreasureHuntSettings from "./settings/TreasureHuntSettings";
import ThenNowSettings from "./settings/ThenNowSettings";
import RankBattleSettings from "./settings/RankBattleSettings";
import HoroscopeSettings from "./settings/HoroscopeSettings";
import CookiesSettings from "./settings/CookiesSettings";
import FlipcardSettings from "./settings/FlipcardSettings";
import LeadFormSettings from "./settings/FormSettings";
import WheelSettings from "./settings/WheelSettings";
import PuzzleSettings from "./settings/PuzzleSettings";
import MemorySettings from "./settings/MemorySettings";
import FindPairSettings from "./settings/FindPairSettings";
import MatchUpSettings from "./settings/MatchUpSettings";
import TimelineSettings from "./settings/TimelineSettings";
import SlidingPuzzleSettings from "./settings/SlidingPuzzleSettings";
import HiddenObjectSettings from "./settings/HiddenObjectSettings";
import SlideShowSettings from "./settings/SlideShowSettings";

function TemplateSettings({
  selectedBlock,
  pageData,
  selectedBlockSettings,
  handleChangeMedia,
  handleChangeMediaAudio,
  handleOpenFormFields,
  handleOpenPasswordModal,
  handleTimeUpPage,
  setIsOpenLinkModal,
  handleOpenLinkModal,
}) {
  console.log(
    selectedBlockSettings,
    "selectedBlockSettingsselectedBlockSetdsdsdtings"
  );

  return (
    <div className="dash-right">
      <div className="toggle-panel toggle-settings" role="button">
        Toggle Settings
      </div>
      {selectedBlock === "project" && (
        <ProjectSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
          handleChangeMedia={handleChangeMedia}
        />
      )}
      {selectedBlock === "text" && (
        <TextSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
        />
      )}
      {selectedBlock === "image" && (
        <ImageSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
          handleChangeMedia={handleChangeMedia}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "logo" && (
        <LogoSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
          handleChangeMedia={handleChangeMedia}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "youtubeVideo" && (
        <YoutubeVideoSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "button" && (
        <ButtonSettings
          pageData={pageData}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "audio" && (
        <AudioSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMediaAudio}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "cover" && (
        <CoverSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "text-image" && (
        <TextImageSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}

      {selectedBlock === "timeline" && (
        <TimelineSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}

      {selectedBlock === "quiz" && (
        <QuizSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}

      {selectedBlock === "personality-quiz" && (
        <QuizSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "treasure-hunt" && (
        <TreasureHuntSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "rank-battle" && (
        <RankBattleSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "horoscope" && (
        <HoroscopeSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          setIsOpenLinkModal={setIsOpenLinkModal}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "cookies" && (
        <CookiesSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "flip-card" && (
        <FlipcardSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "form" && (
        <LeadFormSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "then-now" && (
        <ThenNowSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "spin-wheel" && (
        <WheelSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "puzzle" && (
        <PuzzleSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "sliding-puzzle" && (
        <SlidingPuzzleSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "memory" && (
        <MemorySettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "findPair" && (
        <FindPairSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "matchup" && (
        <MatchUpSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}

      {selectedBlock === "hidden-objects" && (
        <HiddenObjectSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
      {selectedBlock === "slide-show" && (
        <SlideShowSettings
          pageData={pageData}
          handleChangeMedia={handleChangeMedia}
          selectedBlockSettings={selectedBlockSettings}
          handleOpenFormFields={handleOpenFormFields}
          handleOpenPasswordModal={handleOpenPasswordModal}
          handleTimeUpPage={handleTimeUpPage}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      )}
    </div>
  );
}

export default TemplateSettings;
