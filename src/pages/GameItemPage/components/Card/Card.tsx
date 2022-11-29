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
import { Category, Game } from "../../../../models/modelsGetData";
import { mainApiUrlImg } from "../../../../utils/mainApiUrl";

// export type CardProps = typeof games[0];
export type CardProps = {
  game: Game;
  categories: Category[];
  activeCategory?: Category;
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
  const [sendAmountOffer, setSendAmountOffer] = useState("");
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
  const sendSellerExist = async (dataSeller: { username: string, phone_number: string }) => {
    const data = await apiService.sellerExist(dataSeller);
    console.log(data);
  };
  const handleSubmitIsSeller = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const validNumber = phoneNumber.replace(/\D/g, "").replace(/^7/, "8");
      const dataSeller = {
        username: dataUser.username,
        phone_number: validNumber
      };
      sendSellerExist(dataSeller);

      const alertMessageSeller = language === "rus" ? "заявка принята" : language === "eng" ? "application accepted" : "китайский"
      alert(alertMessageSeller);
      setModalVisible(false);
    },
    [phoneNumber, dataUser]
  );
  /////////////////////////////////////////////////////////////find language in subCategories
  const changeSubTitle: any = activeCategory?.title_column.map((firstEl: any) => {
    const firstAss = language === "eng" ? firstEl.eng : language === "rus" ? firstEl.rus : firstEl.chi// title:"", id:num
    const choices = firstEl.choices.map((choys: any) => {
      const choysLn = language === "eng" ? choys.eng : language === "rus"
        ? choys.rus : choys.chi
      const dataChoys = {
        idCoys: choys.id,
        title: choysLn.title
      }
      return dataChoys
    })
    const mainData = {
      title: firstAss.title,
      choices: choices
    }

    return mainData
  })
  ///////////////////////////////////////////////////
  //отправить форму сервиса
  const optionToSubCat = changeSubTitle.map((item: any) => {
    return {
      name: item.title,
      options: item.choices.map((i: any, index: any) => {
        return { value: i.idCoys, label: i.title }; ///OLD////    return { value: `${item.title}_${index + 1}`, label: i };
      }),
    };
  });
  //разбивка Sub cat в правильный порядок
  useMemo(() => {
    const _getOptionsSubcat: SubCat = { title: getOptionsSubcat?.value ?? "", description: getOptionsSubcat?.label ?? "" }
    const data: any =
      sendAllSubcatOffer.filter((i) => i.title !== _getOptionsSubcat.title) || [];
    if (_getOptionsSubcat.title) {
      data.push(_getOptionsSubcat);
    }
    setSendAllSubcatOffer(data);
  }, [getOptionsSubcat]);

  const sendServiceOffer = async (dataPostServices: any) => {
    const data = await apiService.postServices(dataPostServices);
    console.log(data);
    const alertMessageSeller = language === "rus" ? "заявка принята" : language === "eng" ? "application accepted" : "китайский"
    alert(alertMessageSeller)
  };


  const handleSubmitOffer = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const findIdSybCat = sendAllSubcatOffer.map((subCat) => {
        const dataSubCat = changeSubTitle.find((item1: any) => item1.title === subCat.title).choices
          .filter((itemChoys: any) => itemChoys.title === subCat.description)
        const pushDataSubCat = dataSubCat.map((item: any) => item.idCoys)
        return pushDataSubCat[0]

      })

      const dataOffer = {
        detail_description: sendDescriptionOffer,
        short_description: sendTitleOffer,
        seller: dataUser.id,
        category: activeCategory?.id,
        count: Number(sendAmountOffer),
        price: sendPriceOffer,
        additional: findIdSybCat,
      };
      // console.log(dataOffer);
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
      sendAmountOffer,
      sendPriceOffer,
      sendAllSubcatOffer,
    ]
  );
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
          {optionToSubCat?.map((firstItem: any, index: any) => {
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
          {/* ////// */}
          <input
            value={sendAmountOffer}
            onChange={(e): void => setSendAmountOffer(e.target.value)}
            className={styles.form__send_number_sellerNumber}
            type="text"
            placeholder={language === "rus" ? "наличие" : language === "eng" ? "amount" : 'chinese'}
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
            placeholder={language === "rus" ? "номер телефона" : language === "eng" ? "phone number" : 'chinese'}
          />

          <button className={styles.form__send_number_button}>
            {language === "rus" ? "отправить форму" : language === "eng" ? "send form" : 'chinese'}
          </button>
        </form>
      );
    }
  };

  if (auth) return <Redirect to={"/login"} />;
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`${mainApiUrlImg}${game.image_of_game}`}
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
