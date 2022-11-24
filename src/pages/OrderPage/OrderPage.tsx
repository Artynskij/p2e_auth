import { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import Input from './Input';
import styles from './OrderPage.module.scss'
import Chat, { chatType } from '../../components/Chat/Chat';
import { Link } from 'react-router-dom';
import { COMFIRM_URL, MAIN_URL, USER_URL } from '../../utils/links';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { HistoryReview } from './HistoryReview';
import { BreadcrumbsItemType } from '../../redux/reducers/breadcrumbsReducer';
import { GAMES_URL } from './../../utils/links';
import { ApiService } from '../../api/ApiService';
import CircleOfLoading from '../../components/circleOfLoading/circleOfLoading';
import { useSelector } from 'react-redux';
import { selectLanguage, selectTestGames } from '../../redux/selectors';
type Deal = {
    product: string,
    price: string,
    count: string
}
type Comment = {
    client: number,
    description: string,
    publish_date: string,
    service_of_seller: number,
    star: number
}
type Game = {
    id: number,
    image_of_game: string,
    title: string,
    type_of_games: {
        id: number,
        title: string
    }
}
type Service = {
    id: string,
    short_description: string,
    detail_description: string,
    category: number,
    seller: { id: number, username: string, user_rating: number, img: string },
    price: string,
    additional: { title: string, description: string }[]
}
type Category = {
    slug: string;
    title: string;
    id: number;
    game: number;
    title_column: { title: string; choices: [] }[];
    description: string;
}
type LocationType = {
    category?: BreadcrumbsItemType | null;
    game?: Game,
    gameTitle?: string;
    service: {
        id: string,
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


    const api = new ApiService()
    // const history = useHistory()
    //@ts-ignore
    // if (breadcrumbItems.some(i => i.ru !== undefined)) {
    //     //@ts-ignore
    //     breadcrumbItems = [{ name: location.state?.game, link: `${GAMES_URL}/${location.state?.game}` } || null, location.state?.category ? {name: location.state?.category.ru, link: `${GAMES_URL}/${location.state?.game}/${location.state?.category.en}`} : null].filter(i => i !== null)
    // }
    //@ts-ignore

    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [count, setCount] = useState('0')
    const [chat, updateChat] = useState<chatType[]>([])
    const [mess, setMess] = useState('')
    const getComments = async (id: number) => {
        const data = await api.getCommentsToSeller(id);
        setUsersComments(data);
    }
    const deal: Deal = {
        product: name,
        price: price,
        count: count
    }





    let breadcrumbItems = location.state
        ? [{ name: `${location.state?.gameTitle} : ${location.state?.activeCategory.title}`, link: `${GAMES_URL}/${location.state?.gameTitle}/${location.state?.activeCategory.slug}` } || null].filter(i => i !== null)
        : [{ name: `${dataLocation?.game?.title} : ${dataLocation?.activeCategory.title}`, link: `${GAMES_URL}/${dataLocation?.game?.title}/${dataLocation?.activeCategory.slug}` } || null].filter(i => i !== null)
    useBreadcrumbs(breadcrumbItems)

    const allGames: Game[] = useSelector(selectTestGames)
    const language = useSelector(selectLanguage)
    // Получение информации при перзагрузки страницы
    const getInfoOrderPage = async () => {
        const url = location.pathname;
        const urlParams = url.split('/');

        const gameName = urlParams[2];
        const gameCategory = urlParams[3];
        const gameService = urlParams[4];

        const actualGame: Game | undefined = allGames.find((game) => game.title === gameName)
        if (actualGame) {
            const categories: Category[] = await api.getCategories(actualGame.id, language)
            const serviceGame: Service = await api.getServicesById(Number(gameService))   //id
            const activeCategory = categories.find(cat => cat.slug === gameCategory)
            if (activeCategory && actualGame && serviceGame) {
                const postDataLocation: LocationType = {
                    activeCategory: activeCategory,
                    game: actualGame,
                    service: serviceGame
                }
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
        }
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [allGames])

    // if (!!!location.state) {
    //     history.replace({ pathname: MAIN_URL })
    //     return null
    // }
    const content = (contentData: LocationType) => {
        return (<div className={styles.container}>
            <Breadcrumbs />
            <div className={styles.title}>{contentData.gameTitle || contentData.game?.title || ''}</div>
            <div className={styles.content}>
                <div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>
                            {language === "rus" ? "Игра: " : language === "eng" ? "Game: " : 'chinese'}
                            </span>
                            <span>
                                {language === "rus" ? "Категория:" : language === "eng" ? "Category: " : 'chinese'}
                            </span>
                            {contentData.service.additional.map((service, index) => (
                                <span key={index}>{service.title}: </span>
                            ))}
                            {/* <span>Сторона:</span>
                            <span>Сервер:</span> */}
                            <span>
                            {language === "rus" ? "Количество: " : language === "eng" ? "Amount: " : 'chinese'}
                            </span>
                        </div>
                        <div className={styles.tableRow}>
                            <span>{contentData.gameTitle || contentData.game?.title}</span>
                            <span>{contentData.activeCategory.title}</span>
                            {contentData.service.additional.map((service, index) => (
                                <span key={index}>{service.description}</span>
                            ))}
                            {/* <span>Асмодиане</span>
                            <span>Нортика</span> */}
                            <span>сколько-то там</span>
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
                        <Link to={{ pathname: COMFIRM_URL, state: { ...contentData, deal: deal } }} className={styles.selectBtn}>
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