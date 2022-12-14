import styles from "./Table.module.scss";
import { ORDER_URL } from "../../../../utils/links";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbsItemType } from "../../../../redux/reducers/breadcrumbsReducer";
import { useSelector } from "react-redux";
import { selectDataUser, selectLanguage } from "../../../../redux/selectors";
import { Service, Category, Seller } from "../../../../models/modelsGetData"

export type TableItemProps = {
  count: number;
  category: BreadcrumbsItemType | null;
  gameTitle: string;
  service: Service;
  activeCategory: Category;
};

export default function TableItem({
  category,
  gameTitle,
  activeCategory,
  service,
}: TableItemProps) {
  const { pathname } = useLocation();
  const language = useSelector(selectLanguage)


  let orderUrl;
  if (pathname.includes("game")) {
    orderUrl = pathname.replace("/game", ORDER_URL);
  } else {
    //@ts-ignore
    orderUrl =
      pathname.replace(/\/user\/\d+/, ORDER_URL) +
      `/${gameTitle}${category?.link ? `/${category.name}` : category?.link}`;
  }

  // return (
  //   // <Link
  //   //   className={styles.item}
  //   //   to={{
  //   //     pathname: `${orderUrl}/${service.id}`,
  //   //     state: {
  //   //       service,
  //   //       activeCategory,
  //   //       gameTitle,
  //   //       category,
  //   //     },
  //   //   }}>
  //   //   {/* <div className={styles.server}>{server}</div>
  //   //         <div className={styles.side}>{side}</div> */}

  //   //   {service.additional.map((i, index) => {
  //   //     return (
  //   //       <div className={styles.side} key={index}>
  //   //         {i.description}
  //   //       </div>
  //   //     );
  //   //   })}
  //   //   <div className={styles.desc}>{service.detail_description}</div>
  //   //   <div className={styles.nik}>

  //   //     <Avatar
  //   //     seller={service.seller}/>
  //   //   </div>
  //   //   <div className={styles.count}>{count}</div>
  //   //   <div className={styles.price}>
  //   //     <span>{service.price}</span> <span>???</span>
  //   //   </div>
  //   // </Link>
  // );
  return (
    <Link
      className={styles.item}
      to={{
        pathname: `${orderUrl}/${service.id}`,
        state: {
          service,
          activeCategory,
          gameTitle,
          category,
        },
      }}>
      {service.additional.map((i: any, index) => {
        const additional = language === "rus" ? i.rus : language === "eng" ? i.eng : i.chi
        return (
          <div className={styles.side} key={index}>
            {additional.title}
          </div>
        );
      })}
      <div className={styles.desc}>{service.detail_description}</div>
      <div className={styles.nik}>

        <Avatar
          seller={service.seller} />
      </div>
      <div className={styles.count}>{service.count}</div>
      <div className={styles.price}>
        <span>{service.price}</span> <span>???</span>
      </div>
    </Link>
  )
}

type AvatarProps = {
  seller: Seller
};

const Avatar = ({ seller }: AvatarProps) => {




  return (
    <div className={styles.avatar}>
      <div className={styles.avatarImgContainer}>
        <img src={seller.img || "img"} className={styles.avatarImg} alt="avatar" />
        {/* <div
                  className={`${styles.onlineStatus} ${
                    online === "????????????"
                      ? styles.onlineStatus_online
                      : styles.onlineStatus_offline
                  }`}
                /> */}
      </div>
      <div>
        <div className={styles.avatarTitle}>{seller.username}</div>
        <div className={styles.avatarRate}>
          {new Array(seller.user_rating).fill(0).map((_, index) => (
            <svg
              width="10"
              className={styles.avatarRateStar}
              key={index}
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.46355 0.332947L3.24299 2.80771L0.512158 3.20584C0.0224388 3.27687 -0.173823 3.8806 0.181317 4.2264L2.15701 6.15163L1.68973 8.87125C1.60561 9.36284 2.12337 9.73106 2.55701 9.50115L5 8.21704L7.44299 9.50115C7.87663 9.72919 8.39439 9.36284 8.31028 8.87125L7.84299 6.15163L9.81868 4.2264C10.1738 3.8806 9.97756 3.27687 9.48784 3.20584L6.75701 2.80771L5.53645 0.332947C5.31776 -0.108174 4.68411 -0.113782 4.46355 0.332947Z"
                fill="#FAE800"
              />
            </svg>
          ))}
          {/* <div className={styles.avatarRateNum}>{review}</div> */}
        </div>
      </div>
    </div>
  );



};
