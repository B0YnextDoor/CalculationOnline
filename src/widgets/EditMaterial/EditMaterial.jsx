import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import "./EditMaterial.css";
import { AddRange } from "./addRange";
import { useEffect, useState } from "react";

export const EditMaterial = ({ show, setShow, handleEdit, data }) => {
  const [fromLength, setFromLength] = useState(null);
  const [toLength, setToLength] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFromLength(
      (data && data.lengths && data.lengths[0].from_length) || null
    );
    setToLength((data && data.lengths && data.lengths[0].to_length) || null);
  }, [show]);

  return (
    <>
      <AddRange open={open} setOpen={setOpen} material_id={data && data.id} />
      <Dialog onClose={() => setShow(false)} open={show}>
        <div className="editpricebox">
          <div style={{ marginLeft: "3%" }}>
            <h1>{data && data.name}</h1>
            <h5>Цена в зависимости от метража:</h5>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <FormControl>
                <InputLabel>За м2:</InputLabel>
                <OutlinedInput
                  label="За м2:"
                  type="email"
                  defaultValue={fromLength}
                  onChange={(e) => setFromLength(e.target.value)}
                  value={fromLength}
                  className="AuthInput"
                />
              </FormControl>
              <FormControl>
                <InputLabel>Вес 1 м2: </InputLabel>
                <OutlinedInput
                  label="Вес 1 м2:"
                  type="email"
                  onChange={(e) => setToLength(e.target.value)}
                  value={toLength}
                  className="AuthInput"
                />
              </FormControl>
            </div>
          </div>
        </div>
        {
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            variant="contained"
            sx={{ background: "rgba(0, 160, 35, 1)", marginBottom: "10px" }}
          >
            Добавить диапазон
          </Button>
        }

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
            onClick={() => setShow(false)}
            className="contbtn"
            sx={{ borderRadius: "13px" }}
          >
            Отмена
          </Button>
          <Button
            onClick={() => handleEdit(data.id, fromLength, toLength)}
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
    </>
  );
};
