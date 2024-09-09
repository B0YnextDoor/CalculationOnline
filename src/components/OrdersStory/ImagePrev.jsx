import { Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";

export const ImagePreview = ({ open, setOpen, file }) => {
  const imageRef = useRef(null);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (imageRef.current) {
  //         const dialogWidth = imageRef.current.parentElement.offsetWidth;
  //         const dialogHeight = imageRef.current.parentElement.offsetHeight;
  //         const svg = imageRef.current.querySelector("svg");

  //         if (svg) {
  //           const svgWidth = svg.getAttribute("width");
  //           const svgHeight = svg.getAttribute("height");

  //           if (svgWidth && svgHeight) {
  //             const widthRatio = dialogWidth / parseFloat(svgWidth);
  //             const heightRatio = dialogHeight / parseFloat(svgHeight);
  //             const scaleFactor = Math.min(widthRatio, heightRatio);

  //             svg.style.width = `${parseFloat(svgWidth) * scaleFactor}px`;
  //             svg.style.height = `${parseFloat(svgHeight) * scaleFactor}px`;
  //           }
  //         }
  //       }
  //     };

  //     if (open) {
  //       handleResize();
  //       window.addEventListener("resize", handleResize);
  //     }

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, [open]);

  return (
    <Dialog onClose={() => setOpen(null)} open={open} scroll="paper">
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "red",
        }}
      >
        <CloseIcon />
      </IconButton>
      <div
        style={{
          display: "flex",
          margin: "20px",
          height: "100%",
          alignItems: "center",
          width: "100%",
          //   overflow: "hidden",
        }}
      >
        <div
          ref={imageRef}
          dangerouslySetInnerHTML={{ __html: file }}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        ></div>
      </div>
    </Dialog>
  );
};

export const DFXImage = ({ file }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const container = imageRef.current.parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const svg = container.querySelector("svg");

        if (svg) {
          svg.style.width = `${containerWidth}px!important`;
          svg.style.height = `${containerHeight}px!important`;
          svg.style.scale = "0.5";
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [file]);

  return (
    <div
      ref={imageRef}
      style={{
        // maxWidth: "100%",
        // maxHeight: "100%",
        overflow: "hidden",
      }}
      dangerouslySetInnerHTML={{ __html: file }}
    ></div>
  );
};
