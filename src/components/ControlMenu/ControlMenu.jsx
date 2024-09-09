import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./ControlMenu.css";
import { ControlFile } from "../../widgets/ControlFile/ControlFile";
import { ControlPrice } from "../ControlPrice/ControlPrice";
import { Box, useMediaQuery } from "@mui/material";

export const ControlMenu = ({ show, setShow }) => {
  const [price, showPrice] = useState(false);
  const [file, showFile] = useState(false);
  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <div className="controlmenu" style={!show ? { display: "none" } : {}}>
      <ControlPrice show={price} />
      <ControlFile file={file} setFile={showFile} />
      <IconButton
        aria-label="close"
        onClick={() => (!price ? setShow(false) : showPrice(false))}
        sx={{
          position: "absolute",
          right: 2,
          top: 80,
          color: "red",
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexWrap: isMobile ? "wrap" : "nowrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <button
          style={price ? { display: "none" } : {}}
          className="contswitch"
          onClick={() => showPrice(true)}
        >
          <img src="/settings.svg" alt="" />
          <span>Управление ценой</span>
        </button>
        <button
          style={price ? { display: "none" } : {}}
          className="contswitch"
          onClick={() => showFile(true)}
        >
          <img src="/files.svg" alt="" />
          <span>
            Управление
            <br /> размером файлов
          </span>
        </button>
      </Box>
    </div>
  );
};
