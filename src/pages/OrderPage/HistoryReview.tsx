import styles from './OrderPage.module.scss'
import { historyReviewMock } from './../../utils/mockData';
import HistoryItem from './HistoryItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../redux/selectors';
import { Comment } from '../../models/modelsGetData';
type HistoryProps = {
    userComments: Comment[]

}
const itemsPerPortion = 10

export const HistoryReview = ({ userComments }: HistoryProps) => {
    const [portion, setPortion] = useState(1)
    const language = useSelector(selectLanguage)
    const handeNewPortion = () => {
        setPortion(prev => prev + 1)
    }
    const handleClearPortion = () => {
        setPortion(1)
    }

    let items = itemsPerPortion * portion
    let itemsToRender = userComments.slice(0, items)

    return <div className={styles.history}>
        <div className={styles.historyTitle}>
            {language === "rus" ? "Отзывов: " : language === "eng" ? "Reviews: " : 'chinese'}
            {userComments.length}
        </div>
        {
            itemsToRender.map((item, index) => (
                <HistoryItem key={index} {...item} />
            ))
        }
        {itemsToRender.length > 10
            ? <div className={styles.actions}>
                {items <= historyReviewMock.length && <button className={styles.action} onClick={handeNewPortion}>
                    {language === "rus" ? "Показать ещё" : language === "eng" ? "Show more" : 'chinese'}
                </button>}
                {portion !== 1 && <button className={styles.action} onClick={handleClearPortion}>
                    {language === "rus" ? "Спрятать" : language === "eng" ? "Hide" : 'chinese'}
                </button>}
            </div>
            : <div></div>
        }


    </div>
}