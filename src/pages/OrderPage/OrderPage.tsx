import { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './OrderPage.module.scss'

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import useToken from '../../hooks/useToken';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import Input from './Input';
import Chat, { chatType } from '../../components/Chat/Chat';
import { COMFIRM_URL, MAIN_URL, USER_URL } from '../../utils/links';
import { HistoryReview } from './HistoryReview';
import { BreadcrumbsItemType } from '../../redux/reducers/breadcrumbsReducer';
import { GAMES_URL } from './../../utils/links';
import { ApiService } from '../../api/ApiService';
import CircleOfLoading from '../../components/circleOfLoading/circleOfLoading';

import { selectDataUser, selectLanguage, selectTestGames } from '../../redux/selectors';

import { Category, Deal, Game, Service, Comment } from '../../models/modelsGetData';
import { allDataDeal } from '../../models/dealsModel';




type LocationType = {
    category?: BreadcrumbsItemType | null;
    game?: Game,
    gameTitle?: string;
    service: {
        id: string,
        count: number,
        short_description: string,
        detail_description: string,
        category: number,
        seller: { id: number, username: string, user_rating: number, img: string },
        price: string,
        additional: { title: string, description: string }[]
    };
    activeCategory: {
        slug: string;
        title: string;
        id: number;
        game: number;
        title_column: { title: string; choices: [] }[];
        description: string;
    };
}


export default function OrderPage() {
    const location = useLocation<LocationType>()

    const [usersComments, setUsersComments] = useState<Comment[] | null>(null)
    const [dataLocation, setDataLocation] = useState<LocationType>()
    const [activeDeal, setActiveDeal] = useState<allDataDeal>()


    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [count, setCount] = useState('0')
    const [chat, updateChat] = useState<chatType[]>([])
    const [mess, setMess] = useState('')

    let breadcrumbItems = location.state
        ? [{ name: `${location.state?.gameTitle} : ${location.state?.activeCategory.title}`, link: `${GAMES_URL}/${location.state?.gameTitle}/${location.state?.activeCategory.slug}` } || null].filter(i => i !== null)
        : [{ name: `${dataLocation?.game?.title} : ${dataLocation?.activeCategory.title}`, link: `${GAMES_URL}/${dataLocation?.game?.title}/${dataLocation?.activeCategory.slug}` } || null].filter(i => i !== null)
    useBreadcrumbs(breadcrumbItems)

    const api = new ApiService()

    const allGames: Game[] = useSelector(selectTestGames)
    const language = useSelector(selectLanguage)
    const dataUser = useSelector(selectDataUser)
    const { token } = useToken()

    const sendDeal: Deal = {
        product: name,
        price: price,
        count: count
    }





    const getComments = async (id: number) => {
        const data = await api.getCommentsToSeller(id);
        setUsersComments(data);
    }
    // Получение информации при перзагрузки страницы
    const getDealsById = async (id: number, header: any, serviceId: string) => {
        const data: allDataDeal[] = await api.getDealByIdForClient(id, header)
        const deal = data.filter(deal => deal.id === Number(serviceId))
        setActiveDeal(deal[0])
    }
    console.log(activeDeal);
    const confirmReceipt = async () => {
        const dataTokenToHeader = { Authorization: `Bearer ${token}` }
        const data = await api.patchDeals(dataUser.id, {confirmation_of_deal:true}, dataTokenToHeader )
        console.log(data);
        
    }
    const getInfoOrderPage = async () => {
        const url = location.pathname;
        const urlParams = url.split('/');

        const gameName = urlParams[2];
        const gameCategory = urlParams[3];
        const gameService = urlParams[4];

        const actualGame: Game | undefined = allGames.find((game) => game.title === gameName)



        if (actualGame) {

            const categories: Category[] = await api.getCategories(actualGame.id)
            const serviceGame: Service = await api.getServicesById(Number(gameService))   //id

            const activeCategory: any = categories.find((cat: any) => cat.eng.slug === gameCategory)
            const newActiveCategory = {
                id: activeCategory?.id,
                title_column: activeCategory?.title_column,
                game: activeCategory?.game,
                slug: language === "rus" ? activeCategory.rus.slug : language === "eng" ? activeCategory.eng.slug : activeCategory.chi.slug,
                title: language === "rus" ? activeCategory.rus.title : language === "eng" ? activeCategory.eng.title : activeCategory.chi.title,
                description: language === "rus" ? activeCategory.rus.description : language === "eng" ? activeCategory.eng.description : activeCategory.chi.description

            }


            if (newActiveCategory && actualGame && serviceGame) {
                const postDataLocation: LocationType = {
                    activeCategory: newActiveCategory,
                    game: actualGame,
                    service: serviceGame

                }
                // console.log(postDataLocation);
                const dataTokenToHeader = { Authorization: `Bearer ${token}` }
                getDealsById(dataUser.id, dataTokenToHeader, postDataLocation.service.id)
                setDataLocation(postDataLocation)
                getComments(postDataLocation.service.seller.id)
            }
        }
    }





    useEffect(() => {

        if (!!!location.state) {
            console.log("Reload");
            getInfoOrderPage()
        } else {
            getComments(location.state.service.seller.id)
            const dataTokenToHeader = { Authorization: `Bearer ${token}` }
            getDealsById(dataUser.id, dataTokenToHeader, location.state.service.id)
        }

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [allGames, language])


    // if (!!!location.state) {
    //     history.replace({ pathname: MAIN_URL })
    //     return null
    // }
    const content = (contentData: LocationType) => {
        return (<div className={styles.container}>
            <Breadcrumbs />
            <div className={styles.title}>{contentData.gameTitle || contentData.game?.title || ''}</div>
            <div className={styles.content}>
                {activeDeal
                    ? (
                        <div>
                            <div className={styles.table}>
                                <div className={styles.tableHeader}>
                                    <span>
                                        {language === "rus" ? "Игра: " : language === "eng" ? "Game: " : 'chinese'}
                                    </span>
                                    <span>
                                        {language === "rus" ? "Категория:" : language === "eng" ? "Category: " : 'chinese'}
                                    </span>
                                    {contentData.activeCategory.title_column.map((category: any, index) => {

                                        const lnCat = language === "rus" ? category.rus : language === "eng" ? category.eng : category.chi
                                        return <span key={index}>{lnCat.title}: </span>
                                    }

                                    )}
                                    {/* <span>Сторона:</span>
                            <span>Сервер:</span> */}
                                    <span>
                                        {language === "rus" ? "Количество: " : language === "eng" ? "Amount: " : 'chinese'}
                                    </span>
                                    <span>
                                        {language === "rus" ? "Цена: " : language === "eng" ? "Price: " : 'chinese'}
                                    </span>
                                </div>
                                <div className={styles.tableRow}>
                                    <span>{contentData.gameTitle || contentData.game?.title}</span>
                                    <span>{contentData.activeCategory.title}</span>

                                    {contentData.service.additional.map((service: any, index) => {
                                        const additional = language === "rus" ? service.rus : language === "eng" ? service.eng : service.chi
                                        return <span key={index}>{additional.title}</span>
                                    }

                                    )}
                                    {/* <span>Асмодиане</span>
                            <span>Нортика</span> */}
                                    <span>{activeDeal.count_of_service}</span>
                                    <span>{activeDeal.price_for_service}</span>
                                </div>
                            </div>
                            {/* <div className={styles.inputs}>
                                <Input
                                    label={language === "rus" ? "Имя персонажа" : language === "eng" ? "Name pers" : 'chinese'}
                                    placeholder={language === "rus" ? "Введите имя персонажа..." : language === "eng" ? "Enter the name of the character..." : 'chinese'}
                                    value={name}
                                    onChange={setName}
                                    id='name'
                                />
                                <Input
                                    label={language === "rus" ? "Заплачу" : language === "eng" ? "Pay" : 'chinese'}
                                    placeholder='0'
                                    value={price}
                                    onChange={setPrice}
                                    id='price'
                                />
                                <Input
                                    label={language === "rus" ? "Получу" : language === "eng" ? "Get" : 'chinese'}
                                    placeholder='0'
                                    value={count}
                                    onChange={setCount}
                                    id='count'
                                />
                            </div> */}
                            <div className={styles.buy}>
                                <div onClick={confirmReceipt} className={styles.selectBtn}>
                                    {language === "rus" ? "Подтвердить получение" : language === "eng" ? "Сonfirm receipt" : 'chinese'}
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className={styles.table}>
                                <div className={styles.tableHeader}>
                                    <span>
                                        {language === "rus" ? "Игра: " : language === "eng" ? "Game: " : 'chinese'}
                                    </span>
                                    <span>
                                        {language === "rus" ? "Категория:" : language === "eng" ? "Category: " : 'chinese'}
                                    </span>
                                    {contentData.activeCategory.title_column.map((category: any, index) => {

                                        const lnCat = language === "rus" ? category.rus : language === "eng" ? category.eng : category.chi
                                        return <span key={index}>{lnCat.title}: </span>
                                    }

                                    )}
                                    {/* <span>Сторона:</span>
                            <span>Сервер:</span> */}
                                    <span>
                                        {language === "rus" ? "Количество: " : language === "eng" ? "Amount: " : 'chinese'}
                                    </span>
                                </div>
                                <div className={styles.tableRow}>
                                    <span>{contentData.gameTitle || contentData.game?.title}</span>
                                    <span>{contentData.activeCategory.title}</span>

                                    {contentData.service.additional.map((service: any, index) => {
                                        const additional = language === "rus" ? service.rus : language === "eng" ? service.eng : service.chi
                                        return <span key={index}>{additional.title}</span>
                                    }

                                    )}
                                    {/* <span>Асмодиане</span>
                            <span>Нортика</span> */}
                                    <span>{contentData.service.count}</span>
                                </div>
                            </div>
                            <div className={styles.inputs}>
                                <Input
                                    label={language === "rus" ? "Имя персонажа" : language === "eng" ? "Name pers" : 'chinese'}
                                    placeholder={language === "rus" ? "Введите имя персонажа..." : language === "eng" ? "Enter the name of the character..." : 'chinese'}
                                    value={name}
                                    onChange={setName}
                                    id='name'
                                />
                                <Input
                                    label={language === "rus" ? "Заплачу" : language === "eng" ? "Pay" : 'chinese'}
                                    placeholder='0'
                                    value={price}
                                    onChange={setPrice}
                                    id='price'
                                />
                                <Input
                                    label={language === "rus" ? "Получу" : language === "eng" ? "Get" : 'chinese'}
                                    placeholder='0'
                                    value={count}
                                    onChange={setCount}
                                    id='count'
                                />
                            </div>
                            <div className={styles.buy}>
                                <Link to={{ pathname: COMFIRM_URL, state: { ...contentData, deal: sendDeal } }} className={styles.selectBtn}>
                                    {language === "rus" ? "Купить" : language === "eng" ? "Buy" : 'chinese'}
                                </Link>
                            </div>
                        </div>
                    )}
                <div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>
                                {language === "rus" ? "Игра: " : language === "eng" ? "Game: " : 'chinese'}
                            </span>
                            <span>
                                {language === "rus" ? "Категория:" : language === "eng" ? "Category: " : 'chinese'}
                            </span>
                            {contentData.activeCategory.title_column.map((category: any, index) => {

                                const lnCat = language === "rus" ? category.rus : language === "eng" ? category.eng : category.chi
                                return <span key={index}>{lnCat.title}: </span>
                            }

                            )}
                            {/* <span>Сторона:</span>
                            <span>Сервер:</span> */}
                            <span>
                                {language === "rus" ? "Количество: " : language === "eng" ? "Amount: " : 'chinese'}
                            </span>
                        </div>
                        <div className={styles.tableRow}>
                            <span>{contentData.gameTitle || contentData.game?.title}</span>
                            <span>{contentData.activeCategory.title}</span>

                            {contentData.service.additional.map((service: any, index) => {
                                const additional = language === "rus" ? service.rus : language === "eng" ? service.eng : service.chi
                                return <span key={index}>{additional.title}</span>
                            }

                            )}
                            {/* <span>Асмодиане</span>
                            <span>Нортика</span> */}
                            <span>{contentData.service.count}</span>
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            label={language === "rus" ? "Имя персонажа" : language === "eng" ? "Name pers" : 'chinese'}
                            placeholder={language === "rus" ? "Введите имя персонажа..." : language === "eng" ? "Enter the name of the character..." : 'chinese'}
                            value={name}
                            onChange={setName}
                            id='name'
                        />
                        <Input
                            label={language === "rus" ? "Заплачу" : language === "eng" ? "Pay" : 'chinese'}
                            placeholder='0'
                            value={price}
                            onChange={setPrice}
                            id='price'
                        />
                        <Input
                            label={language === "rus" ? "Получу" : language === "eng" ? "Get" : 'chinese'}
                            placeholder='0'
                            value={count}
                            onChange={setCount}
                            id='count'
                        />
                    </div>
                    <div className={styles.buy}>
                        <Link to={{ pathname: COMFIRM_URL, state: { ...contentData, deal: sendDeal } }} className={styles.selectBtn}>
                            {language === "rus" ? "Купить" : language === "eng" ? "Buy" : 'chinese'}
                        </Link>
                    </div>
                </div>
                {usersComments ? <HistoryReview userComments={usersComments} /> : <CircleOfLoading />}

                <div className={styles.chat}>
                    <Link to={`${USER_URL}/${contentData.service.seller.id}`}>
                        <div className={styles.chatHeader}>
                            <img src={contentData.service.seller.username} alt='avatar' />
                            <div>
                                <div className={styles.chatName}>{contentData.service.seller.username || 'nick'}</div>
                                <div className={styles.chatStatus}>online</div>
                            </div>
                        </div>
                    </Link>
                    <Chat
                        value={mess}
                        onChange={setMess}
                        chat={chat}
                        setChat={updateChat}
                    />
                </div>
            </div>
        </div>)
    }
    if (location.state) {
        return content(location.state)
    } else if (dataLocation) {
        return content(dataLocation)
    } else {
        return <CircleOfLoading />
    }

}