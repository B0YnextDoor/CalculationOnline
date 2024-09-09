import styles from "./Instruction.module.css";

export const Instruction = ({ showStory, showControl }) => {
  return (
    <div
      className={styles.container}
      style={showStory || showControl ? { display: "none" } : {}}
    >
      {instrList.map((el) => (
        <div key={el.img}>
          <img src={el.img} alt="" />
          <div style={{ margin: "10px 0 10px 0" }}>
            {el.name.map((str) => (
              <h4 key={str}>{str}</h4>
            ))}
          </div>
          {el.text.map((str) => (
            <p key={str}>{str}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

const instrList = [
  {
    img: "1.svg",
    name: ["Загрузите", "файлы DXF"],
    text: ["Загрузите один или", "несколько DXF файлов", "для обработки"],
  },
  {
    img: "2.svg",
    name: ["Укажите материал", "и количество"],
    text: ["Выберите один из", "доступных материалов", "и объем производства"],
  },
  {
    img: "3.svg",
    name: ["Посмотрите", "результат"],
    text: ["Посмотрите результат", "и оформите заказ не", "выходя со страницы"],
  },
];
