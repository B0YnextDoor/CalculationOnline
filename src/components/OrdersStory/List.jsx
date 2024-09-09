import { useEffect, useState } from "react";
import { DFXImage, ImagePreview } from "./ImagePrev";
import "./OrdersStory.css";
import { user } from "../..";
import { convertDateTime } from "../../utils/convertData";
import { base64toBlob } from "../../utils/base64ToBlob.js";

export const List = ({ state, data }) => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div style={{ marginTop: 20 }}>
        {!state ? (
          data && data?.length ? (
            data.map((count, idx) => (
              <div key={idx} className="count">
                <ImagePreview
                  open={open === idx}
                  setOpen={setOpen}
                  file={count.file}
                />
                <div
                  style={{
                    flexGrow: 1,
                    maxWidth: "100%",
                  }}
                  onClick={() => setOpen(idx)}
                >
                  <div>
                    <DFXImage file={count.file} />
                  </div>
                </div>

                <CountData count={count} />
              </div>
            ))
          ) : (
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 400,
                fontSize: "20.55px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Расчёты отсутствуют
            </div>
          )
        ) : data && data?.length ? (
          data.map((order, idx) => (
            <div key={idx} className="order">
              <ImagePreview
                open={open === idx}
                setOpen={setOpen}
                file={order.file}
              />
              <div
                style={{
                  flexGrow: 1,
                  maxWidth: "100%",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(!open)}
              >
                <DFXImage file={order.file} />
              </div>
              <div>
                <h1>Данные расчёта</h1>
                <CountData count={order} />
              </div>
              <div>
                <h1>Данные клиента</h1>
                <ClientData client={order} />
              </div>
              <div style={{ marginTop: "3%" }}>
                Статус:
                <span
                  className="orderstatus"
                  style={
                    order.is_processed
                      ? { color: "rgba(6, 134, 19, 1)" }
                      : { color: "rgba(216, 143, 0, 1)" }
                  }
                >
                  {order.is_processed ? "Обработан" : "Ожидание "}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 400,
              fontSize: "20.55px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Заказы отсутствуют
          </div>
        )}
      </div>
    </>
  );
};

export const CountData = ({ count }) => {
  const [materialName, setMaterialName] = useState(null);

  const handleClick = () => {
    const dxfBlob = base64toBlob(count.file_dxf);
    const url = window.URL.createObjectURL(dxfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `file${count.issue_date}-${count.material_id}.dxf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    (async () => {
      const materials = await user.getMaterials();
      for (let i = 0; i < materials.length; i++) {
        if (count.material_id === materials[i].id) {
          setMaterialName(materials[i].name);
        }
      }
    })();
  }, [count]);

  return (
    <div className="datacont">
      <p>
        <span>Дата расчёта: </span>
        {convertDateTime(count.issue_date)}
      </p>
      <p>
        <span>Имя файла: </span>
        <a
          href="#"
          onClick={() => handleClick()}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          file{count.issue_date}-{count.material_id}.dxf
        </a>
      </p>
      {materialName !== null && (
        <p>
          <span>Материал: </span>
          {materialName}
        </p>
      )}
      <p>
        <span>Количество: </span>
        {count.quantity}
      </p>
      <p>
        <span>Итог по цене: </span>
        {count.total_price} RUB
      </p>
    </div>
  );
};

export const ClientData = ({ client }) => {
  return (
    <div className="datacont">
      <p>
        <span>Дата оформления: </span>
        {convertDateTime(client.issue_date)}
      </p>
      <p>
        <span>Имя: </span>
        {client.name}
      </p>
      <p>
        <span>Телефон: </span>
        {client.phone}
      </p>
      <p>
        <span>Email: </span>
        {client.email}
      </p>
      <p>
        <span>Вид клиента: </span>
        {client.client === "ind" ? "Физ. лицо" : "Юр. лицо"}
      </p>
    </div>
  );
};
