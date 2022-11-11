import React, { useCallback, useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import {
  MAIN_URL,
  SERVICE_URL,
  GAMES_URL,
  COMFIRM_URL,
  ERROR_URL,
  ORDER_URL,
  SUCCESS_URL,
  REGISTER_URL,
  SINGIN_URL,
  CONTACT_URL,
  PROFILE_URL,
  FINANCE_URL,
  BUY_URL,
  COMUNITY_URL,
  SETTINGS_URL,
  USER_URL,
  PRIVACYPOLICY_URL,
  COOKIEPOLICY_URL,
} from "./utils/links";
import "./styles/App.scss";
import ServicePage from "./pages/ServicePage/SetvicePage";
import MainPage from "./pages/MainPage/MainPage";
import GameItemPage from "./pages/GameItemPage/GameItemPage";
import InfoPage, { InfoPageVariant } from "./pages/InfoPage/InfoPage";
import AuthPage, { AuthPageVariant } from "./pages/AuthPage/AuthPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FinancePage from "./pages/FinancePage/FinancePage";
import BuyPage from "./pages/BuyPage/BuyPage";
import ComunityPage, {
  ComunityPageVariant,
} from "./pages/ComunityPage/ComunityPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderConfirmPage from "./pages/OrderConfirmPage/OrderConfirmPage";
import { NotFound } from "./pages/NotFound/NotFound";
import "./App.scss";
import { ArrowUp } from "./pages/OrderPage/ArrowUp";
import { UserPage } from "./pages/UserPage/UserPage";

import useToken from "./hooks/useToken";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage/CookiePolicyPage";
import { useDispatch } from "react-redux";
import { addDataUser } from "./redux/reducers/userReducer";
import { ApiService } from "./api/ApiService";
import { getGames } from "./redux/reducers/gamesReducer";

function App() {
  
  const NavigationContainer = () => {
    const dispatch = useDispatch();
    const funcGetGames = async () => {
      const api = new ApiService();
      const games = await api.getGames();
      dispatch(getGames(games));
    };
    useEffect(() => {
      funcGetGames();
    }, []);
    
    const location = useLocation();
    const { token, setToken } = useToken();
    //user to reducer
    const localStorageUser: any = localStorage.getItem("userData");

    const dataUser = JSON.parse(localStorageUser);

    if (dataUser) {
      dispatch(addDataUser(dataUser));
    } else {
      const dataUser = {
        email: "",
        username: "",
      };
      dispatch(addDataUser(dataUser));
    }

    /////////////
    // TODO (A.A.):Clarify auth condition
    const checkAuth = useCallback(() => !!token, [token]);

    const [showMenu, setIsShowMenu] = useState(false);

    return (
      <div
        className="App"
        // style={showMenu ? { left: '-80vw'} : {}}
      >
        <Header
          auth={checkAuth()}
          setShow={setIsShowMenu}
          show={showMenu}
          setToken={setToken}
        />
        <Switch location={location}>
          <Route path={MAIN_URL} exact>
            <MainPage />
          </Route>
          <Route path={SERVICE_URL} exact>
            <ServicePage />
          </Route>
          <Route path={`${GAMES_URL}/:name`} exact>
            <GameItemPage />
          </Route>
          <Route path={`${GAMES_URL}/:name/:category`} exact>
            <GameItemPage />
          </Route>
          <Route path={ERROR_URL} exact>
            <InfoPage variant={InfoPageVariant.Error} />
          </Route>
          <Route path={SUCCESS_URL} exact>
            <InfoPage variant={InfoPageVariant.Success} />
          </Route>
          <Route path={REGISTER_URL} exact>
            <AuthPage variant={AuthPageVariant.Reg} setToken={setToken} />
          </Route>
          <Route path={SINGIN_URL} exact>
            <AuthPage variant={AuthPageVariant.Sign} setToken={setToken} />
          </Route>
          <Route path={CONTACT_URL} exact>
            <ContactPage />
          </Route>
          <Route path={PROFILE_URL} exact>
            <ProfilePage />
          </Route>
          <Route path={FINANCE_URL} exact>
            <FinancePage />
          </Route>
          <Route path={BUY_URL} exact>
            <BuyPage />
          </Route>
          <Route path={COMUNITY_URL} exact>
            <ComunityPage variant={ComunityPageVariant.NoChat} />
          </Route>
          <Route path={COMUNITY_URL + "/:id"} exact>
            <ComunityPage variant={ComunityPageVariant.Chat} />
          </Route>
          <Route path={SETTINGS_URL} exact>
            <SettingsPage />
          </Route>
          <Route path={`${ORDER_URL}/:game/:category/:userId`} exact>
            <OrderPage />
          </Route>
          <Route path={`${ORDER_URL}/:game/:userId`} exact>
            <OrderPage />
          </Route>
          <Route path={COMFIRM_URL} exact>
            <OrderConfirmPage />
          </Route>
          <Route path={`${USER_URL}/:id`} exact>
            <UserPage />
          </Route>
          <Route path={PRIVACYPOLICY_URL} exact>
            <PrivacyPolicyPage />
          </Route>
          <Route path={COOKIEPOLICY_URL} exact>
            <CookiePolicyPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <ArrowUp />
      </div>
    );
  };
  return (
    <Router basename="/p2b">
      <NavigationContainer />
    </Router>
  );
}

export default App;
