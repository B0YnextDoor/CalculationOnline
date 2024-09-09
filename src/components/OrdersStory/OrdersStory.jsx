import "./OrdersStory.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { List } from "./List.jsx";
import { user } from "../../index.js";
import { useMediaQuery } from "@mui/material";
const activeBtn = {
  color: "rgba(10, 43, 163, 1)",
  borderBottom: "3.08px solid rgba(10, 43, 163, 1)",
};

export const OrdersStory = ({ show, setShow }) => {
  const [state, setState] = useState(false);
  const [onlyCount, setCount] = useState([]);
  const [readyOrders, setOrders] = useState([]);
  const isMobile = useMediaQuery("(max-width:767px)");

  useEffect(
    () => async () => {
      if (user.isAuth == true) {
        const calculated = await user.getCalculated();
        const processed = await user.getProcessed();
        setCount(calculated);
        setOrders(processed);
      }
    },
    [show]
  );
  return (
    <div className="storycont" style={!show ? { display: "none" } : {}}>
      <span
        style={{
          fontFamily: "Montserrat",

          fontSize: isMobile ? 30 : 37,
          fontWeight: 400,
          marginBottom: 10,
          color: "rgba(0, 0, 0, 0.71)",
        }}
      >
        История расчёта и заказов
      </span>
      <IconButton
        aria-label="close"
        onClick={() => setShow(false)}
        sx={{
          position: "absolute",
          right: 2,
          top: 80,
          color: "red",
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <div className="buttons">
        <button
          style={
            !state
              ? { ...activeBtn, fontSize: isMobile ? "24px" : "31px" }
              : { fontSize: isMobile ? "24px" : "31px" }
          }
          onClick={() => setState(false)}
        >
          Только расчёт
        </button>
        <button
          style={
            state
              ? { ...activeBtn, fontSize: isMobile ? "24px" : "31px" }
              : { fontSize: isMobile ? "24px" : "31px" }
          }
          onClick={() => setState(true)}
        >
          Оформленные заказы
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          marginTop: "3%",
        }}
      >
        <button className="sortbtn">
          Сортировать
          <img src="/sort.svg" alt="" style={{ marginLeft: "5px" }} />
        </button>
      </div>
      <List state={state} data={!state ? onlyCount : readyOrders} />
    </div>
  );
};
