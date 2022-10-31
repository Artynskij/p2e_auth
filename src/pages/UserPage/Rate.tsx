import styles from "./UserPage.module.scss"
import star from "./../../assets/star.svg"

const letterClick = () => {
    let element = document.getElementById('reviews')
    if (!element) return
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: y - 60,
        behavior: 'smooth'
    });
}

type Props = {
    disableTotalCount?: boolean
    items: {
        date: string;
        buyData: string;
        description: string;
        stars: number;
        avatar: string;
    }[]
}

export const Rate = ({ items, disableTotalCount = false }: Props) => {
    let rate = items.map(i => i.stars.toString())
    let rate5stars = items.filter(i => i.stars === 5).length
    let rate4stars = items.filter(i => i.stars === 4).length
    let rate3stars = items.filter(i => i.stars === 3).length
    let rate2stars = items.filter(i => i.stars === 2).length
    let rate1stars = items.filter(i => i.stars === 1).length

    let result = 0;
    for (let i = 0; rate.length > i; i++) {
        result += parseInt(rate[i], 10);
    }
    let av = Math.round(result / rate.length);

    const getStarPercentage = (currentItems: number) => {
        return (currentItems * 100) / items.length
    }

    return <div className={styles.rate}>
        <h5>Рейтинг продавца</h5>
        <div className={styles.rateContent}>
            <div className={styles.inner}>
                <p className={styles.totalRate}><span>{av}</span> из 5</p>
                <div className={styles.stars}>
                    <div className={`${styles.star}`}>
                        <div className={styles.icons}>
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                        </div>
                        <div className={styles.barContainer}>
                            <span style={{ width: `${getStarPercentage(rate5stars)}%` }} className={styles.bar}></span>
                        </div>
                    </div>
                    <div className={`${styles.star}`}>
                        <div className={styles.icons}>
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                        </div>
                        <div className={styles.barContainer}>
                            <span style={{ width: `${getStarPercentage(rate4stars)}%` }} className={styles.bar}></span>
                        </div>
                    </div>
                    <div className={`${styles.star}`}>
                        <div className={styles.icons}>
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                        </div>
                        <div className={styles.barContainer}>
                            <span style={{ width: `${getStarPercentage(rate3stars)}%` }} className={styles.bar}></span>
                        </div>
                    </div>
                    <div className={`${styles.star}`}>
                        <div className={styles.icons}>
                            <img src={star} alt='star' />
                            <img src={star} alt='star' />
                        </div>
                        <div className={styles.barContainer}>
                            <span style={{ width: `${getStarPercentage(rate2stars)}%` }} className={styles.bar}></span>
                        </div>
                    </div>
                    <div className={`${styles.star}`}>
                        <div className={styles.icons}>
                            <img src={star} alt='star' />
                        </div>
                        <div className={styles.barContainer}>
                            <span style={{ width: `${getStarPercentage(rate1stars)}%` }} className={styles.bar}></span>
                        </div>
                    </div>
                </div>
            </div>
            {!disableTotalCount && <p onClick={letterClick} className={styles.totalReviews}>Всего <br /> {items.length} отзывов</p>}
        </div>
    </div>
}