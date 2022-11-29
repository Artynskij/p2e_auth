import styles from "./Table.module.scss";
import { useState, useEffect } from "react";
import TableItem, { TableItemProps } from "./TableItem";
import { TableItemName } from "./TableItemName";
import { useLocation } from "react-router-dom";
import { useBreadcrumbs } from "./../../../../hooks/useBreadcrumbs";
import { GAMES_URL } from "./../../../../utils/links";
import { BreadcrumbsItemType } from "../../../../redux/reducers/breadcrumbsReducer";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../redux/selectors";
import { Category } from "../../../../models/modelsGetData";
type Service = {
  id: number;
  short_description: string;
  detail_description: string;
  seller: number;
  price: string;
  additional: {
    title: string;
    description: string;
    order: number

  }[];
  category: number;

}
export type TableProps = {
  game: string;
  categories: Category[];
  activeCategory: any;
  items: Service[];
  // items: typeof kinahMock | typeof accountsMock | typeof itemsMock | typeof servicesMock
  className?: string;
  customCategory?: {
    name: string;
    link: string;
  };
};

export type TableFiltersType = { [key: string]: string };
export type TableItemKeys = keyof TableFiltersType;

export default function Table(props: TableProps) {
  const { pathname } = useLocation();
  const [filters, setFilters] = useState<TableFiltersType>(
    {} as TableFiltersType
  );
  const [items, setItems] = useState<Service[]>(props.items);
  const language = useSelector(selectLanguage)


  ////////////////////////Find language in sybTitle
  const changeSubTitle = props.activeCategory.title_column.map((firstEl: any) => {
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
  ///////////////////////////////////

  //сортировка Субкатегорий 
  const orderLogic = () => {
    const tableHeaderTypes = changeSubTitle.map(
      (h: any) => h.title
    );
    for (let index = 0; index < tableHeaderTypes.length; index++) {
      const currentTableType = tableHeaderTypes[index];
      props.items.forEach((item) =>
        item.additional.filter((h) => h.title === currentTableType)
          .forEach(a => a.order = index)
      );
    }
    const orderLogic = props.items.map((h) => {
      h.additional.sort((a, b) => a.order - b.order)
      return h
    })
    setItems(orderLogic)
  };




  useEffect(() => {
    orderLogic()
  }, [props.items])
  const category: BreadcrumbsItemType = {
    name: props.activeCategory.title,
    link: props.activeCategory.slug,
  };
  const [maxLvl, setMaxLvl] = useState("");
  const [minLvl, setMinLvl] = useState("");

  // const [categorTrue, setMinLvl] = useState('')

  const handleLvlBlur = (type: "max" | "min") => {
    if (type === "max") {
      //@ts-ignore
      setFilters((prev) => ({ ...prev, maxLvl }));
    } else {
      //@ts-ignore
      setFilters((prev) => ({ ...prev, minLvl }));
    }
  };



  useEffect(() => {
    let filterKeys = Object.keys(filters) as TableItemKeys[];
    // let newItems = items.filter((item) => {
    // const test = filterKeys.map((key) => {
    //    return item.additional[Number(key)].description!==filters[key] 
    //   }) 
    //   return test.includes(false) ? item!==item : item;
    // //   // return filterKeys.every((k) => {
    // //   //   //@ts-ignore
    // //   //   if (k.includes("Lvl")) {
    // //   //     if (k === "maxLvl") {
    // //   //       if (filters.minLvl !== undefined) {
    // //   //         //@ts-ignore
    // //   //         return (
    // //   //           i["lvl"] <= (Number(filters.maxLvl) || 999) &&
    // //   //           i["lvl"] >= (Number(filters.minLvl) || 0)
    // //   //         );
    // //   //       } else {
    // //   //         //@ts-ignore
    // //   //         return i["lvl"] <= (Number(filters.maxLvl) || 999);
    // //   //       }
    // //   //     } else {
    // //   //       if (filters.maxLvl !== undefined) {
    // //   //         //@ts-ignore
    // //   //         return (
    // //   //           i["lvl"] >= (Number(filters.minLvl) || 0) &&
    // //   //           i["lvl"] <= (Number(filters.maxLvl) || 999)
    // //   //         );
    // //   //       } else {
    // //   //         //@ts-ignore
    // //   //         return i["lvl"] >= (Number(filters.minLvl) || 0);
    // //   //       }
    // //   //     }
    // //   //   } else {
    // //   //     //@ts-ignore
    // //   //     return i[k] === filters[k];
    // //   //   }
    // //   // });
    // });
    const newItems = filterKeys.map((key) => {
      const test = props.items.filter((item: any) => {
        const lnItem = language === "rus" ? item.additional[Number(key)].rus : language === "eng" ? item.additional[Number(key)].eng : item.additional[Number(key)].chi  //
        return lnItem.title === filters[key]
      })
      return test

    })
    if (newItems[0]) {
      setItems(newItems[0])
    } else {
      setItems(props.items)
    }
  }, [filters]);


  const mockService = {
    id: "1",
    short_description: "short_description",
    detail_description: "detail_description",
    category: 5,
    seller: { id: 1, username: "username", user_rating: 4, img: "string" },
    price: "157",
    additional: [{ title: "string", description: "string" }]
  }


  //   const getUniqeItems = (filterKey: TableItemKeys) => {
  //     //@ts-ignore
  //     return props.items
  //       .filter(
  //         (value, index, self) =>
  //           index === self.findIndex((t) => t[filterKey] === value[filterKey])
  //       )
  //       .map((f) => f[filterKey]);
  //   };

  // const getChoiceServer = (filterKey: TableItemKeys) => {
  //     //@ts-ignore
  //     return props.subCat.choices.filter((value, index, self) => index === self.findIndex((t) => t[filterKey] === value[filterKey])).map(f => f[filterKey])
  // }
  return (
    <div
      className={`${styles.table} ${props.className ? props.className : ""}`}>
      {/* <div className={styles.extraFilter}>
                {pathname.includes('accounts') && <div className={styles.lvlFilter}>
                    <p>Уровень</p>
                    <input onBlur={() => handleLvlBlur('min')} value={minLvl} onChange={e => setMinLvl(e.target.value)} placeholder='мин.' />
                    <input onBlur={() => handleLvlBlur('max')} value={maxLvl} onChange={e => setMaxLvl(e.target.value)} placeholder='макс.' />
                </div>
                }
                {pathname.includes('items') && <TableItemName className={styles.headerServer} enName='type' name='Тип' items={getUniqeItems('type')} filters={filters} setNewFilter={setFilters} />}
                {Object.keys(filters).length >= 2 && (
                    <button className={styles.resetFilters} onClick={() => setFilters({})}>Сбросить</button>
                )}
            </div> */}
      <div className={styles.header}>
        {changeSubTitle.map((element: any, i: any) => {
          return (
            <TableItemName
              key={i}
              className={styles.headerServer}
              enName={`${i}`}
              name={element.title}
              items={element.choices.map((i: any) => i.title)}
              filters={filters}
              setNewFilter={setFilters}
            />
          );
        })}
        {/* <TableItemName className={styles.headerServer} enName='server' name='Сервер' items={getUniqeItems('server')} filters={filters} setNewFilter={setFilters} /> */}
        {/* <TableItemName className={styles.side} enName='side' name='Сторона' items={getUniqeItems('side')} filters={filters} setNewFilter={setFilters} /> */}
        <div className={styles.desc}>
          {language === "rus" ? "Описание" : language === "eng" ? "Description" : 'chinese'}
        </div>
        <TableItemName
          className={styles.nik}
          enName="online"
          name={language === "rus" ? "Ник" : language === "eng" ? "Nickname" : 'chinese'}
          items={["Онлайн", "Оффлайн"]}
          filters={filters}
          setNewFilter={setFilters}
        />
        <div className={styles.count}>
          {language === "rus" ? "Наличие" : language === "eng" ? "Availability" : 'chinese'}
        </div>
        <div>
          {language === "rus" ? "цена" : language === "eng" ? "Price" : 'chinese'}
        </div>
      </div>
      <div className={styles.list}>
        {items.map((service) => (
          //@ts-ignore
          <TableItem category={category} key={service.id} gameTitle={props.game} activeCategory={props.activeCategory} service={service} />
        ))}
        {/* <TableItem category={category}  gameTitle={props.game} count={20} activeCategory={props.activeCategory} service={mockService} /> */}
        {items.length === 0 && <h4 className={styles.notFound}>
          {language === "rus" ? "Не найдено" : language === "eng" ? "Not Found" : 'chinese'}
        </h4>}
      </div>
    </div>
  );
}
