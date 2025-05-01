import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATION_MESSAGE } from "app/constants/regexRules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { REQUEST_ACTION } from "redux/authenticate/actions";
import { ApiErrorMessage } from "utils/helpers/function/apiErrorResonse";
import { RESPONSE_CODE, STORAGE_INDEXES, USER_ROLES } from "app/constants";
import { TEMPLATES } from "app/config/endpoints";
import { putRequest } from "app/httpClient/axiosClient";
import { Button, Card, Grid } from "@mui/material";
import { textBlock } from "../DefaultData/defaultData";
import ListDrawer from "./sections/DrawerList";
import ImageModal from "layout/ImageModel";
import TeamplateHeader from "./sections/TeamplateHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import TemplateSettings from "./sections/TemplateSettings";
import {
  drawerAction,
  getTemplateDetailsAction,
  updateTemplateAction,
} from "../TemplateRedux/actions/drawerAction";
import TemplateCenter from "./sections/TemplateCenter";
import { generateShortId } from "utils/helpers";
import AudioModal from "layout/AudioModal";
import CoverModal from "layout/CoverModal";
import CustomModal from "components/Models";
import PreviewTemplate from "../Preview";
import FormModal from "./sections/FormModal";
import GameSettingsModal from "./sections/settings/SettingsModal";
import Integrations from "../Integrations";
import PassswordModal from "./sections/PasswordModal";
import TimeUpPageModal from "./sections/TimeUppageModal";
import { getFromLocalStorage } from "utils/localStorage";
import InternalPageModal from "./sections/InternalLinkModal";
// import ImageCropper from "components/ImageCropper";
// textModalData?.[textModalData?.imageType]?.text
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(`First ${VALIDATION_MESSAGE.NAME.REQUIRED}`)
    .max(30, `First ${VALIDATION_MESSAGE.NAME.MAX_LENGTH}`),
  description: yup.string(),
  product_type_id: yup
    .string()
    .required(VALIDATION_MESSAGE.PRODUCT_TYPE.REQUIRED),
  icon: yup
    .mixed()
    .required(`Icon is required`)
    .test("fileSize", "Icon sizie can not be more than 5 MB", (value) => {
      if (value?.length === 0) return true;
      else return value?.length && value[0].size <= 5242880;
    })
    .test(
      "fileType",
      "Only *.jpeg, *.jpg, *.png type of images are allowed.",
      (value) => {
        if (value.length === 0) return true;
        else
          return (
            value.length &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
          );
      }
    ),
});

const TemplateForm = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.request);
  const { element, templateDetails } = useSelector(
    (state) => state.DrawerReducer
  );

  const datacheck = useSelector((state) => state.DrawerReducer);
  const navigate = useNavigate();
  const { name } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const customization = useSelector((state) => state.customization);
  const [selectedBlock, setSelectedBlock] = useState("project");
  const [selectedPage, setSelectedPage] = useState("Home");
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    type: "",
    id: null,
  });
  const [blockDeleteDetails, setBlockDeleteDetails] = useState(null);
  const [IsOpenFormModal, setIsOpenFormModal] = useState(false);
  const [IsOpenSettingsModal, setIsOpenSettingsModal] = useState(false);
  const [IsOpenLinkModal, setIsOpenLinkModal] = useState(false);
  const [linkType, setLinkType] = useState("");
  const [isSetBlockId, setIsSetBlockId] = useState({});
  console.log(isSetBlockId, "isSetBlockId");
  const [selectedBlockProperties, setSelectedBlockProperties] = useState({});
  const [selectedpasswordBlock, setSelectedpasswordBlock] = useState({});

  const [selectedAudioFile, setSelectedAudioFIle] = useState({
    url: "",
    name: "",
  });
  const [selectedAudioProperties, setSelectedAudioProperties] = useState({
    url: "",
    name: "",
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [IsOpenPasswordModal, setOpenpasswordModal] = useState(false);
  const [IsOpenTimeupdModal, setOpenTimeUpModal] = useState(false);

  const [isEditPageName, setIsEditPageName] = useState(null);
  const [isOpenPageOptions, setIsOpenPageOptions] = useState(null);
  const [selectedBlockType, setSelectedBlockType] = useState("");
  const [pageName, setPageName] = useState("");

  // const [templateDetails, setTemplateDetails] = useState({});
  const { onChange, ...params } = register("icon");
  const [isLoading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState("editor");
  const [isAddedFromBlock, setIsAddedFromBlock] = useState(false);
  const [pageData, setPageData] = useState({});
  const [open, setOpen] = useState(false);
  const [openAudioModal, setOpenAudioModal] = useState(false);
  const [openCoverModal, setOpenCoverModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMedia, setIsEditMedia] = useState(false);
  const [isEditMediaDetails, setIsEditMediaTypeDetails] = useState({
    type: "",
    id: null,
    isLogoCover: "",
    isInnerBlockId: null,
  });
  console.log(formData, "formData");
  const textBlockData = textBlock;

  const [selectedBlockSettings, setSelectedBlockSettings] = useState({
    // text: textBlock,
    // image: null,
  });
  console.log(selectedImage, "isEditMedia");
  console.log(selectedBlockSettings, "selectedBlockSettings");
  const inputRef = useRef();
  console.log(selectedImage, "j");
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleSelectBlock = (name, block) => {
    console.log(name, block, "sqqsqs");
    setSelectedBlock(name);
    setSelectedBlockSettings(block);
    // setSelectedPage(name);
  };
  const handleSelectPage = (name) => {
    console.log(name, "checkotitititititijieifodfjdfdFDFdfdsf");
    const filterPageData = templateDetails?.project_structure?.pages?.find(
      (e) => e.name === name
    );
    console.log(filterPageData, "filterPageDatafilterPageData");
    setPageData(filterPageData);
    setSelectedPage(name);
  };

  const handleAddBlock = (id) => {
    setOpenDrawer(true);
    setSelectedBlockId(id);
  };
  console.log(templateDetails, "uiuuiuiuiu");

  const handleClickDrawer = (selected) => {
    console.log(selected, isAddedFromBlock, "checkselectedeyioppokornot");

    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }

    const textBlock = {
      id: generateShortId(),
      block: "text",
      text: '<p><span class="ql-font-Roboto" style="font-size: 14px; line-height: 1.5;">Tell your story…</span></p>',
      wP_bg: "#fff",
      isTransparentBackground: false,
    };

    const timelineBlock = {
      id: generateShortId(),
      block: "timeline",
      text: '<p><span class="ql-font-Roboto" style="font-size: 16px; line-height: 1.5;">Start telling your story...</span></p>',
      imageUrl: "",
      markTitle: "Date",
      markSubtitle: "Section header",
      wP_bg: "#fff",
      imageDescription: "",
      isTransparentBackground: false,
    };

    const youtubeVideoBlock = {
      id: generateShortId(),
      block: "youtubeVideo",
      embedCode: "",
    };

    const buttonBlock = {
      id: generateShortId(),
      block: "button",
      href: "",
      text: '<p class="ql-align-center"> <span style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);"> Click </span> </p>',
      pulse: false,
      brad: 2,
      bc: "#20A2B8",
    };

    const flipCardBlock = {
      id: generateShortId(),
      block: "flip-card",
      backSrc: "",
      frontSrc: "",
      backText:
        '<p class="ql-align-center"> <span class="ql-font-Roboto" style="font-size: 24px; line-height: 1.5;color: rgb(255, 255, 255);"> Back text </span></p>',
      backColor: "#20a2b88c",
      frontText:
        '<p class="ql-align-center"> <span class="ql-font-Roboto" style="font-size: 24px; line-height: 1.5;color: rgb(255, 255, 255);"> Front text </span></p>',
      frontColor: "#20a2b8",
      imageProportions: {
        label: "3:2",
        value: "3:2",
      },
    };

    switch (selected) {
      case "text":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...textBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedBlocks;

          updatedBlocks = [...page.blocks, { ...textBlock }];
          const updatedPage = { ...page, blocks: updatedBlocks };

          const updatedProjectStructure = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedPage : p
            ),
          };

          const addedTemplate = {
            ...templateDetails,
            project_structure: updatedProjectStructure,
          };

          dispatch(updateTemplateAction(addedTemplate));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
        }

        break;

      case "image":
        setOpen(true);
        setSelectedBlockType("image");

        break;
      case "logo":
        setOpen(true);
        setSelectedBlockType("logo");
        break;
      case "audio":
        setOpenAudioModal(true);
        setSelectedBlockType("audio");
        break;
      case "cover":
        setOpenCoverModal(true);
        setSelectedBlockType("cover");
        break;
      case "text-image":
        setOpenCoverModal(true);

        setSelectedBlockType("text-image");
        break;

      case "timeline":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...timelineBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedTimeLineBlock;
          updatedTimeLineBlock = [...page.blocks, { ...timelineBlock }];
          console.log("No selected block found. Appending new block.");

          const updatedPageTimeline = { ...page, blocks: updatedTimeLineBlock };

          const updatedProjectStructureTimeline = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedPageTimeline : p
            ),
          };
          const addedTemplateTimeline = {
            ...templateDetails,
            project_structure: updatedProjectStructureTimeline,
          };
          dispatch(updateTemplateAction(addedTemplateTimeline));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
        }

        break;

      case "youtubeVideo":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...youtubeVideoBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedBlocksYoutube;
          updatedBlocksYoutube = [...page.blocks, { ...youtubeVideoBlock }];
          console.log("No selected block found. Appending new block.");

          const updatedPageYoutube = { ...page, blocks: updatedBlocksYoutube };

          const updatedProjectStructureYoutube = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedPageYoutube : p
            ),
          };

          const addedTemplateYoutube = {
            ...templateDetails,
            project_structure: updatedProjectStructureYoutube,
          };

          dispatch(updateTemplateAction(addedTemplateYoutube));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
        }

        break;

      case "button":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...buttonBlock });
          // let updatedBlocksButton;
          // // updatedBlocksButton = [...page.blocks, { ...buttonBlock }];
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedBlocksButton;
          updatedBlocksButton = [...page.blocks, { ...buttonBlock }];
          const updatedPageButton = { ...page, blocks: updatedBlocksButton };

          const updatedProjectStructureButton = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedPageButton : p
            ),
          };

          const addedTemplateButton = {
            ...templateDetails,
            project_structure: updatedProjectStructureButton,
          };

          dispatch(updateTemplateAction(addedTemplateButton));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
        }

        break;
      case "flipCard":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...flipCardBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedBlocksFlipcard;
          updatedBlocksFlipcard = [...page.blocks, { ...flipCardBlock }];
          console.log("No selected block found. Appending new block.");

          const updatedPageFlipcard = {
            ...page,
            blocks: updatedBlocksFlipcard,
          };

          const updatedProjectStructureFiprCard = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedPageFlipcard : p
            ),
          };
          const addedTemplateFlipcard = {
            ...templateDetails,
            project_structure: updatedProjectStructureFiprCard,
          };

          dispatch(updateTemplateAction(addedTemplateFlipcard));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
        }

        break;
      case "quiz":
        setOpenCoverModal(true);
        setSelectedBlockType("quiz");
        break;
      case "personality":
        setOpenCoverModal(true);
        setSelectedBlockType("personality-quiz");
        break;
      case "thenNow":
        setOpenCoverModal(true);
        setSelectedBlockType("then-now");
        break;
      case "horoscope":
        setOpenCoverModal(true);
        setSelectedBlockType("horoscope");
        break;
      case "cookies":
        setOpenCoverModal(true);
        setSelectedBlockType("cookies");
        break;
      case "rankbattle":
        setOpenCoverModal(true);
        setSelectedBlockType("rank-battle");
        break;
      case "slideShow":
        setOpenCoverModal(true);
        setSelectedBlockType("slide-show");
        break;
      case "leadForm":
        setOpenCoverModal(true);
        setSelectedBlockType("form");
        break;
      case "treasurehunt":
        setOpenCoverModal(true);
        setSelectedBlockType("treasure-hunt");
        break;
      case "spinthewheel":
        setOpenCoverModal(true);
        setSelectedBlockType("spin-wheel");
        break;
      case "puzzle":
        setOpenCoverModal(true);
        setSelectedBlockType("puzzle");
        break;
      case "memory":
        setOpenCoverModal(true);
        setSelectedBlockType("memory");
        break;
      case "findPair":
        setOpenCoverModal(true);
        setSelectedBlockType("find-pair");
        break;
      case "matchup":
        setOpenCoverModal(true);
        setSelectedBlockType("match-up");
        break;
      case "slidingPuzzle":
        setOpenCoverModal(true);
        setSelectedBlockType("sliding-puzzle");
        break;
      case "hiddenObjects":
        setOpenCoverModal(true);
        setSelectedBlockType("hidden-objects");
        break;

      default:
        console.log("Unknownsselection:", selected);
        break;
    }
    dispatch(drawerAction(selected));
    toggleDrawer(false);
  };

  const handleAddBlockFromBlock = (id) => {
    setOpenDrawer(true);
    setSelectedBlockId(id);
    setIsAddedFromBlock(true);
  };
  // for update parent
  // const updateParentState = (updatedData) => {
  //   console.log(updatedData, "uiouiouou")
  //   return
  //   setFormData((prev) => ({ ...prev, struct: updatedData }));
  // };
  const updateParentState = (updatedData) => {
    console.log(updatedData, "Updating specific struct field");

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        struct: {
          ...prev.struct,
          questions: prev.struct.questions.map((question) =>
            question.id === updatedData.id
              ? { ...question, image: updatedData.type }
              : question
          ),
        },
      };

      console.log(updatedFormData, "Updated formData ✅");

      return updatedFormData;
    });
  };
  console.log(selectedPage, "selectedPageselectedPagesddnjdnsd");
  const handleChangeTimeisUPImage = () => { };

  const handleChangeMedia = (selected, id, type, innerId) => {
    setOpen(true);
    setIsEditMedia(true);
    setIsEditMediaTypeDetails((prev) => ({
      ...prev,
      type: selected,
      id: id,
      isLogoCover: type,
      isInnerBlockId: innerId,
    }));
  };

  const handleMoveUp = (id) => {
    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }

    const index = page?.blocks?.findIndex((block) => block.id === id);

    const updatedBlocks = [...page?.blocks];
    [updatedBlocks[index], updatedBlocks[index - 1]] = [
      updatedBlocks[index - 1],
      updatedBlocks[index],
    ];
    // return updatedBlocks;
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: updatedBlocks,
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const handleMoveDown = (id) => {
    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }

    const index = page?.blocks?.findIndex((block) => block.id === id);

    const updatedBlocks = [...page?.blocks];
    [updatedBlocks[index], updatedBlocks[index + 1]] = [
      updatedBlocks[index + 1],
      updatedBlocks[index],
    ];

    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: updatedBlocks,
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };

  const cloneblock = (id) => {
    const page = templateDetails?.project_structure?.pages?.find(
      (page) => page.name === selectedPage
    );
    if (!page) {
      console.error("No page found with the selected name:", selectedPage);
      return;
    }

    const index = page?.blocks?.findIndex((block) => block.id === id);
    if (index === -1) return page?.blocks;

    const clonedBlock = { ...page?.blocks[index], id: generateShortId() };
    const updatedBlocks = [...page?.blocks];
    updatedBlocks.splice(index + 1, 0, clonedBlock);
    const _data = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((page) => ({
          ...page,
          blocks: updatedBlocks,
        })),
      },
    };
    dispatch(updateTemplateAction(_data));
  };
  const handleChangeMediaAudio = (selected, id) => {
    setOpenAudioModal(true);
    setIsEditMedia(true);
    setIsEditMediaTypeDetails({
      ...isEditMediaDetails,
      type: selected,
      id: id,
    });
  };

  const handleAddItem = (image) => {
    const page = templateDetails?.project_structure?.pages.find(
      (page) => page.name === selectedPage
    );
    console.log(isEditMediaDetails, "checkmediadetailsssssssss");
    if (isEditMedia && isEditMediaDetails?.type === "image") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? { ...block, url: selectedImage }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
      // setSelectedImage("");
    }

    if (
      isEditMedia &&
      isEditMediaDetails?.type === "horoscope-image-settings"
    ) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    backgroundImage: selectedImage,
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(_data));
      setOpen(false);
      // setSelectedImage("");
    }

    if (isEditMedia && isEditMediaDetails?.type === "project") {
      const newObject = {
        ...templateDetails.project_structure.app,
        backgroundImage: selectedImage,
      };

      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          app: newObject,
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
      // setSelectedImage("");
    }

    if (isEditMedia && isEditMediaDetails?.type === "logo") {
      console.log("REACHEDDDww2w2DD");
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? { ...block, url: selectedImage }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpenAudioModal(false);
      // setSelectedImage("");
    }

    if (isEditMedia && isEditMediaDetails?.type === "audio") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  url: selectedAudioFile?.url,
                  name: selectedAudioFile?.name,
                }
                : block
            ),
          })),
        },
      };
      console.log(_data, "check_datayueuhuhk");
      // dispatch(updateTemplateAction(_data));
      setOpenAudioModal(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "cover") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  imageUrl: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }
    console.log(selectedImage, isEditMedia && isEditMediaDetails?.type, "xakipakapx")
    if (isEditMedia && isEditMediaDetails?.type === "puzzle") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    finalScreen: {
                      ...block.struct.finalScreen,
                      imageSrc: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "flip-front") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  frontSrc: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "flip-back") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  backSrc: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }
    //

    if (isEditMedia && isEditMediaDetails?.type === "text-image") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  imageUrl: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "timeline-image") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  imageUrl: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }
    console.log(selectedImage, "selectedImage")
    if (isEditMedia && isEditMediaDetails?.type === "match-up-image") {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    finalScreen: {
                      ...block.struct.finalScreen,
                      imageSrc: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "formImage") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    form: {
                      ...block.struct.form,
                      logoImage: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "quiz-cover") {
      // const updatedData = {
      //   ...templateDetails,
      //   project_structure: {
      //     ...templateDetails.project_structure,
      //     pages: templateDetails.project_structure.pages.map((page) => ({
      //       ...page,
      //       blocks: page.blocks.map((block) =>
      //         block.id === formData?.id
      //           ? {
      //             ...block,
      //             struct: {
      //               ...block.struct,
      //               cover: {
      //                 ...block.struct.cover,
      //                 image: selectedImage,
      //               },
      //             },
      //           }
      //           : block
      //       ),
      //     })),
      //   },
      // };
      // dispatch(updateTemplateAction(updatedData));
      setSelectedImage(image); // ⬅️ this is your temporary local state

      setIsEditMedia(false);  // close modal context
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "answer-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === isEditMediaDetails.isLogoCover
                        ? {
                          ...question,
                          answers: question.answers.map((answer) =>
                            answer.id === isEditMediaDetails.isInnerBlockId
                              ? {
                                ...answer,
                                image: selectedImage,
                              }
                              : answer
                          ),
                        }
                        : question
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "question-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    questions: block.struct.questions?.map((question) =>
                      question.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...question,
                          image: selectedImage,
                        }
                        : question
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      // setSelectedImage(image); // ⬅️ this is your temporary local state

      // setIsEditMedia(false)
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "slider-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    slides: block.struct.slides?.map((question) =>
                      question.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...question,
                          image: selectedImage,
                        }
                        : question
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "pin-image") {
      console.log(
        isEditMediaDetails?.isLogoCover,
        "isEditMediaDetails?.isLogoCoverisEditMediaDetails?.isLogoCover"
      );
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pins: block.struct.pins?.map((pin) =>
                      pin.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...pin,
                          i: selectedImage,
                        }
                        : pin
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "horoscope-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    cards: block.struct.cards?.map((question) =>
                      question.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...question,
                          coverImage: selectedImage,
                        }
                        : question
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (
      isEditMedia &&
      isEditMediaDetails?.type === "horoscope-illustrationImage"
    ) {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    cards: block.struct.cards?.map((question) =>
                      question.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...question,
                          illustrationImage: selectedImage,
                        }
                        : question
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "result-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    results: block.struct.results?.map((result) =>
                      result.id === isEditMediaDetails?.isLogoCover
                        ? {
                          ...result,
                          image: selectedImage,
                        }
                        : result
                    ),
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (
      isEditMedia &&
      isEditMediaDetails?.type === "logo" &&
      isEditMediaDetails?.isLogoCover === "cover"
    ) {
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  logotypeUrl: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(_data));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "quest-header") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) => {
              if (block.id === isEditMediaDetails.id) {
                return {
                  ...block,
                  struct: {
                    ...block.struct,
                    tiles: {
                      ...block.struct.tiles,
                      tileList: block.struct.tiles?.tileList?.map((tile) =>
                        tile.id === isEditMediaDetails.isLogoCover
                          ? {
                            ...tile,
                            headerImgSrc: selectedImage,
                          }
                          : tile
                      ),
                    },
                  },
                };
              }
              return block;
            }),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "final-result-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) => {
              if (block.id === isEditMediaDetails.id) {
                return {
                  ...block,
                  struct: {
                    ...block.struct,
                    timeIsUpScreen: {
                      ...block.struct.timeIsUpScreen,
                      imageSrc: selectedImage,
                    },
                  },
                };
              }
              return block;
            }),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "quest-overlay") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) => {
              if (block.id === isEditMediaDetails.id) {
                return {
                  ...block,
                  struct: {
                    ...block.struct,
                    tiles: {
                      ...block.struct.tiles,
                      tileList: block.struct.tiles?.tileList?.map((tile) =>
                        tile.id === isEditMediaDetails.isLogoCover
                          ? {
                            ...tile,
                            overlaySrc: selectedImage,
                          }
                          : tile
                      ),
                    },
                  },
                };
              }
              return block;
            }),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "card-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) => {
              if (block.id === isEditMediaDetails.id) {
                return {
                  ...block,
                  struct: {
                    ...block.struct,
                    cards: block.struct.cards?.map((tile) =>
                      tile.id === isEditMediaDetails.isLogoCover
                        ? {
                          ...tile,
                          imageUrl: selectedImage,
                        }
                        : tile
                    ),
                  },
                };
              }
              return block;
            }),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "result-image-treasure") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    finalScreen: {
                      ...block.struct.finalScreen,
                      imageSrc: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "result-image-form") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    final: {
                      ...block.struct.final,
                      imageSrc: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "thennow-right") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  rightSrc: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "thennow-left") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  leftSrc: selectedImage,
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "spin-wheel-middle") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    playground: {
                      ...block.struct.playground,
                      spinImageUrl: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "puzzle-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    playground: {
                      ...block.struct.playground,
                      image: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "hidden-object") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    bimg: selectedImage,
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "hidden-object-tag") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    sucImg: selectedImage,
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "puzzle-result-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    finalScreen: {
                      ...block.struct.finalScreen,
                      imageSrc: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      // setSelectedImage(image); // ⬅️ this is your temporary local state

      // setIsEditMedia(false);  // close modal context
      // setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "sliding-puzzle-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    playground: {
                      ...block.struct.playground,
                      imageUrl: selectedImage,
                    },
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));

      setOpen(false);
    }
    if (isEditMedia && isEditMediaDetails?.type === "playing-card-back") {
      // const updatedData = {
      //   ...templateDetails,
      //   project_structure: {
      //     ...templateDetails.project_structure,
      //     pages: templateDetails.project_structure.pages.map((page) => ({
      //       ...page,
      //       blocks: page.blocks.map((block) =>
      //         block.id === isEditMediaDetails?.id
      //           ? {
      //             ...block,
      //             struct: {
      //               ...block.struct,
      //               playground: {
      //                 ...block.struct.playground,
      //                 cardBackImage: selectedImage,
      //               },
      //             },
      //           }
      //           : block
      //       ),
      //     })),
      //   },
      // };
      // dispatch(updateTemplateAction(updatedData));
      setSelectedImage(image); // ⬅️ this is your temporary local state

      setIsEditMedia(false);  // close modal context
      setOpen(false);
    }
    console.log(selectedImage, "sqqqsq0808")
    if (isEditMedia && isEditMediaDetails?.type === "first-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pairs: {
                      ...block.struct.pairs,
                      pairList: block.struct.pairs.pairList?.map(
                        (question) =>
                          question.id === isEditMediaDetails?.isLogoCover
                            ? {
                              ...question,
                              firstImage: {
                                ...question.firstImage,
                                src: selectedImage,
                                cardType: "image",
                              },
                            }
                            : question
                      ),
                    },
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    if (isEditMedia && isEditMediaDetails?.type === "second-image") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === isEditMediaDetails?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    pairs: {
                      ...block.struct.pairs,
                      pairList: block.struct.pairs.pairList?.map(
                        (question) =>
                          question.id === isEditMediaDetails?.isLogoCover
                            ? {
                              ...question,
                              secondImage: {
                                ...question.secondImage,
                                src: selectedImage,
                                cardType: "image",
                              },
                            }
                            : question
                      ),
                    },
                  },
                }
                : block
            ),
          })),
        },
      };

      dispatch(updateTemplateAction(updatedData));
      setOpen(false);
    }

    const imageBlock = {
      id: generateShortId(),
      block: "image",
      url: selectedImage,
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

    const logoBlock = {
      id: generateShortId(),
      block: "logo",
      url: selectedImage,
      link: "",
      width: 20,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      position: {
        label: "Center",
        value: "center",
      },
    };

    const audioBlock = {
      id: generateShortId(),
      block: "audio",
      url: selectedAudioFile?.url,
      name: selectedAudioFile?.name,
      isLoop: false,
      isMuted: false,
      isAutoPlay: false,
    };

    switch (selectedBlockType) {
      case "image":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...imageBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedImageBlocks;
          updatedImageBlocks = [...page.blocks, { ...imageBlock }];
          const updatedImagePage = { ...page, blocks: updatedImageBlocks };
          const updatedProjectStructureImage = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedImagePage : p
            ),
          };
          const addedImageTemplate = {
            ...templateDetails,
            project_structure: updatedProjectStructureImage,
          };
          dispatch(updateTemplateAction(addedImageTemplate));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setOpen(false);
          // setSelectedImage("");
        }

        break;
      case "logo":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...logoBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedLogoBlocks;
          updatedLogoBlocks = [...page.blocks, { ...logoBlock }];
          const updatedLogoPage = { ...page, blocks: updatedLogoBlocks };
          const updatedProjectStructureLogo = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedLogoPage : p
            ),
          };

          const addedLogoTemplate = {
            ...templateDetails,
            project_structure: updatedProjectStructureLogo,
          };

          dispatch(updateTemplateAction(addedLogoTemplate));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setOpen(false);
          setSelectedImage("");
        }

        break;
      case "audio":
        if (isAddedFromBlock) {
          const index = page?.blocks.findIndex(
            (block) => block.id === selectedBlockId
          );
          if (index === -1) return page?.blocks;
          const updatedBlocks = [...page?.blocks];
          updatedBlocks.splice(index, 0, { ...audioBlock });
          const _data = {
            ...templateDetails,
            project_structure: {
              ...templateDetails.project_structure,
              pages: templateDetails.project_structure.pages.map((page) => ({
                ...page,
                blocks: updatedBlocks,
              })),
            },
          };
          dispatch(updateTemplateAction(_data));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setIsAddedFromBlock(false);
        } else {
          let updatedAudioBlocks;
          updatedAudioBlocks = [...page.blocks, { ...audioBlock }];
          const updatedAudioPage = { ...page, blocks: updatedAudioBlocks };
          const updatedProjectStructureAudio = {
            ...templateDetails.project_structure,
            pages: templateDetails.project_structure.pages.map((p) =>
              p.id === page.id ? updatedAudioPage : p
            ),
          };

          const addedAudioTemplate = {
            ...templateDetails,
            project_structure: updatedProjectStructureAudio,
          };

          dispatch(updateTemplateAction(addedAudioTemplate));
          setSelectedBlockSettings({});
          setSelectedBlockId(null);
          setOpenAudioModal(false);
          setSelectedAudioFIle({});
        }

        break;
      default:
        break;
    }

    setSelectedBlockSettings({});
    setSelectedBlockId(null);
    setSelectedBlockType("");
    setSelectedImage("");
    setOpen(false);
  };

  console.log(templateDetails, "templateDetailstemplateDetailstemplateDetails");
  const handleSelectMedia = (image) => {
    setSelectedImage(image);
  };

  const handleSelectCoverTemplate = (block) => {
    const coverBlock = {
      id: generateShortId(),
      block: selectedBlockType,
      ...block,
    };
    const page = templateDetails?.project_structure?.pages.find(
      (page) => page.name === selectedPage
    );

    // let updatedBlocks;
    // updatedBlocks = [...page.blocks, { ...coverBlock }];
    // const updatedBlockPage = { ...page, blocks: updatedBlocks };
    // const updatedProjectStructure = {
    //   ...templateDetails.project_structure,
    //   pages: templateDetails.project_structure.pages.map((p) =>
    //     p.id === page.id ? updatedBlockPage : p
    //   ),
    // };

    // const addedAudioTemplate = {
    //   ...templateDetails,
    //   project_structure: updatedProjectStructure,
    // };

    // dispatch(updateTemplateAction(addedAudioTemplate));
    // setSelectedBlockSettings({});
    // setSelectedBlockId(null);
    // setOpenAudioModal(false);
    // setOpenCoverModal(false);
    // setSelectedAudioFIle({});

    if (isAddedFromBlock) {
      const index = page?.blocks.findIndex(
        (block) => block.id === selectedBlockId
      );
      if (index === -1) return page?.blocks;
      const updatedBlocks = [...page?.blocks];
      updatedBlocks.splice(index, 0, { ...coverBlock });
      const _data = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: updatedBlocks,
          })),
        },
      };

      dispatch(updateTemplateAction(_data));
      setSelectedBlockSettings({});
      setSelectedBlockId(null);
      setOpenAudioModal(false);
      setOpenCoverModal(false);
      setSelectedAudioFIle({});
    } else {
      let updatedBlock;
      updatedBlock = [...page.blocks, { ...coverBlock }];
      const updatedPage = { ...page, blocks: updatedBlock };
      const updatedProjectStructure = {
        ...templateDetails.project_structure,
        pages: templateDetails.project_structure.pages.map((p) =>
          p.id === page.id ? updatedPage : p
        ),
      };

      const addedAudioTemplate = {
        ...templateDetails,
        project_structure: updatedProjectStructure,
      };
      dispatch(updateTemplateAction(addedAudioTemplate));
      setSelectedBlockSettings({});
      setSelectedBlockId(null);
      setOpenAudioModal(false);
      setSelectedAudioFIle({});
      setOpenCoverModal(false);
    }
  };

  const handleDeleteBlock = (id) => {
    setIsOpenDeleteModal(true);
    setBlockDeleteDetails(id);
  };

  const handleOpenFormFields = (id) => {
    setIsSetBlockId(id);
    setIsOpenFormModal(true);
  };

  const handleOpenLinkModal = (id, type) => {
    setIsSetBlockId(id);
    setIsOpenLinkModal(true);
    setLinkType(type);
  };

  const handleSelectLink = (pageLink) => {
    if (linkType === "callToAction") {
      const updatedData = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => ({
            ...page,
            blocks: page.blocks.map((block) =>
              block.id === formData?.id
                ? {
                  ...block,
                  struct: {
                    ...block.struct,
                    callToActionLink: pageLink,
                    innerPageLink: true,
                  },
                }
                : block
            ),
          })),
        },
      };
      dispatch(updateTemplateAction(updatedData));
      setIsOpenLinkModal(false);

    }
  };

  const deleteBlockDetails = () => {
    let updatedProject;

    if (pageDetails?.type === "page") {
      updatedProject = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.filter(
            (page) => page.id !== pageDetails?.id // Filter out the page with the selected name
          ),
        },
      };
    } else {
      updatedProject = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: templateDetails.project_structure.pages.map((page) => {
            if (page.name === selectedPage) {
              return {
                ...page,
                blocks: page.blocks.filter(
                  (block) => block.id !== blockDeleteDetails
                ),
              };
            }
            return page;
          }),
        },
      };
    }
    setPageDetails({});
    dispatch(updateTemplateAction(updatedProject));
    setIsOpenDeleteModal(false);
  };

  const handleCloneBlock = (blockId) => {
    // Step 1: Find the selected page
    const pageIndex = templateDetails.project_structure.pages.findIndex(
      (p) => p.name === selectedPage
    );

    if (pageIndex === -1) {
      console.error("Page not found.");
      return;
    }

    const page = templateDetails.project_structure.pages[pageIndex];

    // Step 2: Find the block to clone
    const blockIndex = page.blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) {
      console.error("Block not found.");
      return;
    }

    const originalBlock = page.blocks[blockIndex];

    // Step 3: Clone the block
    const clonedBlock = {
      ...originalBlock,
      id: generateShortId(), // Generate a unique ID for the cloned block
    };

    // Step 4: Create a new blocks array with the cloned block inserted
    const updatedBlocks = [
      ...page.blocks.slice(0, blockIndex + 1), // Blocks before the cloned block
      clonedBlock, // The new cloned block
      ...page.blocks.slice(blockIndex + 1), // Remaining blocks
    ];

    // Step 5: Create a new page object with updated blocks
    const updatedPage = {
      ...page,
      blocks: updatedBlocks,
    };

    // Step 6: Update the pages array immutably
    const updatedPages = [
      ...templateDetails.project_structure.pages.slice(0, pageIndex),
      updatedPage,
      ...templateDetails.project_structure.pages.slice(pageIndex + 1),
    ];

    // Step 7: Dispatch the updated template structure
    dispatch(
      updateTemplateAction({
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: updatedPages,
        },
      })
    );
  };

  const handleAddPage = () => {
    const pageCount = templateDetails.project_structure.pages.length;
    const newPageName = `Page ${pageCount}`;

    const newPage = {
      id: generateShortId(),
      name: newPageName,
      blocks: [],
    };

    const updatedProject = {
      ...templateDetails,
      project_structure: {
        ...templateDetails.project_structure,
        pages: [...templateDetails.project_structure.pages, newPage],
      },
    };
    dispatch(updateTemplateAction(updatedProject));
  };

  const handleOpenOptions = (id) => {
    setIsOpenPageOptions((prev) => (prev === id ? null : id));
  };

  const handleEditPageName = (id) => { };

  const handleBlurPageName = async (e, id) => {
    setIsEditPageName(null);
    // setLoading(true);

    if (pageName) {
      const updatedPages = templateDetails.project_structure.pages.map(
        (page) => (page.id === id ? { ...page, name: pageName } : page)
      );
      const updatedProject = {
        ...templateDetails,
        project_structure: {
          ...templateDetails.project_structure,
          pages: updatedPages,
        },
      };
      dispatch(updateTemplateAction(updatedProject));
    }

    // setLoading(false);
  };

  const handleDeleteModal = (id, type) => {
    setIsOpenDeleteModal(true);
    setPageDetails({ ...pageDetails, id: id, type: type });
  };

  const handleEditModal = (type, id) => {
    setIsOpenSettingsModal(true);
    setIsSetBlockId(id);
  };

  useEffect(() => {
    if (templateDetails?.project_structure?.pages?.length > 0) {
      const filterPageData = templateDetails?.project_structure?.pages?.find(
        (e) => e.name === selectedPage
      );
      console.log(filterPageData, selectedPage, "checkifdetailsexistornot");
      setPageData(filterPageData);
      setSelectedBlockProperties(selectedBlockSettings);
    }
  }, [templateDetails, isAddedFromBlock]);

  console.log(
    pageData,
    templateDetails,
    "pageDatapageDatapoiytuuyttryuututurr"
  );

  const handleEditTemplate = async (id, title) => {
    const payload = {
      project_structure: JSON.stringify(templateDetails?.project_structure),
    };

    try {
      dispatch({ type: REQUEST_ACTION.PROCESSING });

      const {
        status,
        data: { message },
      } = await putRequest(`${TEMPLATES.UPDATE}/${name}`, payload);
      if (status === RESPONSE_CODE[200]) {
        dispatch({
          type: REQUEST_ACTION.SUCCESS,
          payload: { message: message },
        });
      } else {
        dispatch({
          type: REQUEST_ACTION.FAILURE,
          payload: { message: ApiErrorMessage() },
        });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION.FAILURE,
        payload: { message: ApiErrorMessage(error) },
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleEditTemplate();
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup function to clear the timeout if the component is unmounted or `templateDetails` changes
    return () => clearTimeout(timer);
  }, [templateDetails]);
  console.log(selectedPage, "selectedPage");
  console.log(templateDetails?.project_structure?.pages, "yuytut");
  useEffect(() => {
    setSelectedBlockProperties(selectedBlockSettings);
    const page = templateDetails?.project_structure?.pages?.find(
      (e) => e.name === selectedPage
    );
    console.log(isSetBlockId, "isSetBlockIdcheckiddd");
    const block = page?.blocks.find((block) => block?.id === isSetBlockId);
    console.log(block, "setblockdataisttrue");
    setFormData(block);
  }, [
    templateDetails,
    IsOpenFormModal,
    IsOpenSettingsModal,
    formData,
    IsOpenTimeupdModal,
    IsOpenPasswordModal,
    IsOpenLinkModal,
  ]);
  console.log(selectedBlockSettings, "selectedBlockSettings");
  useEffect(() => {
    dispatch({ type: REQUEST_ACTION.INIT });
  }, []);

  useEffect(() => {
    if (element === "image" || element === "logo") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [element]);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSelectedBlockSettings(templateDetails?.project_structure?.app);
        setSelectedBlock("project");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(getTemplateDetailsAction(name));
  }, []);

  console.log(
    templateDetails?.project_structure,
    "templateDetadssdsdilstemplateDetailstemplateDetails"
  );

  const handleOpenPasswordModal = (data) => {
    console.log(data, "iuiuiuui");
    setOpenpasswordModal(true);
    setSelectedpasswordBlock(data);
    setIsSetBlockId(data?.id);
  };
  const handleTimeUpPage = (data) => {
    setOpenTimeUpModal(true);
    console.log(data, "checking the function");
    setIsSetBlockId(data?.id);
  };
  // useEffect(() => {
  //   if (formData) {
  //     dispatch(updateTemplateAction(formData));
  //   }
  // }, [dispatch]);

  console.log(formData, "IsOpenFormModalsssdsdIsOpenFormModal");
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        my={2}
      >
        <TeamplateHeader setShowTemplatePreview={setShowTemplatePreview} />
        <Grid item md={12} className="ps-0">
          <Card
            className="profile-right-section"
            sx={{
              // p: 3,
              boxShadow: 1,
              background: customization.navType === "dark" ? "#103C65" : "#fff",
            }}
          >
            {showTemplatePreview === "preview" && (
              <PreviewTemplate
                selectedPage={selectedPage}
                linkType={linkType}
              />
            )}

            {showTemplatePreview === "editor" && (
              <div className="editor-dash" ref={containerRef}>
                <div className="dash-left">
                  <div className="toggle-panel toggle-page" role="button">
                    Toggle Pages
                  </div>
                  <div className="panel-wrap">
                    <h6 className="fw-semibold">Pages</h6>
                    <div className="page-view">
                      {templateDetails?.project_structure?.pages?.map(
                        (page) => (
                          <div
                            key={page.id}
                            className="mb-3 pb-3 border-bottom"
                            role="button"
                            onClick={() => handleSelectPage(page?.name)}
                          >
                            <div className="page-block position-relative w-100">
                              {isEditPageName === page?.id ? (
                                <div>
                                  <input
                                    type="text"
                                    ref={inputRef}
                                    defaultValue={page?.name}
                                    className="border-0 p-0 w-100"
                                    required
                                    onBlur={(e) =>
                                      handleBlurPageName(e, page?.id)
                                    }
                                    onChange={(e) =>
                                      setPageName(e.target.value)
                                    }
                                  />
                                </div>
                              ) : (
                                <p className="mb-0 text-break">{page?.name}</p>
                              )}
                              <i className="fa-solid fa-house"></i>
                              <div
                                className="options text-end"
                                role="button"
                                onClick={() => handleOpenOptions(page.id)}
                              >
                                <i className="fa-solid fa-circle-ellipsis-vertical h5 mb-0 muted-text"></i>
                                <div
                                  className={`dropdown_menu custom_dropdown ${isOpenPageOptions === page?.id
                                    ? "active_dropdown"
                                    : ""
                                    }`}
                                >
                                  <button
                                    onClick={() => {
                                      handleEditPageName(page?.id);
                                      setIsEditPageName(page?.id);
                                    }}
                                    className="d-flex gap-2 align-items-center"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    Rename
                                  </button>

                                  <button
                                    onClick={() => {
                                      handleDeleteModal(page?.id, "page");
                                    }}
                                    className="d-flex gap-2 align-items-center"
                                  >
                                    <i className="fa-solid fa-trash"></i> Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                      <div className="more-pages">
                        <button
                          onClick={handleAddPage}
                          className="btn d-flex gap-2 align-items-center font-sm fw-semibold"
                        >
                          <i className="fa-regular fa-plus"></i> Add page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <TemplateCenter
                  handleSelectBlock={handleSelectBlock}
                  pageData={pageData}
                  selectedBlockSettings={selectedBlockSettings}
                  isSelected={selectedBlock}
                  handleAddBlock={handleAddBlock}
                  handleDeleteBlock={handleDeleteBlock}
                  handleCloneBlock={handleCloneBlock}
                  setSelectedBlockSettings={setSelectedBlockSettings}
                  setSelectedBlock={setSelectedBlock}
                  handleEditModal={handleEditModal}
                  toggleDrawer={toggleDrawer}
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  handleClickDrawer={handleClickDrawer}
                  handleChangeLogo={handleChangeMedia}
                  setShowTemplatePreview={setShowTemplatePreview}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  cloneblock={cloneblock}
                  handleAddBlockFromBlock={handleAddBlockFromBlock}
                />

                <TemplateSettings
                  pageData={pageData}
                  selectedBlock={selectedBlock}
                  templateDetails={templateDetails}
                  selectedBlockSettings={selectedBlockSettings}
                  handleChangeMedia={handleChangeMedia}
                  handleChangeMediaAudio={handleChangeMediaAudio}
                  handleOpenFormFields={handleOpenFormFields}
                  handleOpenPasswordModal={handleOpenPasswordModal}
                  handleTimeUpPage={handleTimeUpPage}
                  setIsOpenLinkModal={setIsOpenLinkModal}
                  handleOpenLinkModal={handleOpenLinkModal}
                />
              </div>
            )}
            {showTemplatePreview === "edit-details" && <Integrations />}
          </Card>
        </Grid>
        <ImageModal
          handleAddItem={handleAddItem}
          open={open}
          setOpen={setOpen}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleSelectMedia={handleSelectMedia}
        />

        <AudioModal
          handleAddItem={handleAddItem}
          open={openAudioModal}
          setOpen={setOpenAudioModal}
          selectedImage={selectedAudioProperties}
          setSelectedImage={setSelectedAudioProperties}
          handleSelectMedia={handleSelectMedia}
          selectedAudioFile={selectedAudioFile}
          setSelectedAudioFIle={setSelectedAudioFIle}
        />

        <CoverModal
          handleAddItem={handleAddItem}
          open={openCoverModal}
          setOpen={setOpenCoverModal}
          selectedImage={selectedAudioProperties}
          setSelectedImage={setSelectedAudioProperties}
          handleSelectMedia={handleSelectMedia}
          selectedAudioFile={selectedAudioFile}
          setSelectedAudioFIle={setSelectedAudioFIle}
          handleSelectCoverTemplate={handleSelectCoverTemplate}
          selectedBlockType={selectedBlockType}
        />

        <CustomModal
          width={600}
          open={isOpenDeleteModal}
          handleClose={() => setIsOpenDeleteModal(false)}
        >
          <div className="deleteMOdal text-center ">
            <h3>
              Are you sure you want to delete this{" "}
              {pageDetails?.type === "page" ? "page" : "block"}?
            </h3>
            <p>
              The content of the{" "}
              {pageDetails?.type === "page" ? "page" : "block"} will also be
              deleted.
            </p>

            <div className="buttonsdelete">
              <Button
                variant="contained"
                color="error"
                sx={{ boxShadow: "none" }}
                onClick={deleteBlockDetails}
              >
                Delete
              </Button>{" "}
              <Button
                variant="outline"
                color="warning"
                sx={{ boxShadow: "none" }}
                onClick={() => setIsOpenDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CustomModal>

        <FormModal
          IsOpenFormModal={IsOpenFormModal}
          setIsOpenFormModal={setIsOpenFormModal}
          blockID={isSetBlockId}
          formData={formData}
          selectedPage={selectedPage}
          handleChangeLogo={handleChangeMedia}
        />
        <PassswordModal
          IsOpenFormModal={IsOpenPasswordModal}
          setIsOpenFormModal={setOpenpasswordModal}
          blockID={isSetBlockId}
          formData={formData}
          selectedPage={selectedPage}
          handleChangeLogo={handleChangeMedia}
        />
        <TimeUpPageModal
          selectedImage={selectedImage}
          setOpen={setOpen}
          setIsEditMedia={setIsEditMedia}
          setIsEditMediaTypeDetails={setIsEditMediaTypeDetails}
          handleChangeTimeisUPImage={handleChangeTimeisUPImage}
          IsOpenFormModal={IsOpenTimeupdModal}
          setIsOpenFormModal={setOpenTimeUpModal}
          blockID={isSetBlockId}
          formData={formData}
          selectedPage={selectedPage}
          handleChangeLogo={handleChangeMedia}
        />
        <GameSettingsModal
          selectedImage={selectedImage}
          isEditMediaTypeDetails={isEditMediaDetails}
          updateParentState={updateParentState}
          IsOpenFormModal={IsOpenSettingsModal}
          setIsOpenFormModal={setIsOpenSettingsModal}
          blockID={isSetBlockId}
          formData={formData}
          selectedPage={selectedPage}
          handleChangeLogo={handleChangeMedia}
          setOpen={setOpen}
          setIsEditMedia={setIsEditMedia}
        />

        <InternalPageModal
          setIsOpenFormModal={setIsOpenLinkModal}
          IsOpenFormModal={IsOpenLinkModal}
          formData={formData}
          handleSelectLink={handleSelectLink}
        />
      </Grid>
    </>
  );
};

export default TemplateForm;
