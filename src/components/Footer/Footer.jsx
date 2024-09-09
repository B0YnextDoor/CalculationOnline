import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.info}>
        <div style={{ display: "flex" }}>
          <img src="/cutdetallogob.svg" alt="" width={60} height={50} />
        </div>
        <div className={styles.connect}>
          <h4>Контакты</h4>
          <span> 8(3412) 460192</span>
          <span>vita-plast18@mail.ru</span>
        </div>
      </div>
      <span>©2024 CUT DETAILS</span>
    </div>
  );
};
