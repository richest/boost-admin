import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import PreviewTextBlock from "./PreviewBlocks/Text";
import PreviewImage from "./PreviewBlocks/Image";
import PreviewLogo from "./PreviewBlocks/Logo";
import PreviewYoutubeVideo from "./PreviewBlocks/Youtube-video";
import PreviewButton from "./PreviewBlocks/Button";
import PreviewAudio from "./PreviewBlocks/Audio";
import PreviewCover from "./PreviewBlocks/Cover";
import PreviewTextImage from "./PreviewBlocks/Text-Image";
import QuizGamesPreview from "./PreviewBlocks/QuizGame";
import TreasureHuntPrevieww from "./PreviewBlocks/TreasureHunt";
import ThenNowPreview from "./PreviewBlocks/ThenNow";
import SlideshowPreview from "./PreviewBlocks/SlideShow";
import RankBattlePreview from "./PreviewBlocks/RankBattle";
import HoroscopePreview from "./PreviewBlocks/Horoscope";
import CookiesPreview from "./PreviewBlocks/Cookies";
import FlipcardPreview from "./PreviewBlocks/Flipcard";
import LeadFormPreviewBlock from "./PreviewBlocks/FormBlock";
import PreviewSpintheWheel from "./PreviewBlocks/PreviewWheel";
import PreviewPuzzle from "./PreviewBlocks/Puzzle";
import PreviewMemory from "./PreviewBlocks/Memory";
import PreviewFindOnePair from "./PreviewBlocks/FIndOnePair";
import PreviewMatchUp from "./PreviewBlocks/MatchUp";
import PreviewTimeline from "./PreviewBlocks/Timeline";
import PreviewSlidingPuzzle from "./PreviewBlocks/SlidingPuzzle";
import PreviewHiddenObjects from "./PreviewBlocks/HiddenObjects";

function PreviewTemplate({ selectedPage, linkType }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const pages = templateDetails?.project_structure?.pages || [];
  const appSettings = templateDetails?.project_structure?.app || {};
  console.log(linkType, "linkTypesdslinkType");
  const [selectedPageData, setSelectedPageData] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isRedirectId, setIsRedirectId] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);

  const visiblePages = selectedPageData.length > 0 ? selectedPageData : pages;
  const currentPage = visiblePages[currentPageIndex];

  const goToNext = () => {
    if (currentPageIndex < visiblePages.length - 1)
      setCurrentPageIndex((i) => i + 1);
  };

  const goToPrev = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleFullscreen = () => {
    const elem = previewRef.current;
    if (!document.fullscreenElement && elem) {
      elem.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleLink = (id) => {
    setIsRedirectId(id);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isRedirectId) {
      const filtered = pages.filter((p) => p.id === isRedirectId);
      setSelectedPageData(filtered);
      setCurrentPageIndex(0); // Reset to first when new page selected
    } else {
      setSelectedPageData(pages);
    }
  }, [isRedirectId, pages]);

  const appStyles = {
    backgroundColor: appSettings?.backgroundImage
      ? "none"
      : appSettings?.isTransparentBackground
        ? appSettings?.isTransparentBackground
        : appSettings?.colorTheme,
    backgroundImage: appSettings?.backgroundImage
      ? `url(${appSettings?.backgroundImage})`
      : "none",
    maxWidth: `${appSettings?.maxWidth || 1200}px`,
  };

  console.log(
    templateDetails?.project_structure?.app?.isPresentationMode,
    "templatedetaildcheckkdfnsds"
  );

  return (
    <div className="dash-center">
      <div className="block_page__container overflow-auto">
        <div
          ref={previewRef}
          className="block-page previewpage relative"
          style={appStyles}
        >
          {/* Toolbar */}
          {templateDetails?.project_structure?.app?.isPresentationMode && (
            <div className="d-flex justify-content-between align-items-center p-2">
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen"
                  className="button px-3 button-primary outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-maximize"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
                  </svg>
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-4">
                <button
                  onClick={goToPrev}
                  disabled={currentPageIndex === 0}
                  className="button px-3 button-primary"
                >
                  <i class="fa-light fa-arrow-left-long"></i>
                </button>
                <span className="text-gray-700 text-sm font-medium">
                  Page {currentPageIndex + 1} / {visiblePages.length}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentPageIndex === visiblePages.length - 1}
                  className="button px-3 button-primary"
                >
                  <i class="fa-light fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          )}

          {/* Page Blocks */}
          {currentPage?.blocks?.map((block, index) => (
            <div key={index}>
              {block?.block === "text" && (
                <PreviewTextBlock data={block} handleLink={handleLink} />
              )}
              {block?.block === "image" && (
                <PreviewImage data={block} handleLink={handleLink} />
              )}
              {block?.block === "logo" && (
                <PreviewLogo data={block} handleLink={handleLink} />
              )}
              {block?.block === "youtubeVideo" && (
                <PreviewYoutubeVideo data={block} handleLink={handleLink} />
              )}
              {block?.block === "button" && (
                <PreviewButton data={block} handleLink={handleLink} />
              )}
              {block?.block === "audio" && (
                <PreviewAudio data={block} handleLink={handleLink} />
              )}
              {block?.block === "cover" && (
                <PreviewCover data={block} handleLink={handleLink} />
              )}
              {block?.block === "text-image" && (
                <PreviewTextImage data={block} />
              )}
              {["quiz", "personality-quiz"].includes(block?.block) && (
                <QuizGamesPreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "treasure-hunt" && (
                <TreasureHuntPrevieww data={block} handleLink={handleLink} />
              )}
              {block?.block === "then-now" && (
                <ThenNowPreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "rank-battle" && (
                <RankBattlePreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "slide-show" && (
                <SlideshowPreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "horoscope" && (
                <HoroscopePreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "cookies" && (
                <CookiesPreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "flip-card" && (
                <FlipcardPreview data={block} handleLink={handleLink} />
              )}
              {block?.block === "form" && (
                <LeadFormPreviewBlock data={block} handleLink={handleLink} />
              )}
              {block?.block === "spin-wheel" && (
                <PreviewSpintheWheel data={block} handleLink={handleLink} />
              )}
              {block?.block === "puzzle" && (
                <PreviewPuzzle data={block} handleLink={handleLink} />
              )}
              {block?.block === "sliding-puzzle" && (
                <PreviewSlidingPuzzle data={block} />
              )}
              {block?.block === "memory" && (
                <PreviewMemory data={block} handleLink={handleLink} />
              )}
              {block?.block === "find-pair" && (
                <PreviewFindOnePair data={block} />
              )}
              {block?.block === "match-up" && (
                <PreviewMatchUp data={block} handleLink={handleLink} />
              )}
              {block?.block === "timeline" && (
                <PreviewTimeline data={block} handleLink={handleLink} />
              )}
              {block?.block === "hidden-objects" && (
                <PreviewHiddenObjects data={block} handleLink={handleLink} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreviewTemplate;
