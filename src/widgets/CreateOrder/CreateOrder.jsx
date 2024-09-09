import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  useMediaQuery,
  OutlinedInput,
  Button,
  Typography,
} from "@mui/material";
import "./CreateOrder.css";
import { useState } from "react";

export const CreateOrder = ({
  open,
  setOpen,
  data,
  handlefinishOrder,
  handleBack,
}) => {
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const isMobile = useMediaQuery("(max-width:767px)");
  const [nameCompany, setNameCompany] = useState(null);

  return (
    <div style={!open ? { display: "none" } : {}}>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        // sx={{ maxWidth: 1000 }}
      >
        <p className="nameoff">Оформление заказа</p>
        <FormControl
          style={{
            marginBottom: isMobile ? "20px" : "25px",
          }}
          fullWidth={true}
        >
          <Typography
            sx={{
              marginLeft: "3%",
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Имя
          </Typography>
          <OutlinedInput
            notched={false}
            placeholder="Введите ваше имя"
            type="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="AuthInput"
            sx={{
              borderRadius: "9.69px",
              border: "1.21px solid rgba(10, 43, 163, 1)",
              width: "80%",
              marginLeft: "3%",
              height: "32px",
              outline: "none",
            }}
          />
        </FormControl>
        <FormControl
          style={{
            marginBottom: isMobile ? "20px" : "25px",
          }}
          fullWidth={true}
        >
          <Typography
            sx={{
              marginLeft: "3%",
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Телефон
          </Typography>
          <OutlinedInput
            notched={false}
            placeholder="Введите ваш номер"
            type="Телефон"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="AuthInput"
            sx={{
              borderRadius: "9.69px",
              border: "1.21px solid rgba(10, 43, 163, 1)",
              width: "80%",
              marginLeft: "3%",
              height: "32px",
            }}
          />
        </FormControl>

        <FormControl
          style={{
            marginBottom: isMobile ? "20px" : "25px",
          }}
          fullWidth={true}
        >
          <Typography
            sx={{
              marginLeft: "3%",
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Email
          </Typography>
          <OutlinedInput
            notched={false}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="AuthInput"
            sx={{
              borderRadius: "9.69px",
              border: "1.21px solid rgba(10, 43, 163, 1)",
              width: "80%",
              marginLeft: "3%",
              height: "32px",
            }}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <Typography
            sx={{
              marginLeft: "3%",
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: 400,
              textAlign: "left",
            }}
          >
            Вы являетесь:
          </Typography>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type} //добавить useState
            onChange={(e) => setType(e.target.value)}
            sx={{ marginLeft: "3%" }}
          >
            <FormControlLabel
              value="ind"
              control={<Radio sx={{ color: "rgba(55, 46, 153, 1)" }} />}
              label="Физическое лицо"
            />
            <FormControlLabel
              value="ent"
              control={<Radio />}
              label="Юдическое лицо"
            />
          </RadioGroup>
          {type !== "ind" && (
            <FormControl
              style={{
                marginBottom: isMobile ? "20px" : "25px",
              }}
              fullWidth={true}
            >
              <Typography
                sx={{
                  marginLeft: "3%",
                  fontFamily: "Montserrat",
                  fontSize: "24px",
                  fontWeight: 400,
                }}
              >
                Название компании
              </Typography>
              <OutlinedInput
                notched={false}
                placeholder="Введите ваш номер"
                type="Телефон"
                onChange={(e) => setNameCompany(e.target.value)}
                value={nameCompany}
                className="AuthInput"
                sx={{
                  borderRadius: "9.69px",
                  border: "1.21px solid rgba(10, 43, 163, 1)",
                  width: "80%",
                  marginLeft: "3%",
                  height: "32px",
                }}
              />
            </FormControl>
          )}
        </FormControl>
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
            onClick={() => {
              setOpen(false);
              handleBack(true);
            }}
            className="contbtn"
            sx={{ borderRadius: "10px" }}
          >
            Вернуться к файлам
          </Button>
          <Button
            onClick={() => {
              handlefinishOrder({
                ...data,
                name,
                phone,
                email,
                client: type,
                company_name: nameCompany,
              });

              setEmail("");
              setPhone("");
              setType("");
              setNameCompany("");
            }}
            disabled={
              name === null || phone === null || email === null || type === null
            }
            className="contbtn"
            sx={{
              backgroundColor:
                name === null ||
                phone === null ||
                email === null ||
                type === null
                  ? ""
                  : "rgba(10, 43, 163, 1)",
              borderRadius: "10px",
              color: "white",
              "&:hover": {
                color: "black",
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            Сформировать заказ
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
