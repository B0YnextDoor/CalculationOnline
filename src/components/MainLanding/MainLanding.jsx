import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { Loading } from "../../widgets/Frames/Loading";
import { FileReady } from "../../widgets/Frames/FileReady";
import { CreateOrder } from "../../widgets/CreateOrder/CreateOrder";
import { user } from "../..";
import { convertBase64 } from "../../utils/convertFile";
import { CountCost } from "../../widgets/CostCounter/CountCost";
import { LoadingOrder } from "../../widgets/OrderStatus/LoadingOrder";
import { OrderReady } from "../../widgets/OrderStatus/OrderReady";

export const MainLanding = ({ showStory, showControl }) => {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [orderFile, setFile] = useState([]);

  const [createOrder, setCreate] = useState(false);
  const [countPrice, setCount] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [orderReady, setOrderReady] = useState(false);

  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleClick(e);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let files = [];

    if (e.target && e.target.files && e.target.files.length > 0) {
      files = e.target.files;
    } else if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      files = e.dataTransfer.files;
    }

    if (files.length > 0) {
      setLoading(true);

      let data = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await convertBase64(files[i]);

        const response = await user.loadFile(files[i].name, base64);

        if (response.length > 0) {
          const loadData = [
            { ...response[0], file_dxf: base64, file_name: files[i].name },
          ];
          data = [...loadData, ...data];
        }
      }

      setFile(data);
      setLoading(false);
      setReady(true);
      return;
    }

    setLoading(false);
    user.setText("Ошибка обработки файла", "error");
  };

  const handleCreate = (data) => {
    setOrderData(data);
    setCreate(true);
    setCount(false);
  };

  const handleFinishOrder = async (data) => {
    setCreate(false);
    setLoadingOrder(true);
    for (let i = 0; i < data.files.length; i++) {
      const request = { ...data.files[i], ...data };
      await user.createOrder(request);
    }

    setLoadingOrder(false);
    setOrderReady(true);
  };

  return (
    <div
      className="main"
      style={showStory || showControl ? { display: "none" } : {}}
    >
      <CountCost
        open={countPrice}
        setOpen={setCount}
        infolist={orderFile}
        handleCreate={handleCreate}
      />
      <CreateOrder
        open={createOrder}
        setOpen={setCreate}
        data={orderData}
        handlefinishOrder={handleFinishOrder}
        handleBack={setCount}
      />
      <LoadingOrder loading={loadingOrder} setLoading={setLoadingOrder} />
      <OrderReady ready={orderReady} setReady={setOrderReady} />
      <Loading loading={loading} setLoading={setLoading} />
      <FileReady ready={ready} setReady={setReady} countPrice={setCount} />
      <Box
        sx={{
          width: "100%",
          justifySelf: "center",
          justifyItems: "center",
          display: "flex",
          flexWrap: "wrap",
          //   height: "100vh",
          marginBottom: "5%",
          justifyContent: "space-between",
        }}
      >
        <Box className="text">
          <span>
            Быстрый
            <br />
            расчёт
            <br />
          </span>
          стоимости
          <br />
          деталей по
          <br />
          чертежам DXF
        </Box>

        <Box className="dropfiles" sx={{ display: { xs: "none", md: "flex" } }}>
          <div className="base" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div>
              <img src="/dropimg.svg" alt="" />
            </div>
            <input
              type="file"
              hidden
              onChange={(e) => handleClick(e)}
              ref={inputRef}
              multiple
            />
            <Button
              sx={{
                width: "100%",
                padding: "24px 86px",
                marginTop: "20px",
                marginBottom: "20px",
                borderRadius: "13px",
                border: "none",
                background: "rgba(10, 43, 163, 1)",
                color: "white",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "30px",
                fontWeight: 500,
                lineHeight: "37px",
                letterSpacing: "0em",
                "&:hover": {
                  color: "black",
                  background: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                },
              }}
              onClick={() => inputRef.current.click()}
              className="UploadFiles"
            >
              Загрузить сейчас
            </Button>
          </div>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
        <input
          type="file"
          hidden
          onChange={(e) => handleClick(e)}
          ref={inputRef}
          multiple
        />
        <Button
          sx={{
            width: "100%",
            padding: "24px 86px",
            margin: "20px",
            borderRadius: "13px",
            border: "none",
            background: "rgba(10, 43, 163, 1)",
            color: "white",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "37px",
            letterSpacing: "0em",
            "&:hover": {
              color: "black",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            },
          }}
          onClick={() => inputRef.current.click()}
          className="UploadFiles"
        >
          Загрузить сейчас
        </Button>
      </Box>
    </div>
  );
};
