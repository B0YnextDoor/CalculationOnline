import { Button } from "@mui/material";
import "./Frames.css";
import Dialog from "@mui/material/Dialog";

export const FileReady = ({ ready, setReady, countPrice }) => {
  return (
    <div>
      <Dialog onClose={() => setReady(false)} open={ready} s>
        <img src="/ready.svg" alt="" />
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 36,
          }}
        >
          Файлы готовы!
        </h1>
        <div
          style={{
            margin: "10px",
            width: "90%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              countPrice(true);
              setReady(false);
            }}
            className="readybtn btn"
            sx={{
              background: " rgba(10, 43, 163, 1)",
              color: "white",
              fontSize: "14px",
              borderRadius: "13px",
              "&:hover": {
                color: "black",
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            К расчёту
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
