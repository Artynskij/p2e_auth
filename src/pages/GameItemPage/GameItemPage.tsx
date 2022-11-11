import { accountsMock, games, itemsMock, kinahMock, servicesMock } from "../../utils/mockData"
import { useMemo, useEffect,useState } from 'react';
import Card from "./components/Card/Card";
import styles from './GameItemPage.module.scss'
import Table from "./components/Table/Table";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ExtraText } from "./components/ExtraText/ExtraText";
import { Route, Switch, useLocation } from 'react-router-dom';
import { GAMES_URL } from "../../utils/links";
import { useSelector } from "react-redux";
import { selectGames } from "../../redux/selectors";
import { ApiService } from "../../api/ApiService";
import { setEnvironmentData } from "worker_threads";


export default function GameItemPage() {
    const { pathname } = useLocation()
    const games = useSelector(selectGames)
    const [data, setData] = useState(null)
   
    const item = useMemo(() => games.filter((item:any) => pathname.includes(item.title.replace(/%20/, ' ')))[0], [pathname])
    
    const api = new ApiService()
    const getData = async () => {
        const data = await api.getTitlesForCategories() 
        setData(data)
    }
    
    
    
    
    // const item = useMemo(() => games.filter((item:any) => pathname.includes(item.title.replace(/%20/, ' ')))[0], [pathname])
    // let tags = item.tags

    useEffect(() => {
        getData()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    return (
        <div>
            <Breadcrumbs />
            <Card {...item} />
            <Switch>
                <Route path={`${GAMES_URL}/${item.title}`} exact>
                    <Table subCat={data} items={kinahMock} game={item.title} />
                    
                </Route>
                {/* {tags.en.split(',').map((t, index) => {
                    return <Route key={index} path={`${GAMES_URL}/${item.name}/${t.replace(/\s+/g, '').toLowerCase()}`}>
                        <Table items={pathname.includes('kinah') ? kinahMock : pathname.includes('accounts') ? accountsMock : pathname.includes('items') ? itemsMock : servicesMock} game={item.name} />
                    </Route>
                })} */}
            </Switch>
            <ExtraText />
        </div>
    )
}