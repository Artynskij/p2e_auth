import styles from './FinancePage.module.scss'
import {mockFinance} from '../../utils/mockData'

export default function History(){
    return(
        <>
            <div className={styles.historyTitle}>
                История операций
            </div>

            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span>Операция</span>
                    <span>Счет списания</span>
                    <span>Получатель</span>
                    <span>Дата</span>
                    <span>Сумма</span>
                </div>
                {
                    mockFinance.map(item => (
                        <div className={styles.tableRow} key={item.id}>
                            <span>{item.type}</span>
                            <span>{item.paySystem}<br/>{item.account}</span>
                            <span>{item.recipient}</span>
                            <span>{item.date}</span>
                            <span>{item.balance}</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}