import { useEffect,useState } from 'react';
import { lettersMock } from '../../../../utils/mockData'
import styles from './SearchResult.module.scss'
import SearchResultItem from './SearchResultItem'
import { useSelector } from 'react-redux';
import { selectGames, selectSearchItems } from '../../../../redux/selectors';
import { ApiService } from '../../../../api/ApiService';

export type SearchResultListProps = {
    letter: string;
}

export default function SearchResultList({ letter }: SearchResultListProps) {
    const [data, setData] = useState(null)
    const api = new ApiService()
    // const getData = async () => {
    //     const data = await api.getCategories(1)
    //     setData(data)
        
    // }
    // useEffect(() => {
    //     getData()
        
        
    // }, [])
    // console.log(data);
    // let items = useSelector(selectSearchItems).filter(i => i.name.slice(0, 1) === letter)
    
    
    const allGames = useSelector(selectGames)
    const gamesFilter = allGames.filter((i:any) => i.title.slice(0, 1) === letter)
    
    
    
    
    
    return (
        <div id={letter}>
            <div className={styles.title}>
                {letter}
            </div>
            <div className={styles.result}>
                {
                    gamesFilter.map((item:any, index:number) => (
                        <SearchResultItem key={index} {...item} />
                    ))
                }
                {gamesFilter.length === 0 &&
                    <h4 className={styles.notFound}>Не найдено</h4>
                }
            </div>
        </div>
    )
}