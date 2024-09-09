import { useEffect, useState } from "react";
import "./ControlPrice.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AddMaterial } from "../../widgets/AddMaterial/AddMaterial";
import { EditMaterial } from "../../widgets/EditMaterial/EditMaterial";
import { Box, Button } from "@mui/material";
import { ResponseReady } from "../../widgets/ResponseStatus/ResponseReady";
import { user } from "../../index";
import { Loading } from "../../widgets/Frames/Loading";
import { useMediaQuery } from "@mui/material";

export const ControlPrice = ({ show }) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const [material, setMaterial] = useState([]); //материал для изменения

  const [data, setData] = useState(null);

  useEffect(
    () => async () => {
      if (user.isAuth) {
        const materials = await user.getMaterials();
        setMaterial(materials);
      }
    },
    [user.isAuth]
  );

  const handleAddMaterial = async (
    name,
    price_m2,
    weight_m2,
    from_length,
    to_length,
    price
  ) => {
    if (name && price_m2 && weight_m2 && price && from_length && to_length) {
      setAdd(false);
      setLoading(true);

      const data = await user.addMaterial(name, price_m2, weight_m2);
      if (data !== null && data.pk) {
        await user.addLength(from_length, to_length, price, data.pk);
      }

      setLoading(false);

      if (user.isAuth) {
        const materials = await user.getMaterials();
        setMaterial(materials);
      }
    }
  };

  const handleDelete = async (id) => {
    setEdit(false);
    setLoading(true);
    await user.deleteMaterial(id);

    setLoading(false);

    const materials = await user.getMaterials();
    setMaterial(materials);
  };

  const handleEdit = async (id, from_length, to_length) => {
    setEdit(false);
    setLoading(true);

    await user.editMaterial(id, from_length, to_length);
    const materials = await user.getMaterials();

    setMaterial(materials);
    setLoading(false);
  };

  return (
    <div className="pricecont" style={!show ? { display: "none" } : {}}>
      <Loading
        loading={loading}
        setLoading={setLoading}
        text="Обработка запроса"
      />
      <ResponseReady ready={ready} setReady={setReady} />
      <AddMaterial
        show={add}
        setShow={setAdd}
        handleAddMaterial={handleAddMaterial}
      />
      <EditMaterial
        show={edit}
        setShow={setEdit}
        handleEdit={handleEdit}
        data={data}
      />
      <Button onClick={() => setAdd(true)}>+ Добавить материал</Button>
      {material && material?.length ? (
        material.map((el, idx) => (
          <Box key={idx} id={el.id} className="pricebox">
            <div>
              <h1>{el.name}</h1>
              <h5>Цена в зависимости от метража:</h5>
              <p>
                <span>За м2: </span>
                {el.price_m2} RUB
              </p>
              <p>
                <span>Вес 1 м2: </span>
                {el.weight_m2}
              </p>
            </div>
            <div>
              {el.lengths.length > 0 ? (
                <div>
                  <h5>За пог. метр:</h5>
                  <div style={{ overflowY: "scroll", maxHeight: "100px" }}>
                    {el.lengths.map((num, idx) => (
                      <div key={idx}>
                        {num.from_length && num.to_length ? (
                          <p>
                            <span>
                              <span style={{ color: "#0A2BA3" }}>
                                От: {num.from_length} до {num.to_length}м:{" "}
                              </span>
                              {num.price} RUB
                            </span>
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <IconButton
                id={el.id}
                onClick={(e) => {
                  setData(el);
                  setEdit(true);
                }}
                sx={{
                  color: "rgba(216, 143, 0, 1)",
                }}
              >
                <EditIcon id={el.id} fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
              <IconButton
                id={el.id}
                onClick={(e) => {
                  handleDelete(el.id);
                }}
                sx={{
                  color: "red",
                }}
              >
                <DeleteIcon
                  id={el.id}
                  fontSize={isMobile ? "medium" : "large"}
                />
              </IconButton>
            </div>
          </Box>
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
          Материалы отсутствуют
        </div>
      )}
    </div>
  );
};
