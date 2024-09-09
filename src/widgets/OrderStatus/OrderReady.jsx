import "./OrderStatus.css";
import Dialog from "@mui/material/Dialog";

export const OrderReady = ({ ready, setReady }) => {
  return (
    <div>
      <Dialog onClose={() => setReady(false)} open={ready}>
        <span className="stat">Статус заказа</span>
        <img src="/ready.svg" alt="" />
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 36,
          }}
        >
          Ваш заказ принят
        </h1>
        <span
          className="statusspan"
          style={{ fontFamily: "Montserrat", fontWeight: "400" }}
        >
          Наши менеджеры свяжутся с вами.
        </span>
      </Dialog>
    </div>
  );
};
