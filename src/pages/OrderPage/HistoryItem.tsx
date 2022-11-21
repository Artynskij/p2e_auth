import styles from './OrderPage.module.scss'

export type HistoryItemProps = {
    client:number,
        description:string,
        publish_date:string,
        service_of_seller:number,
        star:number
}

export default function HistoryItem({client, publish_date, description, star}: HistoryItemProps){
    return(
        <div className={styles.historyItem}>
            <div className={styles.historyTop}>
                <div className={styles.historyName}>{client}</div>
                <div className={styles.historyDate}>{publish_date}</div>
            </div>
            <div className={styles.historyBody}>
                <div className={styles.historyText}>{description}</div>
                <div className={styles.historyStars}>
                    {
                        new Array(star).fill(0).map((_, index) => (
                            <svg width="20" key={index} height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.9271 0.665893L6.48599 5.61542L1.02432 6.41168C0.0448775 6.55373 -0.347645 7.76121 0.362634 8.4528L4.31403 12.3033L3.37945 17.7425C3.21123 18.7257 4.24674 19.4621 5.11403 19.0023L10 16.4341L14.886 19.0023C15.7533 19.4584 16.7888 18.7257 16.6206 17.7425L15.686 12.3033L19.6374 8.4528C20.3476 7.76121 19.9551 6.55373 18.9757 6.41168L13.514 5.61542L11.0729 0.665893C10.6355 -0.216348 9.36823 -0.227563 8.9271 0.665893Z" fill="#FAE800"/>
                            </svg>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}