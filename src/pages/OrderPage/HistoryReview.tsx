import styles from './OrderPage.module.scss'
import { historyReviewMock } from './../../utils/mockData';
import HistoryItem from './HistoryItem';
import { useState } from 'react';
type HistoryProps = {
    userComments: {
        client: number,
        description: string,
        publish_date: string,
        service_of_seller: number,
        star: number
    }[]

}
const itemsPerPortion = 10

export const HistoryReview = ({ userComments }: HistoryProps) => {
    const [portion, setPortion] = useState(1)
    const handeNewPortion = () => {
        setPortion(prev => prev + 1)
    }
    const handleClearPortion = () => {
        setPortion(1)
    }

    let items = itemsPerPortion * portion
    let itemsToRender = userComments.slice(0, items)

    return <div className={styles.history}>
        <div className={styles.historyTitle}>{userComments.length} отзыва</div>
        {
            itemsToRender.map((item, index) => (
                <HistoryItem key={index} {...item} />
            ))
        }
        {itemsToRender.length > 10
            ?   <div className={styles.actions}>
                    {items <= historyReviewMock.length && <button className={styles.action} onClick={handeNewPortion}>Показать ещё</button>}
                    {portion !== 1 && <button className={styles.action} onClick={handleClearPortion}>Спрятать</button>}
                </div>
            : <div></div>
        }


    </div>
}