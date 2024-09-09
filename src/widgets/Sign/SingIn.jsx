import {
  Dialog,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  useMediaQuery,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { user } from "../../index";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { observer } from "mobx-react";

export const SignInWidget = observer(({ showLogin, handleLogin }) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, handlePass] = useState("");

  const handleSubmit = async (e) => {
    await user.login(email, password);
    if (user.isAuth) {
      handleLogin(e);
    }
  };

  return (
    <Dialog open={showLogin} onClose={(e) => handleLogin(e)}>
      <DialogTitle>Админ панель</DialogTitle>
      <DialogContent>
        <FormControl
          style={{
            marginBottom: isMobile ? "20px" : "40px",
          }}
          fullWidth={true}
        >
          <OutlinedInput
            notched={false}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="AuthInput"
          />
        </FormControl>

        <FormControl
          fullWidth={true}
          style={{
            marginBottom: isMobile ? "10px" : "20px",
            color: "white",
          }}
        >
          <OutlinedInput
            notched={false}
            placeholder="Пароль"
            className="AuthInput"
            value={password}
            onChange={(e) => handlePass(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          fullWidth={true}
          color="inherit"
          variant="contained"
          disabled={email.length === 0 || password.length === 0}
          onClick={(e) => handleSubmit(e)}
          sx={{
            backgroundColor: "#0A2BA3",
            borderStyle: "solid",
            borderRadius: "10px",
            color: "white",
            "&:hover": {
              color: "black",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          Вход
        </Button>
      </DialogContent>
    </Dialog>
  );
});
