import { NavLink, Redirect, useLocation } from "react-router-dom";
import {
  useState,
  useRef,
  useCallback,
  FormEvent,
  useEffect,
  useMemo,
} from "react";
import { GAMES_URL } from "../../../../utils/links";
import styles from "./Card.module.scss";
import { Modal } from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { selectDataUser, selectLanguage } from "../../../../redux/selectors";
import { ApiService } from "../../../../api/ApiService";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import { Service } from "../../../../models/service";

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
    description: string;
  }[];
  activeCategory?: {
    slug: string;
    title: string;
    id: number;
    game: number;
    title_column: { title: string; choices: never[] }[];
    description: string;
  };
};
type SubCat = {
  title: string
  description: string
}
type DropdownSubCat = {
  value: string
  label: string
}
export default function Card({ categories, game, activeCategory }: CardProps) {
  const ref = useRef<HTMLFormElement>(null);
  const apiService = new ApiService();

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [getOptionsSubcat, setGetOptionsSubcat] = useState<DropdownSubCat | null>(null);
  const [sendAllSubcatOffer, setSendAllSubcatOffer] = useState<SubCat[]>([]);

  // const [sendCategoryOffer, setSendCategoryOffer] = useState("");
  const [sendTitleOffer, setSendTitleOffer] = useState("");
  const [sendDescriptionOffer, setSendDescriptionOffer] = useState("");
  const [sendPriceOffer, setSendPriceOffer] = useState("");

  const [auth, setAuth] = useState(false);

  const dataUser = useSelector(selectDataUser);
  const language = useSelector(selectLanguage)


  //субкатегории
  // const mockSubcat = [
  //   { title: "Сервер", choices: ["Север", "Юг"] },
  //   { title: "Автиность", choices: ["Онлайн", "Оффлайн"] },
  //   { title: "Тип", choices: ["Рак", "Дебил", "Имба"] },
  // ];



  //чтобы стать продавцом
  const sendSellerExist = async (dataSeller: {username:string, phone_number:string}) => {
    await apiService.sellerExist(dataSeller);
  };
  const handleSubmitIsSeller = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const validNumber = phoneNumber.replace(/\D/g, "").replace(/^7/, "8");
      const dataSeller = {
        username: dataUser.username,
        phone_number:validNumber
      };
      sendSellerExist(dataSeller);
      const alertMessageSeller = language === "rus" ? "заявка принята" : language === "eng" ? "application accepted" : "китайский"
      alert(alertMessageSeller);
      setModalVisible(false);
    },
    [phoneNumber, dataUser]
  );
  //отправить форму сервиса
  const optionToSubCat = activeCategory?.title_column.map((item) => {
    return {
      name: item.title,
      options: item.choices.map((i:any, index) => {
        return { value: `${item.title}_${index + 1}`, label: i.title_of_choice };
      }),
    };
  });
  
  
  useMemo(() => {

    const _getOptionsSubcat: SubCat = { title: getOptionsSubcat?.value ?? "", description: getOptionsSubcat?.label ?? "" }
    const data: SubCat[] =

      sendAllSubcatOffer.filter((i) => i.title !== _getOptionsSubcat.title) ||
      [];
    if (_getOptionsSubcat.title) {
      data.push(_getOptionsSubcat);
    }
    // console.log(data);
    setSendAllSubcatOffer(data);
  }, [getOptionsSubcat]);

  const sendServiceOffer = async (dataPostServices: Service) => {
    const data = await apiService.postServices(dataPostServices);
    const alertMessageSeller = language === "rus" ? "заявка принята" : language === "eng" ? "application accepted" : "китайский"
    alert(alertMessageSeller)
  };
// console.log(sendAllSubcatOffer);

  const handleSubmitOffer = useCallback(
    (event: FormEvent) => {
      event.preventDefault();


      const dataOffer = {
        detail_description: sendDescriptionOffer,
        short_description: sendTitleOffer,
        seller: dataUser.id,
        category: activeCategory?.id,
        price: sendPriceOffer,
        additional: sendAllSubcatOffer,
      };
      console.log(dataOffer);
      sendServiceOffer(dataOffer)
      setModalVisible(false);
      setSendPriceOffer("")
      setSendDescriptionOffer("")
    },
    [
      sendServiceOffer,
      sendDescriptionOffer,
      sendTitleOffer,
      dataUser,
      activeCategory,
      sendPriceOffer,
      sendAllSubcatOffer,
    ]
  );
  //
  const { pathname } = useLocation();

  const openModal = () => {
    if (dataUser.email.length < 1) {
      setAuth(true);
    } else {
      setModalVisible(true);
      setSendAllSubcatOffer([]);
    }
  };

  const modalContent = () => {
    if (dataUser.isSeller) {
      return (
        <form
          className={styles.form__send_number}
          onSubmit={handleSubmitOffer}
          ref={ref}>
          <div className={styles.form__send_number_title}>
          {language === "rus" ? "Заполните форму товара" : language === "eng" ? "Fill out the product form" : 'chinese'}
          </div>
          <input
            value={dataUser.username}
            disabled
            className={styles.form__send_number_disabled}
            type="text"
          />
          <input
            value={activeCategory?.title}
            disabled
            className={styles.form__send_number_disabled}
            type="text"
          />
          {/* <Dropdown
            name={"hueta"}
            isMulti={false}
            options={[{value:"sev", label:"Sever"}]}
            setSelectValue={setGetOptionsSubcat}
          /> */}
          {optionToSubCat?.map((firstItem, index) => {
            return (
              <Dropdown
                key={index}
                name={firstItem.name}
                isMulti={false}
                options={firstItem.options}
                setSelectValue={setGetOptionsSubcat}
              />
            );
          })}
          {/* <Dropdown isMulti={true} options={test2} setSelectValue={setSendSendSybCatOffer} /> */}
          {/* {activeCategory} */}
          <input
            value={sendTitleOffer}
            onChange={(e): void => setSendTitleOffer(e.target.value)}
            className={styles.form__send_number_sellerNumber}
            type="text"
            placeholder={language === "rus" ? "что хотите продать" : language === "eng" ? "what do you want to sell" : 'chinese'}
          />
          <textarea
            className={styles.form__send_number_sellerNumber}
            value={sendDescriptionOffer}
            onChange={(e) => setSendDescriptionOffer(e.target.value)}
            placeholder={language === "rus" ? "описание" : language === "eng" ? "description" : 'chinese'}
            name=""
            id=""></textarea>

          <input
            value={sendPriceOffer}
            onChange={(e): void => setSendPriceOffer(e.target.value)}
            className={styles.form__send_number_sellerNumber}
            type="text"
            placeholder={language === "rus" ? "цена" : language === "eng" ? "price" : 'chinese'}
          />

          <button className={styles.form__send_number_button}>
            {language === "rus" ? "отправить форму" : language === "eng" ? "send form" : 'chinese'}
          </button>
        </form>
      );
    } else {
      return (
        <form
          className={styles.form__send_number}
          onSubmit={handleSubmitIsSeller}
          ref={ref}>
          <div className={styles.form__send_number_title}>
            {language === "rus" ? "введите номер телефона" : language === "eng" ? "enter your phone number" : 'chinese'}
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
            placeholder= {language === "rus" ? "номер телефона" : language === "eng" ? "phone number" : 'chinese'}
          />

          <button className={styles.form__send_number_button}>
          {language === "rus" ? "отправить форму" : language === "eng" ? "send form" : 'chinese'}
          </button>
        </form>
      );
    }
  };
  // const findCategory = categories.find((el) => {return pathname.includes(el.slug.replace(/\s+/g, "").toLowerCase())})

  // let sellItemName = pathname.includes("Аккаунты")
  //   ? "аккаунты"
  //   : pathname.includes("akkaunty")
  //   ? "аккаунт"
  //   : pathname.includes("all")
  //   ? "предметы"
  //   : pathname.includes("services")
  //   ? "услуги"
  //   : "валюту";

  if (auth) return <Redirect to={"/login"} />;
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`https://alexeygrinch.pythonanywhere.com${game.image_of_game}`}
        alt="avatar"
      />
      <div className={styles.card_description}>
        <div className={styles.title}>
          <span>{game.title}</span>
          <button onClick={openModal}>
          {language === "rus" ? "продать" : language === "eng" ? "sell" : 'chinese'} {activeCategory?.title || "валюту"}
          </button>
        </div>
        <div className={styles.text}>
          {activeCategory?.description || game.description}
        </div>
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
