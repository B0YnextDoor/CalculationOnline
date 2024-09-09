import "./Frames.css";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = ({
  loading,
  setLoading,
  text = "Файлы в процессе обработки...",
}) => {
  return (
    <div>
      <Dialog
        onClose={() => setLoading(false)}
        open={loading}
        sx={{ borderRadius: "13px" }}
      >
        <div>
          <IconButton
            onClick={() => setLoading(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress
              color="secondary"
              sx={{ color: "#0A2BA3" }}
              size="210px"
            />
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: 36,
              textAlign: "center",
              margin: "15px",
            }}
          >
            {text}
          </div>
        </div>
      </Dialog>
    </div>
  );
};
