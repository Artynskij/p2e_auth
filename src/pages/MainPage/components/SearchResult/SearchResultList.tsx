import { useEffect, useState } from 'react';
import { lettersMock } from '../../../../utils/mockData'
import styles from './SearchResult.module.scss'
import SearchResultItem from './SearchResultItem'
import { useSelector } from 'react-redux';
import { selectGames, selectSearchItems, selectTestGames } from '../../../../redux/selectors';
import { ApiService } from '../../../../api/ApiService';
import { useLocation } from 'react-router-dom';

export type SearchResultListProps = {
    letter: string;
}
export type Game = {
    id: number,
    image_of_game: string,
    title: string,
    type_of_games: {
        id: number,
        title: string
    }
}
export default function SearchResultList({ letter }: SearchResultListProps) {
    const [data, setData] = useState(null)
    const api = new ApiService()
    const location = useLocation()
// console.log(location.pathname)


    // const getData = async () => {
    //     const data = await api.getCategories(1)
    //     setData(data)

    // }
    // useEffect(() => {
    //     getData()


    // }, [])
    // console.log(data);
    // let items = useSelector(selectSearchItems).filter(i => i.name.slice(0, 1) === letter)


    const allGames: Game[] = useSelector(selectTestGames)
    
    const gamesFilter = allGames.filter((i: any) => i.title.slice(0, 1) === letter)
    const gamesFilterType = allGames.filter((i: any) => i.title.slice(0, 1) === letter).filter(game => `typegame${game.type_of_games.title}` === location.pathname.replace(/[^a-zа-яё0-9]/gi, ''))
    





    return (
        <div id={letter}>
            <div className={styles.title}>
                {letter}
            </div>
            <div className={styles.result}>
                {location.pathname.replace(/[^a-zа-яё0-9]/gi, '') 
                    ? gamesFilterType.map((item: any, index: number) => (<SearchResultItem key={index} {...item} />)) 
                    : gamesFilter.map((item: any, index: number) => (<SearchResultItem key={index} {...item} />))
                }

                {location.pathname.replace(/[^a-zа-яё0-9]/gi, '') 
                    ? gamesFilterType.length === 0 &&<h4 className={styles.notFound}>Не найдено</h4> 
                    : gamesFilter.length === 0 && <h4 className={styles.notFound}>Не найдено</h4>
                }
            </div>
        </div>
    )
}