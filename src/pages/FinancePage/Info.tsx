import { useState } from 'react'
import styles from './FinancePage.module.scss'

export default function Info(){
    const [selectText, setSelectText] = useState('Вывод средств')
    const [showList, setShowList] = useState(false)
    const handleListClick = (val: string) => {
        setSelectText(val)
        setShowList(false)
    }
    return(
        <div className={styles.info}>
            <div className={styles.infoRow}>
                <div>
                    <div className={styles.infoRowSubtitle}>
                        Дата операции:
                    </div>
                    <div className={styles.infoRowDate}>
                        <span>01/01/2020</span>
                        <span>15/06/2022</span>
                    </div>
                </div>
                <div>
                    <div className={styles.infoRowSubtitle}>
                        Тип операции:
                    </div>
                    <div className={styles.infoRowSelect} onClick={() => setShowList(!showList)}>
                        <span>{selectText}</span>
                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98486 8.12072L0.344238 2.58618C-0.114746 2.20364 -0.114746 1.58508 0.344238 1.20661L1.44775 0.286901C1.90674 -0.0956337 2.64893 -0.0956337 3.10303 0.286901L7.81006 4.20992L12.5171 0.286901C12.9761 -0.0956337 13.7183 -0.0956337 14.1724 0.286901L15.2759 1.20661C15.7349 1.58915 15.7349 2.20771 15.2759 2.58618L8.63525 8.12072C8.18604 8.50326 7.44385 8.50326 6.98486 8.12072Z" fill="white"/>
                        </svg>
                    </div>
                  {showList &&
                    <ul className={styles.infoRowList}>
                        <li onClick={() => handleListClick('Пополнить средства')}>Пополнить средства</li>
                        <li onClick={() => handleListClick('Вывести средства')}>Вывести средства</li>
                        <li onClick={() => handleListClick('Покупка')}>Покупка</li>
                        <li onClick={() => handleListClick('Продажа')}>Продажа</li>
                    </ul>
                    }
                </div>
            </div>
            <button className={styles.infoBtn}>Применить</button>
        </div>
    )
}