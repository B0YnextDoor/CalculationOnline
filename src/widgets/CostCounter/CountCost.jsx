import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import "./CountCost.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import {
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { user } from "../..";
import { ImagePreview } from "../../components/OrdersStory/ImagePrev";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DFXImage } from "../../components/OrdersStory/ImagePrev";
import Decimal from "decimal.js";

export const CountCost = ({ open, setOpen, infolist, handleCreate }) => {
  const [quantities, setQuantities] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [chosenMaterials, setChoisenMaterials] = useState([]);
  const [actualPrices, setActualPrices] = useState([]);
  const [indexLengths, setIndexLengths] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [priceLists, setPriceLists] = useState([]);
  const [priceTooltips, setPriceTooltips] = useState([]);

  const isMobile = useMediaQuery("(max-width:767px)");

  const handleInit = () => {
    const initialQuantities = infolist.map(() => 1);
    setQuantities(initialQuantities);

    const initialChosenMaterials = infolist.map(() => null);
    setChoisenMaterials(initialChosenMaterials);

    const initialActualPrices = infolist.map(() => null);
    setActualPrices(initialActualPrices);

    const initialIndexLengths = infolist.map(() => null);
    setIndexLengths(initialIndexLengths);

    const initialPriceLists = infolist.map(() => null);
    setPriceLists(initialPriceLists);
  };

  useEffect(() => {
    handleInit();
    (async () => {
      const data = await user.getMaterials();
      setMaterials(data);
    })();
  }, [infolist]);

  const handleCalculated = (quantity, chosenMaterialIdx, fileIdx) => {
    if (
      quantity < 1 ||
      chosenMaterialIdx === null ||
      !materials[chosenMaterialIdx] ||
      !materials[chosenMaterialIdx].lengths.length
    ) {
      return;
    }

    const materialData = materials[chosenMaterialIdx];
    if (!materialData || !materialData.lengths) {
      return;
    }

    const indexLength = user.getIndexLengths(
      materials[chosenMaterialIdx].lengths,
      (infolist[fileIdx].total_length / 1000) * quantity
    );

    setIndexLengths((prevIndexLengths) => {
      const updatedIndexLengths = [...prevIndexLengths];
      updatedIndexLengths[fileIdx] = indexLength;
      return updatedIndexLengths;
    });

    const costOneMaterial = new Decimal(materials[chosenMaterialIdx].price_m2)
      .times(infolist[fileIdx].size_x)
      .times(infolist[fileIdx].size_y)
      .dividedBy(1000000);
    setActualPrices((prevActualPrices) => {
      const updatedActualPrices = [...prevActualPrices];
      updatedActualPrices[fileIdx] = new Decimal(
        materials[chosenMaterialIdx].lengths[indexLength].price
      )
        .times(infolist[fileIdx].total_length)
        .dividedBy(1000)
        .times(quantity)
        .plus(costOneMaterial.times(quantity))
        .toNumber();
      return updatedActualPrices;
    });

    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[fileIdx] = quantity;
      return updatedQuantities;
    });
  };
  useEffect(() => {
    const updatedPriceLists = chosenMaterials.map((chosenMaterial, index) => {
      if (chosenMaterial === null) return null;
      let priceText = "";
      if (materials.length > 0) {
        for (let i = 0; i < materials[chosenMaterial].lengths.length; i++) {
          const data = materials[chosenMaterial].lengths[i];
          if (data.to_length && data.from_length && data.price) {
            priceText +=
              "От " +
              data.from_length +
              " до " +
              data.to_length +
              ". Цена " +
              data.price.toFixed(2) +
              " RUB.";
          }
        }
      }
      return priceText;
    });

    setPriceLists(updatedPriceLists);
  }, [chosenMaterials, materials]);

  const calculatePriceTooltip = (chosenMaterialIdx) => {
    if (chosenMaterialIdx === null || !materials[chosenMaterialIdx]) return "";

    const materialData = materials[chosenMaterialIdx];
    if (!materialData || !materialData.lengths) return "";

    const tooltips = materialData.lengths.map((data) => {
      if (data.to_length && data.from_length && data.price) {
        const quantity = Math.ceil(
          data.from_length / (infolist[0].total_length / 1000)
        );
        return quantity > 0
          ? `От ${data.from_length} до ${
              data.to_length
            }. Количество: ${quantity}. Цена: ${data.price.toFixed(2)} RUB.`
          : "";
      }
      return "";
    });

    return tooltips.filter((tooltip) => tooltip !== "").join("\n");
  };

  useEffect(() => {
    const updatedPriceTooltips = chosenMaterials.map((chosenMaterialIdx) => {
      return calculatePriceTooltip(chosenMaterialIdx);
    });

    setPriceTooltips(updatedPriceTooltips);
  }, [chosenMaterials, materials, infolist]);

  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        scroll="paper"
        fullScreen
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: isMobile ? 8 : 20,
            top: isMobile ? 8 : 60,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>

        <div style={{ padding: "0% 3%" }}>
          <p className="namecount">Расчет стоимости деталей</p>
          {infolist && infolist.length ? (
            infolist.map((el, idx) => (
              <div key={idx} style={{ margin: "10px 0px" }}>
                <div className="infoel" key={idx}>
                  <ImagePreview
                    open={isOpen === idx}
                    setOpen={setIsOpen}
                    file={el.image}
                  />

                  <div
                    style={{
                      maxWidth: "100%",
                      //   height: "200px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={() => setIsOpen(idx)}
                      style={{ cursor: "pointer" }}
                    >
                      <DFXImage file={el.image} />
                    </div>
                  </div>
                  <div>
                    <h3>{el.image_name}</h3>
                    <div>
                      <p>Материал:</p>
                      <Select
                        value={chosenMaterials[idx]}
                        onChange={(e) => {
                          const newMaterials = [...chosenMaterials];
                          newMaterials[idx] = e.target.value;
                          setChoisenMaterials(newMaterials);
                          handleCalculated(
                            quantities[idx],
                            e.target.value,
                            idx
                          );
                        }}
                        sx={{
                          borderRadius: "9.69px",
                          border: "1px solid rgba(10, 43, 163, 1)",
                          width: "90%",
                          marginLeft: "3%",
                          height: "28px",
                          outline: "none",
                        }}
                      >
                        {materials.map((item, ind) => (
                          <MenuItem value={ind} key={ind}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <p>Количество:</p>
                      <FormControl fullWidth={true}>
                        <OutlinedInput
                          notched={false}
                          disabled={chosenMaterials[idx] === null}
                          placeholder="Введите число"
                          type="number"
                          value={quantities[idx]}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue >= 1) {
                              const newQuantities = [...quantities];
                              newQuantities[idx] = inputValue;
                              setQuantities(newQuantities);
                              handleCalculated(
                                inputValue,
                                chosenMaterials[idx],
                                idx
                              );
                            }
                          }}
                          sx={{
                            borderRadius: "9.69px",
                            border: "1px solid rgba(10, 43, 163, 1)",
                            width: "90%",
                            marginLeft: "3%",
                            marginRight: "3%",
                            height: "32px",
                            outline: "none",
                          }}
                        />
                      </FormControl>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                        }}
                      >
                        <span style={{ minWidth: "100px" }}>
                          цена:{" "}
                          {typeof actualPrices[idx] === "number"
                            ? (actualPrices[idx] / quantities[idx]).toFixed(2)
                            : "0"}{" "}
                          р/деталь
                        </span>
                        <Tooltip title={priceTooltips[idx]} arrow>
                          <Button
                            disabled={
                              chosenMaterials[idx] === null ||
                              priceLists[idx] === null
                            }
                          >
                            <HelpOutlineIcon />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                    <h3 style={{ minWidth: "200px" }}>
                      ИТОГО:{" "}
                      {typeof actualPrices[idx] === "number"
                        ? actualPrices[idx].toFixed(2)
                        : null}{" "}
                      RUB
                    </h3>
                  </div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => setOpen(false)}
                    sx={{
                      color: "red",
                      height: "10%",
                    }}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <>
              <div style={{ fontSize: "14px" }} className="namecount">
                Файлы не найдены. Попробуйте снова.
              </div>
              <Button
                onClick={() => setOpen(false)}
                className="readybtn btn"
                sx={{
                  borderRadius: "13px",
                  margin: "10px 0px",
                  color: "white",
                  background: "rgba(10, 43, 163, 1)",
                  "&:hover": {
                    color: "black",
                    background: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                Закрыть
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              handleInit();
              handleCreate({
                files: infolist.map((file, idx) => ({
                  file: file.image,
                  file_dxf: file.file_dxf,
                  file_name: file.file_name,
                  material_id: materials[chosenMaterials[idx]].id,
                  quantity: quantities[idx],
                  total_price:
                    actualPrices[idx] !== null
                      ? actualPrices[idx].toFixed(2)
                      : null,
                  is_processed: true,
                })),
              });
            }}
            disabled={
              indexLengths.some((index) => index === null) ||
              actualPrices.some((price) => price === null || price <= 0)
            }
            className="readybtn btn"
            sx={{
              borderRadius: "13px",
              margin: "100px 0px",
              color: "white",
              background:
                indexLengths.some((index) => index === null) ||
                actualPrices.some((price) => price === null || price <= 0)
                  ? ""
                  : "rgba(10, 43, 163, 1)",
              "&:hover": {
                color: "black",
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            Перейти к оформлению
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
