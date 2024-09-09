import {
  Dialog,
  FormControl,
  OutlinedInput,
  Button,
  InputLabel,
} from "@mui/material";
import "./AddMaterial.css";
import { useState } from "react";

export const AddMaterial = ({ show, setShow, handleAddMaterial }) => {
  const [name, setName] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [price, setPrice] = useState("");

  const formfields = [
    {
      name: "Название:",
      text: "Введите введите название материала",
      handle: setName,
      val: name,
    },
    {
      name: "Цена за м2:",
      text: "Введите цену",
      handle: setPrice1,
      val: price1,
    },
    {
      name: "Вес 1 м2:",
      text: "Введите число",
      handle: setPrice2,
      val: price2,
    },
  ];

  const pricefields = [
    { name: "От:", text: "Введите число", handle: setMin, val: min },
    { name: "До:", text: "Введите число", handle: setMax, val: max },
    { name: "Цена:", text: "Введите цену", handle: setPrice, val: price },
  ];

  return (
    <Dialog onClose={() => setShow(false)} open={show}>
      <p className="name">Добавление материала</p>
      {formfields.map((el) => (
        <div
          key={el.name}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "10px",
            width: "100%",
          }}
        >
          <FormControl>
            <InputLabel>{el.name}</InputLabel>
            <OutlinedInput
              label={el.name}
              type="email"
              onChange={(e) => el.handle(e.target.value)}
              value={el.val}
              className="AuthInput"
            />
          </FormControl>
        </div>
      ))}
      <div>
        <label style={{ marginBottom: "10px", textAlign: "start" }}>
          Цена за пог. метр:
        </label>
      </div>
      {pricefields.map((el) => (
        <div
          key={el.name}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "10px",
            width: "100%",
          }}
        >
          <FormControl>
            <InputLabel>{el.name}</InputLabel>
            <OutlinedInput
              type="email"
              label={el.name}
              onChange={(e) => el.handle(e.target.value)}
              value={el.val}
              className="AuthInput"
            />
          </FormControl>
        </div>
      ))}
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <div style={{ display: "flex", gap: "5%", width: "95%" }}>
          <Button
            sx={{
              borderRadius: "10px",
              "&:hover": {
                color: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                background: "rgba(10, 43, 163, 1)",
              },
            }}
            onClick={() => setShow(false)}
            className="pricebtn"
          >
            Отмена
          </Button>
          <Button
            sx={{
              borderRadius: "10px",
              "&:hover": {
                color: "black",
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
            onClick={() => {
              handleAddMaterial(name, price1, price2, min, max, price);
              setName("");
              setPrice1("");
              setPrice2("");
              setMin("");
              setMax("");
              setPrice("");
            }}
            className="pricebtn add"
          >
            Добавить материал
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
