import styles from "./SearchResult.module.scss";
import { Link } from "react-router-dom";
import { GAMES_URL } from "../../../../utils/links";
import { ApiService } from "../../../../api/ApiService";
import { useEffect, useState } from "react";

// export type SearchResultItemProps = {
//     id: string;
//     imgSmall: string;
//     name: string;
//     tags: {ru: string, en: string}
// }
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
  description,
}: SearchResultItemProps) {
  const [data, setData] = useState(null);
  const [tag, setTag] = useState(null);
  const api = new ApiService();
  const getData = async () => {
    const data = await api.getCategories(id);
    setData(data);
    setTag(data.title);
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.item}>
      <img
        src={`https://alexeygrinch.pythonanywhere.com${image_of_game}`}
        className={styles.itemImg}
        alt="avatar"
      />
      <div>
        <Link
          to={{ pathname: `${GAMES_URL}/${title}` }}
          className={styles.itemName}>
          {title}
        </Link>
        <div className={styles.itemTags}>
          {/* {
                        tags.en.split(',').map((tag, index, arr) => (
                            <Link to={{pathname: `${GAMES_URL}/${title}/${tag.replace(/\s+/g, '').toLowerCase()}`}} key={index}>{tags.ru.split(',')[index]}{index !== (arr.length - 1)  && ', '}</Link>
                        ))
                    } */}
                     
          {tag}
        </div>
      </div>
    </div>
  );
}
