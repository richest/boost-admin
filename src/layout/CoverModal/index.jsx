import React, { useEffect, useRef, useState } from "react";
import CustomModal from "components/Models";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { drawerAction } from "views/pages/Templates/TemplateRedux/actions/drawerAction";
import { getRequest } from "app/httpClient/axiosClient";
import { CREATED_BLOCKS } from "app/config/endpoints";
import toast from "react-hot-toast";

function CoverModal({
  setOpen,
  open,
  handleSelectCoverTemplate,
  selectedBlockType,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [audioList, setAudioList] = useState([]);
  const [blocksLIst, setBlocksLIst] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const getAllBlocks = async () => {
    setIsLoading(true);
    console.log(
      selectedBlockType.toUpperCase(),
      "selectedBlockTypeselectedBlockType"
    );
    try {
      const response = await getRequest(
        `${CREATED_BLOCKS.GET_ALL_COVERS}?type=${selectedBlockType?.toUpperCase()}`
      );
      const {
        status,
        data: {
          data: {
            blockDetails: { rows },
          },
        },
      } = response;
      console.log(rows, "checkAudfdfdfioList");
      if (status === 200) {
        setBlocksLIst(rows);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(drawerAction(""));
  };

  useEffect(() => {
    getAllBlocks();
  }, [selectedCategory, open]);
console.log(blocksLIst,"checkbloclidtt")
  return (
    <div>
      <CustomModal open={open} handleClose={handleClose}>
        <h1 className="p-4">Templates</h1>
        <Grid container spacing={2} className="modal-grid p-4">
          {!blocksLIst?.length && <p>No data found</p>}
          {blocksLIst?.map((block) => (
            <Grid item xs={4} md={4} sm={3}>
              <div
                className="block-cover"
                role="button"
                onClick={() => handleSelectCoverTemplate(block?.block_json)}
              >
                <img
                  src={
                    block?.block_json?.imageUrl ||
                    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
                  }
                  alt="coverImage"
                  className="w-100"
                />
                <h4 className="text-center mt-4">{block?.title || "Title"}</h4>
              </div>
            </Grid>
          ))}
        </Grid>
      </CustomModal>
    </div>
  );
}

export default CoverModal;
