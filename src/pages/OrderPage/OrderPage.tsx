import { useState, useEffect } from 'react'
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
type Comment = {
    client:number,
    description:string,
    publish_date:string,
    service_of_seller:number,
    star:number
}
type LocationType = {
    category: BreadcrumbsItemType | null;
    gameTitle:string;
    service:{
      id:string,
      short_description:string,
      detail_description:string,
      category: number,
      seller: {id:number,username: string,user_rating:number,img:string },
      price: string,
      additional: {title:string, description:string}[]
    };
    activeCategory:{
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
    
    const  api = new ApiService()
    const history = useHistory()
    let breadcrumbItems = [{ name: `${location.state?.gameTitle} : ${location.state?.activeCategory.title}`, link: `${GAMES_URL}/${location.state?.gameTitle}/${location.state?.activeCategory.slug}` } || null].filter(i => i !== null)
    //@ts-ignore
    // if (breadcrumbItems.some(i => i.ru !== undefined)) {
    //     //@ts-ignore
    //     breadcrumbItems = [{ name: location.state?.game, link: `${GAMES_URL}/${location.state?.game}` } || null, location.state?.category ? {name: location.state?.category.ru, link: `${GAMES_URL}/${location.state?.game}/${location.state?.category.en}`} : null].filter(i => i !== null)
    // }
    //@ts-ignore
    useBreadcrumbs(breadcrumbItems)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [count, setCount] = useState('0')
    const [chat, updateChat] = useState<chatType[]>([])
    const [mess, setMess] = useState('')
    const getComments =async (id:number) => {
        const data = await api.getCommentsToSeller(id)
        console.log(data);
        
        setUsersComments(data)
}

    useEffect(() => {
        console.log(location.state.service.seller);
        
        getComments(location.state.service.seller.id)
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    if (!!!location.state) {
        history.replace({ pathname: MAIN_URL })
        return null
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs />
            <div className={styles.title}>{location.state.gameTitle || ''}</div>
            <div className={styles.content}>
                <div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>Игра:</span>
                            <span>Категория:</span>
                            {location.state.service.additional.map((service, index) => (
                                <span key={index}>{service.title}: </span>
                            ))}
                            {/* <span>Сторона:</span>
                            <span>Сервер:</span> */}
                            <span>Количество:</span>
                        </div>
                        <div className={styles.tableRow}>
                            <span>{location.state.gameTitle}</span>
                            <span>{location.state.activeCategory.title}</span>
                            {location.state.service.additional.map((service, index) => (
                                <span key={index}>{service.description}</span>
                            ))}
                            {/* <span>Асмодиане</span>
                            <span>Нортика</span> */}
                            <span>сколько-то там</span>
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            label='Имя персонажа'
                            placeholder='Введите имя персонажа...'
                            value={name}
                            onChange={setName}
                            id='name'
                        />
                        <Input
                            label='Заплачу'
                            placeholder='0'
                            value={price}
                            onChange={setPrice}
                            id='price'
                        />
                        <Input
                            label='Получу'
                            placeholder='0'
                            value={count}
                            onChange={setCount}
                            id='count'
                        />
                    </div>
                    <div className={styles.buy}>
                        <Link to={{ pathname: COMFIRM_URL, state: location.state }} className={styles.selectBtn}>
                            Купить
                        </Link>
                    </div>
                </div>
               {usersComments ? <HistoryReview  userComments={usersComments}/> : <CircleOfLoading/>}
                
                <div className={styles.chat}>
                    <Link to={`${USER_URL}/${location.state.service.seller.id}`}>
                        <div className={styles.chatHeader}>
                            <img src={location.state.service.seller.username} alt='avatar' />
                            <div>
                                <div className={styles.chatName}>{location.state.service.seller.username || 'nick'}</div>
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
        </div>
    )
}