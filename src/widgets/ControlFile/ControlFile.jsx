import "./ControlFile.css";
import {
  Button,
  useMediaQuery,
  Dialog,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { user } from "../..";
import CloseIcon from "@mui/icons-material/Close";

export const ControlFile = ({ file, setFile }) => {
  const [maxFileSize, setMaxFileSize] = useState(0);

  const handleClick = async () => {
    await user.loadLenth(maxFileSize);
    setFile(false);
  };

  return (
    <Dialog onClose={() => setFile(false)} open={file}>
      <h1
        className="filecontrol"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "400",
          color: "rgba(0, 0, 0, 0.71)",
        }}
      >
        Управление
        <br /> размером файла
      </h1>
      <IconButton
        aria-label="close"
        onClick={() => setFile(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "red",
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <FormControl size="large">
          <InputLabel>Максимальный:</InputLabel>
          <OutlinedInput
            label="Максимальный:"
            type="number"
            onChange={(e) => setMaxFileSize(e.target.value)}
            value={maxFileSize}
            className="AuthInput"
          />
        </FormControl>
        <span>Кб</span>
      </div>
      <div
        className="filebtns"
        style={{
          display: "flex",
          gap: "3%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={(e) => setFile(false)}
          className="contbtn"
          sx={{ borderRadius: "13px" }}
        >
          Отмена
        </Button>
        <Button
          disabled={maxFileSize === 0}
          onClick={(e) => handleClick(maxFileSize)}
          className="contbtn save"
          sx={{
            borderRadius: "13px",
            color: "white",
            "&:hover": {
              color: "black",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          Сохранить
        </Button>
      </div>
    </Dialog>
  );
};
