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
  const [allCategories, setAllCategories] = useState([
    { slug: "", title: "", id: 0, game: 0 , title_column:[], description:""},
  ]);
  const [allServices, setAllServices] = useState([{category:0}])
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
 
  const activeCategory:any = allCategories.find((el) => {return pathname.includes(el.slug.replace(/\s+/g, "").toLowerCase())})
  const categoryServices = allServices.filter((el) => el.category === activeCategory.id)
  
  console.log(categoryServices);
  
  const getCategories = async () => {
    const data = await api.getCategories(itemGame.id);
    setAllCategories(data);
    
    const { title_column } = data
    setSubCategories(title_column)
  };
  const getServices = async () => {
    const data = await api.getServices()
    setAllServices(data)
  }


  useEffect(() => {
    getServices()
    getCategories()
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [itemGame]);
  if (itemGame && allCategories) {
    return (
      <div>
        <Breadcrumbs />
        <Card game={itemGame} activeCategory={activeCategory} categories={allCategories}  />
        <Switch>
          <Route path={`${GAMES_URL}/${itemGame.title}/${activeCategory?.slug || "all"}`} exact>
            <Table categories={allCategories} activeCategory={activeCategory} items={kinahMock} game={itemGame.title} />
          </Route>
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
    return <div style={{color:"white"}}>круг с загрузкой</div>;
  }
}
