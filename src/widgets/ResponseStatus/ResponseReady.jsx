import "../OrderStatus/OrderStatus.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";

export const ResponseReady = ({ ready, setReady }) => {
  return (
    <div style={!ready ? { display: "none" } : {}}>
      <Dialog onClose={() => setReady(false)} open={ready}>
        <span className="stat">Статус заказа</span>
        <IconButton
          aria-label="close"
          onClick={() => setReady(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <img style={{ marginTop: "20px" }} src="/ready.svg" alt="" />
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 36,
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Материал добавлен
          <br />
          успешно
        </h1>
      </Dialog>
    </div>
  );
};
