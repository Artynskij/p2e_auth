import {
  accountsMock,
  games,
  itemsMock,
  kinahMock,
  servicesMock,
} from "../../utils/mockData";
import { useMemo, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ExtraText } from "./components/ExtraText/ExtraText";
import { Route, Switch, useLocation } from "react-router-dom";
import { GAMES_URL } from "../../utils/links";
import { useDispatch, useSelector } from "react-redux";
import { selectGames, selectTestGames } from "../../redux/selectors";
import { ApiService } from "../../api/ApiService";
import { GamesModel } from "../../models/gamesModel";

export default function GameItemPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([
    { slug: "", title: "", id: 0, game: 0 , title_column:[]},
  ]);
  const api = new ApiService();
  const games = useSelector(selectGames);

  const { pathname } = useLocation();
 
  const itemGame: GamesModel = useMemo(
    () =>
      games.filter((item: any) =>
        pathname.includes(item.title.replace(/%20/, " "))
      )[0],
    [pathname, games]
  );
  const getCategories = async () => {
    const data = await api.getCategories(itemGame.id);
    setCategories(data);
    const { title_column } = data
    console.log(data);
    
    setSubCategories(title_column)
  };

  useEffect(() => {
    
    getCategories()
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [itemGame]);
  if (itemGame) {
    return (
      <div>
        <Breadcrumbs />
        <Card game={itemGame} categories={categories}  />
        <Switch>
          {/* <Route path={`${GAMES_URL}/${itemGame.title}`} exact>
            <Table categories={categories} items={kinahMock} game={itemGame.title} />
          </Route> */}
          {/* {tags.en.split(',').map((t, index) => {
                        return <Route key={index} path={`${GAMES_URL}/${item.name}/${t.replace(/\s+/g, '').toLowerCase()}`}>
                            <Table items={pathname.includes('kinah') ? kinahMock : pathname.includes('accounts') ? accountsMock : pathname.includes('items') ? itemsMock : servicesMock} game={item.name} />
                        </Route>
                    })} */}
        </Switch>
        <ExtraText />
      </div>
    );
  } else {
    return <div>круг с загрузкой</div>;
  }
}
