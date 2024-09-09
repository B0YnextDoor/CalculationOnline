import { useState, useEffect } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Instruction } from "./components/Instruction/Instruction";
import { MainLanding } from "./components/MainLanding/MainLanding";
import { Alert } from "@mui/material";
import { when } from "mobx";
import { OrdersStory } from "./components/OrdersStory/OrdersStory";
import { ControlMenu } from "./components/ControlMenu/ControlMenu";
import { SignInWidget } from "./widgets/Sign/SingIn";
import { user } from ".";
import { observer } from "mobx-react";

export const App = observer(() => {
  const [showStory, setShowStory] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  when(
    () => !user.email.length,
    () => {
      user.getMe();
    }
  );

  useEffect(() => {
    if (user.text?.length > 0) {
      const intervalId = setInterval(() => {
        user.setText("");
        clearInterval(intervalId);
      }, 7000);
    }
  }, [user.text]);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
  };

  const handleStory = () => {
    setShowControl(false);
    setShowStory(!showStory);
  };

  const handleControl = () => {
    setShowStory(false);
    setShowControl(!showControl);
  };

  const handleLogo = () => {
    setShowControl(false);
    setShowStory(false);
  };

  return (
    <>
      <div className="App">
        <div className="alert-container">
          {user.text.length !== 0 && (
            <Alert
              sx={{ zIndex: "9999999" }}
              variant="filled"
              severity={user.severity}
              style={{ maxWidth: "80%", margin: "0 auto" }}
            >
              {user.text}
            </Alert>
          )}
        </div>
        <Header
          handleStory={handleStory}
          handleControl={handleControl}
          handleLogo={handleLogo}
          handleLogin={handleLogin}
        />
        <OrdersStory show={showStory} setShow={setShowStory} />
        <ControlMenu show={showControl} setShow={setShowControl} />
        <MainLanding showStory={showStory} showControl={showControl} />
        <Instruction showStory={showStory} showControl={showControl} />
        <SignInWidget
          showLogin={showLogin}
          handleLogin={handleLogin}
          handleStory={handleStory}
        />
      </div>
      <Footer />
    </>
  );
});
