import { accountsMock, games, itemsMock, kinahMock, servicesMock } from "../../utils/mockData"
import { useMemo, useEffect } from 'react';
import Card from "./components/Card/Card";
import styles from './GameItemPage.module.scss'
import Table from "./components/Table/Table";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ExtraText } from "./components/ExtraText/ExtraText";
import { Route, Switch, useLocation } from 'react-router-dom';
import { GAMES_URL } from "../../utils/links";


export default function GameItemPage() {
    const { pathname } = useLocation()
    const item = useMemo(() => games.filter(item => pathname.includes(item.name.replace(/%20/, ' ')))[0], [pathname])
    let tags = item.tags

    useEffect(() => {
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
                <Route path={`${GAMES_URL}/${item.name}`} exact>
                    <Table items={kinahMock} game={item.name} />
                </Route>
                {tags.en.split(',').map((t, index) => {
                    return <Route key={index} path={`${GAMES_URL}/${item.name}/${t.replace(/\s+/g, '').toLowerCase()}`}>
                        <Table items={pathname.includes('kinah') ? kinahMock : pathname.includes('accounts') ? accountsMock : pathname.includes('items') ? itemsMock : servicesMock} game={item.name} />
                    </Route>
                })}
            </Switch>
            <ExtraText />
        </div>
    )
}