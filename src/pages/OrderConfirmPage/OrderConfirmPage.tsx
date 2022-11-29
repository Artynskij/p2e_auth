import { useCallback, useState, FormEvent } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router'
import { ApiService } from '../../api/ApiService';
import { postDealCredential } from '../../models/dealCredential';
import { BreadcrumbsItemType } from '../../redux/reducers/breadcrumbsReducer';
import { selectDataUser, selectLanguage } from '../../redux/selectors';
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
    const language = useSelector(selectLanguage)
    const api = new ApiService()

    const dataUser = useSelector(selectDataUser)
    
    const postDealToServer = async (postDeal:postDealCredential) => {
        const data = await api.postDeals(postDeal)
        console.log(data);
        
    }

    const handleSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            const postDeal: postDealCredential = {
                service: Number(location.service.id),
                client: Number(dataUser.id),
                count_of_service: location.deal.count,

                // price_for_service: location.deal.price
            }

            console.log(postDeal);
            // postDeal(postDeal)
            postDealToServer(postDeal)

        }, [location, dataUser])


    const onBack = useCallback(() => {
        history.goBack()
    }, [history])

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
                <span>
                    {language === "rus" ? "Назад" : language === "eng" ? "Back " : 'chinese'}
                </span>
            </button>
            <div>
                <div className={styles.title}>
                    {language === "rus" ? "Подтверждение заказа" : language === "eng" ? "Confirm order " : 'chinese'}
                </div>
                <div className={styles.row}>
                    <div className={styles.content}>
                        <div className={styles.table}>
                            <div className={styles.tableHeader}>
                                <span>
                                    {language === "rus" ? "Игра:" : language === "eng" ? "Game:" : 'chinese'}
                                </span>
                                <span>
                                    {language === "rus" ? "Категория:" : language === "eng" ? "Category: " : 'chinese'}
                                </span>
                                {location.activeCategory.title_column.map((subcat: any) => {
                                    const lnCat = language === "rus" ? subcat.rus : language === "eng" ? subcat.eng : subcat.chi
                                    return <span>{lnCat.title} :</span>
                                })}
                                <span>
                                    {language === "rus" ? "Количество:" : language === "eng" ? "Amount: " : 'chinese'}
                                </span>
                            </div>
                            <div className={styles.tableRow}>
                                <span>{location.gameTitle || location.game?.title}</span>
                                <span>{location.activeCategory.title}</span>
                                {location.service.additional.map((subcat: any) => {
                                    const additional = language === "rus" ? subcat.rus : language === "eng" ? subcat.eng : subcat.chi
                                    return <span>{additional.title}</span>
                                })}
                                <span>{location.deal.count}</span>
                            </div>
                        </div>
                        <label className={styles.label} htmlFor='nick'>
                            {language === "rus" ? "Имя персонажа" : language === "eng" ? "Name personage: " : 'chinese'}
                        </label>
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
                        <div className={styles.cardTitle}>
                            {language === "rus" ? "Способ оплаты" : language === "eng" ? "Payment method " : 'chinese'}
                        </div>
                        <div className={styles.cardSubtitle}>
                            {language === "rus" ? "Банковская карта" : language === "eng" ? "Credit card " : 'chinese'}
                        </div>
                        <div className={styles.cardTitle}>
                            {language === "rus" ? "Сумма оплаты" : language === "eng" ? "Payment amount " : 'chinese'}
                        </div>
                        <div className={styles.cardSubtitle}>{location.deal.price} ₽ </div>
                        <button className={styles.cardBtn}>
                            {language === "rus" ? "Оплатить" : language === "eng" ? "Pay " : 'chinese'}
                        </button>
                        <div className={styles.cardText}>
                            {language === "rus"
                                ? "Продавец не сможет получить оплату до тех пор, пока вы не подтвердите выполнение им всех обязательств."
                                : language === "eng"
                                    ? "The seller will not be able to receive payment until you confirm that they have fulfilled all their obligations."
                                    : 'chinese'}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}