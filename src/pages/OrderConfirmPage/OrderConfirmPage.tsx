import { useCallback, useState, FormEvent } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router'
import { BreadcrumbsItemType } from '../../redux/reducers/breadcrumbsReducer';
import { selectDataUser } from '../../redux/selectors';
import styles from './OrderConfirmPage.module.scss'

type LocationState = {
    deal: {
        product: string,
        price: string,
        count: string
    }
    category?: BreadcrumbsItemType | null;
    game?: {
        id: number,
        image_of_game: string,
        title: string,
        type_of_games: {
            id: number,
            title: string
        }
    },
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
export default function OrderConfirmPage() {
    const [nick, setNick] = useState('')
    const history = useHistory()
    const location = useLocation<LocationState>().state


    const onBack = useCallback(() => {
        history.goBack()
    }, [history])
    const dataUser = useSelector(selectDataUser)
    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        const postDeal = {
            service: location.service.id,
            client: dataUser.id,
            count_of_service: location.deal.count,
            price_for_service: location.deal.price
        }

        console.log(postDeal);


    }, [location, dataUser])

   
    if (!!!location) {
        history.goBack()
        return null
    }
    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={onBack}>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.340492 6.70337L6.92047 0.330366C7.37527 -0.110122 8.11067 -0.110122 8.56063 0.330366L9.65407 1.38941C10.1089 1.8299 10.1089 2.54217 9.65407 2.97798L4.99486 7.5L9.65891 12.0173C10.1137 12.4578 10.1137 13.1701 9.65891 13.6059L8.56547 14.6696C8.11067 15.1101 7.37527 15.1101 6.92531 14.6696L0.34533 8.29663C-0.114301 7.85614 -0.114301 7.14386 0.340492 6.70337Z" fill="white" />
                </svg>
                <span>Назад</span>
            </button>
            <div>
                <div className={styles.title}>
                    Подтверждение заказа
                </div>
                <div className={styles.row}>
                    <div className={styles.content}>
                        <div className={styles.table}>
                            <div className={styles.tableHeader}>
                                <span>Игра:</span>
                                <span>Категория:</span>
                                {location.service.additional.map(subcat => <span>{subcat.title} :</span>)}
                                <span>Количество:</span>
                            </div>
                            <div className={styles.tableRow}>
                                <span>{location.gameTitle || location.game?.title}</span>
                                <span>{location.activeCategory.title}</span>
                                {location.service.additional.map(subcat => <span>{subcat.description}</span>)}
                                <span>{location.deal.count}</span>
                            </div>
                        </div>
                        <label className={styles.label} htmlFor='nick'>Имя персонажа</label>
                        <input
                            id='nick'
                            disabled
                            className={styles.input}
                            value={location.deal.product}
                            onChange={(e) => setNick(e.target.value)}
                            placeholder='NICKNAME'
                        />
                    </div>
                    <form onSubmit={handleSubmit} className={styles.card}>
                        <div className={styles.cardTitle}>Способ оплаты</div>
                        <div className={styles.cardSubtitle}>Банковская карта</div>
                        <div className={styles.cardTitle}>Сумма оплаты</div>
                        <div className={styles.cardSubtitle}>{location.deal.price} ₽ </div>
                        <button className={styles.cardBtn}>Оплатить</button>
                        <div className={styles.cardText}>Продавец не сможет получить оплату до тех пор, пока вы не подтвердите выполнение им всех обязательств.</div>
                    </form>
                </div>
            </div>
        </div>
    )
}