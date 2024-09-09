import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import "./OrderStatus.css";

export const LoadingOrder = ({ loading, setLoading }) => {
  return (
    <div>
      <Dialog onClose={() => setLoading(false)} open={loading}>
        <span className="stat">Статус заказа</span>
        <IconButton
          aria-label="close"
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
        <CircularProgress
          color="secondary"
          sx={{ color: "#0A2BA3" }}
          size="210px"
        />
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 36,
            marginTop: "15%",
          }}
        >
          Обработка запроса
        </h1>
      </Dialog>
    </div>
  );
};
