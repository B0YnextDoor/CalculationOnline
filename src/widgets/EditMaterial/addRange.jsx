import {
  Dialog,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { user } from "../../index";
import { useState } from "react";

export const AddRange = ({ open, setOpen, material_id }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [price, setPrice] = useState("");

  const pricefields = [
    { name: "От:", text: "Введите число", handle: setMin, val: min },
    { name: "До:", text: "Введите число", handle: setMax, val: max },
    { name: "Цена:", text: "Введите цену", handle: setPrice, val: price },
  ];

  const handleSave = async () => {
    await user.addLength(min, max, price, material_id);
    setOpen(false);
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <h2>Введите диапазон который хотите добавить:</h2>

      {pricefields.map((el) => (
        <div
          key={el.name}
          style={{
            marginBottom: "10px",
            marginLeft: "10px",
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

      <div
        className="editbtns"
        style={{
          display: "flex",
          gap: "15px",
          width: "100%",
          marginRight: "1%",
        }}
      >
        <Button
          onClick={() => setOpen(false)}
          className="contbtn"
          sx={{ borderRadius: "13px" }}
        >
          Отмена
        </Button>
        <Button
          disabled={min.length === 0 || max.length === 0 || price.length === 0}
          onClick={() => handleSave()}
          className="contbtn save"
          sx={{
            borderRadius: "13px",
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
