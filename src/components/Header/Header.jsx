import { AppBar, Container, Box, Button } from "@mui/material";

import React from "react";
import { user } from "../..";
import { observer } from "mobx-react";

export const Header = observer(
  ({ handleLogin, handleStory, handleControl, handleLogo }) => {
    const handleCloseMenu = (e) => {
      handleLogin(e);
    };

    return (
      <AppBar style={{ background: "white" }} position="relative">
        <Container
          maxWidth="x xl"
          style={{
            color: "black",
            display: "flex",
            alignItems: "center",
            margin: "10px 0px",
            justifyContent: "space-between",
          }}
        >
          <div onClick={() => handleLogo()} style={{ cursor: "pointer" }}>
            <img src="/cutdetallogob.svg" alt="" width={60} height={50} />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              flexWrap: "wrap", // перенос элементов на новую строку при уменьшении экрана
            }}
          >
            <Box sx={{ display: { md: "flex" } }}>
              {!user.isAuth ? (
                <Button
                  onClick={(e) => handleCloseMenu(e)}
                  sx={{
                    color: "white",
                    mx: 1,
                    borderRadius: "10px",
                    padding: "5px 20px",
                    background: "#0A2BA3",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      background: "#0A2BA3",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  Вход
                </Button>
              ) : (
                <>
                  <Button onClick={(e) => handleStory(e)}>Мониторинг</Button>
                  <Button onClick={(e) => handleControl(e)}>Управление</Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </AppBar>
    );
  }
);
