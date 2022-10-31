import styles from './SearchResult.module.scss'
import { Link } from 'react-router-dom';
import { GAMES_URL } from '../../../../utils/links';

export type SearchResultItemProps = {
    id: string;
    imgSmall: string;
    name: string;
    tags: {ru: string, en: string}
}

export default function SearchResultItem({id, imgSmall, name, tags} : SearchResultItemProps){
    return(
        <div  className={styles.item}>
            <img src={imgSmall} className={styles.itemImg} alt='avatar'/>
            <div>
                <Link to={{pathname: `${GAMES_URL}/${name}`}} className={styles.itemName}>{name}</Link>
                <div className={styles.itemTags}>
                    {
                        tags.en.split(',').map((tag, index, arr) => (
                            <Link to={{pathname: `${GAMES_URL}/${name}/${tag.replace(/\s+/g, '').toLowerCase()}`}} key={index}>{tags.ru.split(',')[index]}{index !== (arr.length - 1)  && ', '}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}