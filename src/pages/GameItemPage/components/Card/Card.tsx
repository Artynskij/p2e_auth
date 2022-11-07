import { NavLink, Redirect, useLocation } from "react-router-dom";
import React, { useState, useRef, useCallback, FormEvent } from "react";
import { GAMES_URL } from "../../../../utils/links";
import { games } from "../../../../utils/mockData";
import styles from "./Card.module.scss";
import { Modal } from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { selectDataUser } from "../../../../redux/selectors";
import { ApiService } from "../../../../api/ApiService";

export type CardProps = typeof games[0];

export default function Card({ imgBig, name, description, tags }: CardProps) {
  const ref = useRef<HTMLFormElement>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [auth, setAuth] = useState(false);
  const dataUser = useSelector(selectDataUser);

  const sendSellerExist = async (dataSeller:any) => {
    const apiService = new ApiService()
    await apiService.sellerExist(dataSeller)
  }
  useCallback(() => {}, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      
      const validNumber = phoneNumber.replace(/\D/g, "").replace(/^7/, "8");
      const dataSeller = {
        username:dataUser.username,
        phone_number:validNumber
      }
      sendSellerExist(dataSeller)
      console.log(validNumber);
    },
    [phoneNumber,dataUser]
  );
  const { pathname } = useLocation();

  const openModal = () => {
    if (dataUser.email.length < 1) {
      setAuth(true);
      console.log("openModal");
    } else {
      setModalVisible(true);
    }
  };

  const modalContent = () => {
    return (
      <form
        className={styles.form__send_number}
        onSubmit={handleSubmit}
        ref={ref}>
        <div className={styles.form__send_number_title}>
          Введите номер телефона
        </div>
        <input
          value={dataUser.username}
          disabled
          className={styles.form__send_number_disabled}
          type="text"
        />
        <input
          value={phoneNumber}
          onChange={(e): void => setPhoneNumber(e.target.value)}
          className={styles.form__send_number_sellerNumber}
          type="text"
          placeholder="номер телефона"
        />

        <button className={styles.form__send_number_button}>
          Отправить форму
        </button>
      </form>
    );
  };

  let sellItemName = pathname.includes("kinah")
    ? "валюту"
    : pathname.includes("accounts")
    ? "аккаунт"
    : pathname.includes("items")
    ? "предметы"
    : pathname.includes("services")
    ? "услуги"
    : "валюту";

  if (auth) return <Redirect to={"/login"} />;
  return (
    <div className={styles.container}>
      <img className={styles.img} src={imgBig} alt="avatar" />
      <div>
        <div className={styles.title}>
          <span>{name}</span>
          <button onClick={openModal}>Продать {sellItemName}</button>
        </div>
        <div className={styles.text}>{description}</div>
        <div className={styles.itemContainer}>
          {tags.en.split(",").map((item, index) => (
            <NavLink
              className={
                pathname.includes(item.replace(/\s+/g, "").toLowerCase()) ||
                (pathname === `${GAMES_URL}/${name}` && index === 0)
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              key={index}
              to={`${GAMES_URL}/${name}/${item
                .replace(/\s+/g, "")
                .toLowerCase()}`}>
              {tags.ru.split(",")[index]}
            </NavLink>
          ))}
        </div>
      </div>
      <Modal
        content={modalContent}
        active={modalVisible}
        setActive={setModalVisible}
      />
    </div>
  );
}
