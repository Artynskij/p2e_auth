import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import styles from './Header.module.scss'
import { MAIN_URL, REGISTER_URL, SINGIN_URL, CONTACT_URL, FINANCE_URL, BUY_URL, COMUNITY_URL } from '../../utils/links';
import ProfileCircle from './ProfileCircle';
import Language from './Language';
import Service from './Service';
import Search from '../Search/Search';
import searchIcon from '../../assets/search.svg'
import { ApiService } from '../../api/ApiService';

export type HeaderProps = {
    auth?: boolean;
    show: boolean;
    setShow: (val: boolean) => void;
    setToken: (val: any) => void;
}

export default function Header({ auth, show, setShow, setToken }: HeaderProps) {
    const [searchValue, setSearchvalue] = useState('')
    const [isPcSearch, setIsPCSearch] = useState(false)
    const [isMobileSearch, setIsMobileSearch] = useState(false)
    const [typesOfGames, setTypeOfGames] = useState([])
    const { pathname } = useLocation()

    const api = new ApiService()
    const getTypeGames = async () => {
        const data = await api.getTypeOfGames()
        setTypeOfGames(data)
    }
    const refHeader = useRef<HTMLDivElement>(null)
    useEffect(() => {
        getTypeGames()
        const handleScroll = () => {

            window.pageYOffset > 0 ? refHeader.current?.classList.add('fixed') : refHeader.current?.classList.remove('fixed')
        }

        const handleClickOutside = (e: Event) => {
            {/*@ts-expect-error*/ }
            if (!e.target.className || typeof (e.target.className) !== 'string') {
                return null
            }
            {/*@ts-expect-error*/ }
            if (!e.target.className.match('menu') && !e.target.className.match('lang')) {
                setShow(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
      <header className={styles.container}>
        <div
          className={`${styles.top} ${isMobileSearch ? styles.top_search : ""}`}
          ref={refHeader}>
          <Logo className={styles.logo} />
          {pathname === "/" || pathname.includes("game") ? (
            isMobileSearch ? (
              <Search
                className={styles.search}
                onBlur={() => setIsMobileSearch(false)}
                value={searchValue}
                onValueChange={setSearchvalue}
              />
            ) : (
              <img
                src={searchIcon}
                className={styles.openSearchIcon}
                onClick={() => setIsMobileSearch(true)}
                alt="search"
              />
            )
          ) : undefined}
          {!show ? (
            <svg
              width="36"
              height="36"
              onClick={() => setShow(!show)}
              className={styles.burger}
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 23H28M8 13H28H8ZM8 18H28H8Z"
                stroke="white"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              onClick={() => setShow(!show)}
              className={styles.burger}
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.41 18.0012L26.7 10.7112C26.8638 10.5199 26.9494 10.2739 26.9397 10.0222C26.93 9.77051 26.8256 9.53177 26.6475 9.35367C26.4694 9.17558 26.2307 9.07125 25.979 9.06153C25.7274 9.05181 25.4813 9.13741 25.29 9.30124L18 16.5912L10.71 9.29124C10.5187 9.12741 10.2726 9.04181 10.0209 9.05153C9.76924 9.06125 9.53051 9.16558 9.35241 9.34367C9.17432 9.52177 9.06998 9.76051 9.06026 10.0122C9.05054 10.2639 9.13615 10.5099 9.29997 10.7012L16.59 18.0012L9.28997 25.2912C9.18529 25.3809 9.10027 25.4912 9.04025 25.6153C8.98022 25.7393 8.94649 25.8745 8.94117 26.0122C8.93586 26.1499 8.95906 26.2872 9.00934 26.4156C9.05961 26.5439 9.13587 26.6604 9.23332 26.7579C9.33078 26.8553 9.44733 26.9316 9.57565 26.9819C9.70398 27.0321 9.84131 27.0554 9.97903 27.05C10.1167 27.0447 10.2519 27.011 10.3759 26.951C10.5 26.8909 10.6103 26.8059 10.7 26.7012L18 19.4112L25.29 26.7012C25.4813 26.8651 25.7274 26.9507 25.979 26.9409C26.2307 26.9312 26.4694 26.8269 26.6475 26.6488C26.8256 26.4707 26.93 26.232 26.9397 25.9803C26.9494 25.7286 26.8638 25.4825 26.7 25.2912L19.41 18.0012Z"
                fill="white"
              />
            </svg>
          )}
          <div
            className={`${styles.menu} ${isPcSearch ? styles.menu_search : ""}`}
            style={show ? { right: 0 } : {}}>
            <div className={styles.groupLink}>
              <Link to={{ pathname: MAIN_URL }} onClick={() => setShow(false)}>
                Главная
              </Link>
              <Service onClick={() => setShow(!show)} />
              <Link
                to={{ pathname: CONTACT_URL }}
                onClick={() => setShow(false)}>
                Контакты
              </Link>
            </div>
            {pathname === "/" || pathname.includes("game") ? (
              isPcSearch ? (
                <Search
                  className={styles.search_menu}
                  onBlur={() => setIsPCSearch(false)}
                  value={searchValue}
                  onValueChange={setSearchvalue}
                />
              ) : (
                <img
                  src={searchIcon}
                  className={styles.openSearchIcon_menu}
                  onClick={() => setIsPCSearch(true)}
                  alt="search"
                />
              )
            ) : undefined}
            {/* { !show &&
                    <div className={styles.groupSocial} >
                        <a href='#' target='_blank'>
                            <img src={tg} className={styles.t} alt="icon" />
                            <img src={tgB} className={styles.b} alt="icon" />
                            <img src={tgG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={wa} className={styles.t} alt="icon" />
                            <img src={waB} className={styles.b} alt="icon" />
                            <img src={waG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={yt} className={styles.t} alt="icon" />
                            <img src={ytB} className={styles.b} alt="icon" />
                            <img src={ytG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={inst} className={styles.t} alt="icon" />
                            <img src={instB} className={styles.b} alt="icon" />
                            <img src={instG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={vk} className={styles.t} alt="icon" />
                            <img src={vkB} className={styles.b} alt="icon" />
                            <img src={vkG} className={styles.g} alt="icon" />
                        </a>
                    </div>
                    } */}
            <div className={styles.groupBtn}>
              {auth ? (
                <>
                  <Language />
                  <Link
                    to={{ pathname: BUY_URL }}
                    onClick={() => setShow(false)}>
                    Покупки
                  </Link>
                  <Link
                    to={{ pathname: FINANCE_URL }}
                    onClick={() => setShow(false)}>
                    Финансы
                  </Link>
                  <Link
                    to={{ pathname: COMUNITY_URL }}
                    onClick={() => setShow(false)}>
                    Сообщения
                  </Link>
                  <ProfileCircle hide={setShow} setToken={setToken} />
                </>
              ) : (
                <>
                  <Language />
                  <Link
                    to={{ pathname: REGISTER_URL }}
                    onClick={() => setShow(false)}>
                    Регистрация
                  </Link>
                  <Link
                    to={{ pathname: SINGIN_URL }}
                    onClick={() => setShow(false)}>
                    Вход
                  </Link>
                </>
              )}
            </div>
            {/* { show &&
                    <div className={styles.groupSocial} >
                        <a href='#' target='_blank'>
                            <img src={tg} className={styles.t} alt="icon" />
                            <img src={tgB} className={styles.b} alt="icon" />
                            <img src={tgG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={wa} className={styles.t} alt="icon" />
                            <img src={waB} className={styles.b} alt="icon" />
                            <img src={waG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={yt} className={styles.t} alt="icon" />
                            <img src={ytB} className={styles.b} alt="icon" />
                            <img src={ytG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={inst} className={styles.t} alt="icon" />
                            <img src={instB} className={styles.b} alt="icon" />
                            <img src={instG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={vk} className={styles.t} alt="icon" />
                            <img src={vkB} className={styles.b} alt="icon" />
                            <img src={vkG} className={styles.g} alt="icon" />
                        </a>
                    </div>
                    } */}
            <div className={styles.bottom_menu}>
              {typesOfGames.map((i: any) => {
                return (
                  <a key={i.id} href="#" target="_blank">
                    {i.title}
                  </a>
                );
              })}
              {/* <a href="#" target='_blank'>P2E</a>
                        <a href="#" target='_blank'>Игры</a>
                        <a href="#" target='_blank'>Telegram</a>
                        <a href="#" target='_blank'>Youtube</a> */}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          {typesOfGames.map((i: any) => {
            return (
              <a key={i.id} href="#" target="_blank">
                {i.title}
              </a>
            );
          })}
          {/* <a href="#" target='_blank'>P2E</a>
                <a href="#" target='_blank'>Игры</a>
                <a href="#" target='_blank'>Telegram</a>
                <a href="#" target='_blank'>Youtube</a> */}
        </div>
      </header>
    );
}