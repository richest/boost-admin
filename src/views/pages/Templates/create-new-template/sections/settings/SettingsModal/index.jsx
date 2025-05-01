import CustomModal from "components/Models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Select from "react-select";
import { generateShortId } from "utils/helpers";
import { fields, inputTypes } from "views/pages/Templates/constant";
import { updateTemplateAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import QuestionsScreen from "./SettingsComponent/QuestionsScreen";
import ResultScreen from "./SettingsComponent/ResultScreen";
import QuizSettingsModal from "./QuizSettingsModal";
import TreasureHuntModal from "./TreasureHuntModal";
import RankBattleModal from "./RankBattleModal";
import SlideSHowModal from "./SlideShowSettingsModal";
import HoroScopeModal from "./HoroScopeSettingsModal";
import CookiesModal from "./CookiesSettingsModal";
import LeadFormModal from "./LeadFormSettingsModal";
import WheeleModal from "./WheelSettingsModal";
import PuzzleModal from "./PuzzleSettingsModal";
import MemoryModal from "./MemorySettingsModal";
import MatchUpModal from "./MatchupSettingsModal";
import SlidingPuzzleModal from "./SlidingPuzzleSettingsModal";
import PersonalitySettingModal from "./PersonalitySettingModal";

function GameSettingsModal({
 
  IsOpenFormModal,
  setIsOpenFormModal,
  formData,
  selectedPage,
  handleChangeLogo,
  isEditMediaTypeDetails,
  updateParentState,
  onRegisterSlideImageCallback,
  selectedImage,
  setOpen,
  setIsEditMedia

}) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selecteScreen, setSelectScreen] = useState("start-screen");
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  const [closeerror, setcloserror] = useState(false)
  console.log(selectedImage, "closeerror")
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1200,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: "12px",
    overflow: "hidden",
    // p: 4,
    // marginInline: '12px'
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const checkedLabels = formData?.struct?.leadFormStruct?.form?.fields.map(
      (field) => field.id
    );
    setCheckedFields(checkedLabels);
  }, [formData]);

  useEffect(() => {
    if (inputTypes.length > 0) {
      setSelectedType({
        value: inputTypes[0].value,
        label: inputTypes[0].label,
      });
    }
  }, [inputTypes]);

  const toPascalCase = (str) => {
    // Step 1: Convert to PascalCase
    const pascal = str
      ?.replace(/[_\-]+/g, " ")
      .replace(/\s+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^./, (chr) => chr.toUpperCase())
      .replace(/\s+/g, "");

    // Step 2: Add space before each capital letter (except the first)
    return pascal?.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={IsOpenFormModal}
      onClose={() => {
        if (!closeerror) {
          setIsOpenFormModal(false); // only close if there's no error
        }
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <div style={style}>
        <div className="modal-form">
          <div className="modal-header-form">
            <h3>{toPascalCase(formData?.block)}</h3>
            <button
              className="btn text-white"
              style={{ fontSize: "30px" }}
              onClick={() => setIsOpenFormModal(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-form-body">
            {formData?.block === "quiz" && (
              <QuizSettingsModal
              selectedImage={selectedImage}
                isEditMediaTypeDetails={isEditMediaTypeDetails}
                updateParentState={updateParentState}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
                setIsOpenFormModal={setIsOpenFormModal}
              />
            )}
            {formData?.block === "personality-quiz" && (
              <PersonalitySettingModal
              setOpen={setOpen}
              setIsEditMedia={setIsEditMedia}
                selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "treasure-hunt" && (
              <TreasureHuntModal
              selectedImage={selectedImage}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
                setIsOpenFormModal={setIsOpenFormModal}
              />
            )}

            {formData?.block === "rank-battle" && (
              <RankBattleModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}

            {formData?.block === "slide-show" && (
              <SlideSHowModal
              selectedImage={selectedImage}
                onRegisterSlideImageCallback={onRegisterSlideImageCallback}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}

            {formData?.block === "horoscope" && (
              <HoroScopeModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}

            {formData?.block === "cookies" && (
              <CookiesModal
              selectedImage={selectedImage}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                setIsOpenFormModal={setIsOpenFormModal}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "form" && (
              <LeadFormModal
              selectedImage={selectedImage}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
                setIsOpenFormModal={setIsOpenFormModal}
              />
            )}
            {formData?.block === "spin-wheel" && (
              <WheeleModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}

            {formData?.block === "puzzle" && (
              <PuzzleModal
              selectedImage={selectedImage}
                setcloserror={setcloserror}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "sliding-puzzle" && (
              <SlidingPuzzleModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "memory" && (
              <MemoryModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "find-pair" && (
              <MemoryModal
              selectedImage={selectedImage}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
            {formData?.block === "match-up" && (
              <MatchUpModal
                // onRegisterSlideImageCallback={(fn) => {
                //   setSlideShowImageCallback(() => fn);
                //   setIsSlideShowReady(true);
                // }}
                selectedImage={selectedImage}
                onRegisterSlideImageCallback={onRegisterSlideImageCallback}
                setIsOpenFormModal={setIsOpenFormModal}
                selecteScreen={selecteScreen}
                setSelectScreen={setSelectScreen}
                formData={formData}
                handleChangeLogo={handleChangeLogo}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default GameSettingsModal;
