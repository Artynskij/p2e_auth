import styles from "./SearchResult.module.scss";
import { Link } from "react-router-dom";
import { GAMES_URL } from "../../../../utils/links";
import { ApiService } from "../../../../api/ApiService";
import { useEffect, useState } from "react";
import CircleOfLoading from "../../../../components/circleOfLoading/circleOfLoading";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../redux/selectors";
import { Category } from "../../../../models/modelsGetData";
import { mainApiUrlImg } from "../../../../utils/mainApiUrl";

// export type SearchResultItemProps = {
//     id: string;
//     imgSmall: string;
//     name: string;
//     tags: {ru: string, en: string}
// }

type Tag = {
  slug: string, title: string, id: number
}
export type SearchResultItemProps = {
  id: number;
  image_of_game: string;
  title: string;
  description: string;
};
export default function SearchResultItem({
  id,
  image_of_game,
  title,
}: SearchResultItemProps) {
  // const [data, setData] = useState(null);
  const [tag, setTag] = useState<Tag[]>();
  const api = new ApiService();
  const language = useSelector(selectLanguage)


  const getData = async () => {
    const data = await api.getCategories(id);
    // setData(data);
    const modeCat = data.map((item: any) => {
      const langCat = language === "rus" ? item.rus : language === "eng" ? item.eng : item.chi
      const modeCat: Category = {
        description: langCat.description,
        title: langCat.title,
        game: item.game,
        id: item.id,
        slug: langCat.slug,
        title_column: item.title_column
      }
      return modeCat

    })
    setTag(modeCat);
  };



  useEffect(() => {
    getData();
  }, [language]);

  return (
    <div className={styles.item}>
      <img
        src={`${mainApiUrlImg}${image_of_game}`}
        className={styles.itemImg}
        alt="avatar"
      />
      <div className={styles.itemLinks}>
        {
          tag
            ? <Link

              to={{ pathname: `${GAMES_URL}/${title}/${tag[0].slug}` }}
              className={styles.itemName}>
              {title}
            </Link>
            : <div></div>
        }


        {/* {
                        tags.en.split(',').map((tag, index, arr) => (
                            <Link to={{pathname: `${GAMES_URL}/${title}/${tag.replace(/\s+/g, '').toLowerCase()}`}} key={index}>{tags.ru.split(',')[index]}{index !== (arr.length - 1)  && ', '}</Link>
                        ))
                    } */}
        <div className={styles.itemTags}>
          {tag
            ? tag.map((tag) => {
              return (

                <Link key={tag.id} to={{ pathname: `${GAMES_URL}/${title}/${tag.slug.replace(/\s+/g, '').toLowerCase()}` }}>
                  {tag.title}
                </Link>

              );
            })
            : <CircleOfLoading />
          }
        </div>
      </div>
    </div>
  );
}
