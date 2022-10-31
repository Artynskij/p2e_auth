import styles from './BuyPage.module.scss'
import { mockBuy } from '../../utils/mockData';

export default function BuyPage(){
    return(
        <div className={styles.contianer}>
            <div className={styles.title}>Мои покупки</div>
            <div className={styles.subtitle}>Список ЗАКАЗОВ</div>
            <div className={styles.items}>
                <div className={styles.item}>Валюта</div>
                <div className={styles.item}>Аккаунты</div>
                <div className={styles.item}>Предметы</div>
                <div className={styles.item}>Услуги</div>
            </div>
            <div className={styles.table}>
                <div className={styles.tableTop}>
                    <span>Заказ №</span>
                    <span>Дата:</span>
                    <span>Игра:</span>
                    <span>Категория:</span>
                    <span>Сторона:</span>
                    <span>Сервер:</span>
                    <span>Количество:</span>
                    <span>Цена:</span>
                </div>
                {
                    mockBuy.map(item => (
                        <div className={styles.tableItem} key={item.id}>
                            <span>{item.number}</span>
                            <span>{item.date}</span>
                            <span>{item.game}</span>
                            <span>{item.category}</span>
                            <span>{item.side}</span>
                            <span>{item.server}</span>
                            <span>{item.count}</span>
                            <span>{item.price}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}