import { generateShortId } from "utils/helpers";

export const TRIVIA_TABS_DATA = [
  "Header",
  "Start Screen",
  "Questions",
  "Results",
];

export const blocksData = [
  {
    key: "text",
    name: "Text",
  },
  {
    key: "image",
    name: "Image",
  },
  {
    key: "logo",
    name: "Logo",
  },
  {
    key: "youtubeVideo",
    name: "Video",
  },
  {
    key: "button",
    name: "Button",
  },
  {
    key: "audio",
    name: "Audio",
  },
  {
    key: "cover",
    name: "Cover",
  },
  {
    key: "text-image",
    name: "Text and Image",
  },
];

export const gamesData = [
  {
    key: "quiz",
    name: "Quiz",
  },
  {
    key: "personality",
    name: "Personality",
  },
  {
    key: "memory",
    name: "Memory",
  },
  {
    key: "matchup",
    name: "Match Up",
  },
  {
    key: "spinthewheel",
    name: "Spin the wheel",
  },
  // {
  //   key: "crossword",
  //   name: "Crossword",
  // },
  {
    key: "slidingPuzzle",
    name: "Sliding Puzzle",
  },
  {
    key: "findPair",
    name: "Find One Pair",
  },
  {
    key: "rankbattle",
    name: "Rank Battle",
  },
  {
    key: "slideShow",
    name: "Slide show",
  },
  {
    key: "leadForm",
    name: "Leadform",
  },
  {
    key: "flipCard",
    name: "Flipcard",
  },
  {
    key: "timeline",
    name: "Timeline",
  },
  {
    key: "thenNow",
    name: "Then & Now",
  },
  {
    key: "cookies",
    name: "Cookies",
  },
  {
    key: "horoscope",
    name: "Horoscope",
  },
  // {
  //   key: "interactiveImage",
  //   name: "Interactive Image",
  // },
  {
    key: "hiddenObjects",
    name: "Hidden Objects",
  },
  {
    key: "puzzle",
    name: "Puzzle",
  },
  {
    key: "treasurehunt",
    name: "Treasure Hunt",
  },
];

export const textBlock = {
  id: generateShortId(),
  block: "text",
  text: '<p><span className="ql-font-Roboto" style="font-size: 14px; line-height: 1.5;">Tell your story…</span></p>',
  wP_bg: "#fff",
  isTransparentBackground: false,
};

export const imageBlock = {
  id: "pj7asd",
  url: "https://interacty-prod-bucket.s3.amazonaws.com/198764146/media/198764147/3488561/NORMAL",
  blur: false,
  width: 100,
  position: {
    label: "Center",
    value: "center",
  },
  imageSize: {
    label: "Full width",
    value: "fullWidth",
  },
};
