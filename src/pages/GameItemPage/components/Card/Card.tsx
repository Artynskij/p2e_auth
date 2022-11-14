import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useState, useRef, useCallback, FormEvent, useEffect } from "react";
import { GAMES_URL } from "../../../../utils/links";
import styles from "./Card.module.scss";
import { Modal } from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { selectDataUser } from "../../../../redux/selectors";
import { ApiService } from "../../../../api/ApiService";

// export type CardProps = typeof games[0];
export type CardProps = {
  game: {
    id: number;
    title: string;
    description: string;
    image_of_game: string;
  };
  categories: {
    slug: string;
    title: string;
    id: number;
    game: number;
    title_column: never[];
  }[];
};

export default function Card({ categories, game }: CardProps) {
  const ref = useRef<HTMLFormElement>(null);
  console.log(categories);

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [auth, setAuth] = useState(false);
  const dataUser = useSelector(selectDataUser);

  const sendSellerExist = async (dataSeller: any) => {
    const apiService = new ApiService();
    await apiService.sellerExist(dataSeller);
  };

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      const validNumber = phoneNumber.replace(/\D/g, "").replace(/^7/, "8");
      const dataSeller = {
        username: dataUser.username,
        phone_number: validNumber,
      };
      sendSellerExist(dataSeller);
      console.log(validNumber);
    },
    [phoneNumber, dataUser]
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

  let sellItemName = pathname.includes("Аккаунты")
    ? "аккаунты"
    : pathname.includes("categories.slug")
    ? "аккаунт"
    : pathname.includes("all")
    ? "предметы"
    : pathname.includes("services")
    ? "услуги"
    : "валюту";

  if (auth) return <Redirect to={"/login"} />;
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`https://alexeygrinch.pythonanywhere.com${game.image_of_game}`}
        alt="avatar"
      />
      <div>
        <div className={styles.title}>
          <span>{game.title}</span>
          <button onClick={openModal}>Продать {sellItemName}</button>
        </div>
        <div className={styles.text}>{game.description}</div>
        <div className={styles.itemContainer}>
          {/* {tags.en.split(",").map((item, index) => (
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
          ))} */}
          {categories.map((cat, index) => {
            return (
              <NavLink
                key={index}
                className={
                  pathname.includes(
                    cat.slug.replace(/\s+/g, "").toLowerCase()
                  ) ||
                  (pathname === `${GAMES_URL}/${game.title}` && game.id === 0)
                    ? `${styles.item} ${styles.itemActive}`
                    : styles.item
                }
                to={`${GAMES_URL}/${game.title}/${cat.slug
                  .replace(/\s+/g, "")
                  .toLowerCase()}`}>
                {cat.title}
              </NavLink>
            );
          })}

          {/* <NavLink
              className={
                pathname.includes(categories.slug.replace(/\s+/g, "").toLowerCase()) ||
                (pathname === `${GAMES_URL}/${title}` && id === 0)
                  ? `${styles.item} ${styles.itemActive}`
                  : styles.item
              }
              to={`${GAMES_URL}/${title}/all`}>
              All
            </NavLink> */}
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
