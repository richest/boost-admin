import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blocksData, gamesData } from "../../DefaultData/defaultData";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import VideocamIcon from "@mui/icons-material/Videocam";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import QuizIcon from "@mui/icons-material/Quiz";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import MemoryIcon from "@mui/icons-material/Memory";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import CookieIcon from "@mui/icons-material/Cookie";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExtensionOffIcon from "@mui/icons-material/ExtensionOff";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import textIcon from '../../../../../assets/images/icons/text.svg';
import imageIcon from '../../../../../assets/images/icons/image.svg';
import logoIcon from '../../../../../assets/images/icons/logo.svg';
import videoIcon from '../../../../../assets/images/icons/video-camera.svg';
import buttonIcon from '../../../../../assets/images/icons/button.svg';
import audioIcon from '../../../../../assets/images/icons/volume.svg';
import coverIcon from '../../../../../assets/images/icons/cover.svg';
import textImageIcon from '../../../../../assets/images/icons/textimage.svg';

export default function ListDrawer({
  toggleDrawer,
  openDrawer,
  setOpenDrawer,
  handleClickDrawer,
}) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List className="pb-3">
        <h5 className="px-3 pt-3 pb-2 primary-text">All Blocks</h5>
        {blocksData.map((text, index) => (
          <ListItem key={text.key} className="list_button-wrap" disablePadding>
            <ListItemButton className="list_button" onClick={() => handleClickDrawer(text.key)}>
              <ListItemIcon>
                {/* {text.key === "text" && <img src="..\src\assets\images\icons\audioIcon.svg"/>} */}
                {text.key === "text" && <img src={textIcon} height={20} />}
                {text.key === "image" && <img src={imageIcon} height={20} />}
                {text.key === "logo" && <img src={logoIcon} height={20} />}
                {text.key === "youtubeVideo" && <img src={videoIcon} height={20} />}
                {text.key === "button" && <img src={buttonIcon} height={20} />}
                {text.key === "audio" && <img src={audioIcon} height={20} />}
                {text.key === "cover" && <img src={coverIcon} height={20} />}
                {text.key === "text-image" && <img src={textImageIcon} height={20} />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <h5 className="px-3 pt-3 pb-2 border-top mt-3 primary-text">Games</h5>

        {gamesData.map((text, index) => (
          <ListItem key={text.key} className="list_button-wrap" disablePadding>
            <ListItemButton className="list_button" onClick={() => handleClickDrawer(text.key)}>
              <ListItemIcon className="primary-text">
                {text.key === "quiz" && <QuizIcon />}
                {text.key === "personality" && <SettingsAccessibilityIcon />}
                {text.key === "memory" && <MemoryIcon />}
                {text.key === "matchup" && <JoinInnerIcon />}
                {text.key === "spinthewheel" && <RotateLeftIcon />}
                {text.key === "crossword" && <CancelIcon />}
                {text.key === "slidingPuzzle" && <DoorSlidingIcon />}
                {text.key === "findPair" && <FindReplaceIcon />}
                {text.key === "slideShow" && <SlideshowIcon />}
                {text.key === "leadForm" && <LeaderboardIcon />}
                {text.key === "flipCard" && <AutoStoriesIcon />}
                {text.key === "thenNow" && <FollowTheSignsIcon />}
                {text.key === "timeline" && <ViewTimelineIcon />}
                {text.key === "cookies" && <CookieIcon />}
                {text.key === "horoscope" && <AlignHorizontalCenterIcon />}
                {text.key === "interactiveImage" && <BrokenImageIcon />}
                {text.key === "hiddenObjects" && <VisibilityOffIcon />}
                {text.key === "puzzle" && <ExtensionOffIcon />}
                {text.key === "treasurehunt" && <CurrencyBitcoinIcon />}
                {text.key === "rankbattle" && <HowToVoteIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="py-4 d-flex flex-wrap align-items-center justify-content-center gap-2">
      <Button
        variant=""
        className="gap-2 bg-light"
        onClick={() => handleClickDrawer("text")}
      >
        <i class="fa-solid fa-text-size primary-text"></i>
        Add Text
      </Button>
      <Button
        variant=""
        className="gap-2 bg-light"
        onClick={() => handleClickDrawer("image")}
      >
        <i class="fa-solid fa-image primary-text"></i>
        Add Image
      </Button>
      <Button
        variant=""
        className="gap-2 bg-light"
        onClick={() => handleClickDrawer("button")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          webcrx=""
        >
          <path
            d="M22 9V15C22 16.1 21.1 17 20 17H19V15H20V9H4V15H10V17H4C2.9 17 2 16.1 2 15V9C2 7.9 2.9 7 4 7H20C21.1 7 22 7.9 22 9ZM14.5 19L15.59 16.59L18 15.5L15.59 14.41L14.5 12L13.41 14.41L11 15.5L13.41 16.59L14.5 19ZM17 14L17.62 12.62L19 12L17.62 11.38L17 10L16.38 11.38L15 12L16.38 12.62L17 14ZM14.5 19L15.59 16.59L18 15.5L15.59 14.41L14.5 12L13.41 14.41L11 15.5L13.41 16.59L14.5 19ZM17 14L17.62 12.62L19 12L17.62 11.38L17 10L16.38 11.38L15 12L16.38 12.62L17 14Z"
            className="primary-fill"
          />
        </svg>
        Add Button
      </Button>
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        All Blocks
      </Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
