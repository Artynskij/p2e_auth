import styles from './OrderPage.module.scss'
import { historyReviewMock } from './../../utils/mockData';
import HistoryItem from './HistoryItem';
import { useState } from 'react';

const itemsPerPortion = 10

export const HistoryReview: React.FC = () => {
    const [portion, setPortion] = useState(1)
    const handeNewPortion = () => {
        setPortion(prev => prev + 1)
    }
    const handleClearPortion = () => {
        setPortion(1)
    }

    let items = itemsPerPortion * portion
    let itemsToRender = historyReviewMock.slice(0, items)

    return <div className={styles.history}>
        <div className={styles.historyTitle}>{historyReviewMock.length} отзыва</div>
        {
            itemsToRender.map(item => (
                <HistoryItem key={item.id} {...item} />
            ))
        }
        <div className={styles.actions}>
            {items <= historyReviewMock.length && <button className={styles.action} onClick={handeNewPortion}>Показать ещё</button>}
            {portion !== 1 && <button className={styles.action} onClick={handleClearPortion}>Спрятать</button>}
        </div>
    </div>
}