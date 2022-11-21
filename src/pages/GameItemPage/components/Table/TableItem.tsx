import styles from "./Table.module.scss";
import { useEffect, useState } from "react"
import { ORDER_URL } from "../../../../utils/links";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbsItemType } from "../../../../redux/reducers/breadcrumbsReducer";
import { ApiService } from "../../../../api/ApiService";
import { Seller } from "../../../../models/sellerModel";
import { Service } from "../../../../models/service";
import { Category } from "../../../../models/categoryModel";

export type TableItemProps = {
  // server: string;
  // side: string;
  // short_description: string;
  //   avatar: string;
  //   rate: number;
  //   review: number;
  //   nikname: string;
  // price: number;
  //   game: string;
  //   online: string;
  // id: string;
  //   id: number;
  //   short_description: string;
  //   detail_description: string;
  //   seller: Seller;
  //   price: string;
  //   additional: {
    //     title: string;
    //     description: string;
    //   }[];
    // category: number;
  // category: BreadcrumbsItemType | null;
  // category: {
    //     slug: string;
  //     title: string;
  //     id: number;
  //     game: number;
  //     title_column: {title:string, choices:[]}[];
  //     description: string;
  // }
  count: number;
  category: BreadcrumbsItemType | null;
  gameTitle:string;
  service:{
    id:string,
    short_description:string,
    detail_description:string,
    category: number,
    seller: {id:number,username: string,user_rating:number,img:string },
    price: string,
    additional: {title:string, description:string}[]
  };
  activeCategory:{
    slug: string;
    title: string;
    id: number;
    game: number;
    title_column: { title: string; choices: [] }[];
    description: string;
  };
};

export default function TableItem({
  category,
  gameTitle,
  count = 1,
  activeCategory,
  service,
}: TableItemProps) {
  const { pathname } = useLocation();

  
  let orderUrl;
  if (pathname.includes("game")) {
    orderUrl = pathname.replace("/game", ORDER_URL);
  } else {
    //@ts-ignore
    orderUrl =
      pathname.replace(/\/user\/\d+/, ORDER_URL) +
      `/${gameTitle}${category?.link ? `/${category.name}` : category?.link}`;
  }

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
      {/* <div className={styles.server}>{server}</div>
            <div className={styles.side}>{side}</div> */}

      {service.additional.map((i, index) => {
        return (
          <div className={styles.side} key={index}>
            {i.description}
          </div>
        );
      })}
      <div className={styles.desc}>{service.detail_description}</div>
      <div className={styles.nik}>
        
        <Avatar
        seller={service.seller}/>
      </div>
      <div className={styles.count}>{count}</div>
      <div className={styles.price}>
        <span>{service.price}</span> <span>₽</span>
      </div>
    </Link>
  );
}

type AvatarProps = {
  seller:{
    id:number,
    username: string,
   user_rating:number,
    img:string 
  }
    
//   img?: string;
//   rate?: number;
//   review: number;
//   online?: string;
};

const Avatar = ( {seller}:AvatarProps) => {
    
    
    
    
        return (
            <div className={styles.avatar}>
              <div className={styles.avatarImgContainer}>
                <img src={seller.img || "img"} className={styles.avatarImg} alt="avatar" />
                {/* <div
                  className={`${styles.onlineStatus} ${
                    online === "Онлайн"
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
