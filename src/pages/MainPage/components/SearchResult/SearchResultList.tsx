import { useEffect } from 'react';
import { lettersMock } from '../../../../utils/mockData'
import styles from './SearchResult.module.scss'
import SearchResultItem from './SearchResultItem'
import { useSelector } from 'react-redux';
import { selectSearchItems } from '../../../../redux/selectors';

export type SearchResultListProps = {
    letter: string;
}

export default function SearchResultList({ letter }: SearchResultListProps) {
    let items = useSelector(selectSearchItems).filter(i => i.name.slice(0, 1) === letter)

    return (
        <div id={letter}>
            <div className={styles.title}>
                {letter}
            </div>
            <div className={styles.result}>
                {
                    items.map((item, index) => (
                        <SearchResultItem key={index} {...item} />
                    ))
                }
                {items.length === 0 &&
                    <h4 className={styles.notFound}>Не найдено</h4>
                }
            </div>
        </div>
    )
}