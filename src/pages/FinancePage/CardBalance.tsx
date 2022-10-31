import { useCallback } from 'react'
import styles from './FinancePage.module.scss'

export default function CardBalance(){
    
    const updateBalance = useCallback(() => console.log('update'),[])
    const withdrawBalance = useCallback(() => console.log('withdraw'),[])

    return(
        <div className={styles.balance}>
            <div className={styles.balanceValue}>
                186 p
            </div>
            <div className={styles.balanceBtns}>
                <button className={styles.balanceBtn} onClick={updateBalance}>
                    <span>Пополнить баланс</span>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0713 19.5934L11.0308 20.661C10.5902 21.113 9.8778 21.113 9.44191 20.661L0.330432 11.3175C-0.110144 10.8655 -0.110144 10.1345 0.330432 9.68731L9.44191 0.33902C9.88249 -0.113007 10.5949 -0.113007 11.0308 0.33902L12.0713 1.40657C12.5166 1.86341 12.5072 2.60877 12.0526 3.05599L6.40475 8.57648H19.8751C20.4985 8.57648 21 9.09102 21 9.73059V11.2694C21 11.909 20.4985 12.4235 19.8751 12.4235H6.40475L12.0526 17.944C12.5119 18.3912 12.5213 19.1366 12.0713 19.5934Z" fill="white"/>
                    </svg>
                </button>
                <button className={`${styles.balanceBtn} ${styles.balanceBtnBlue}`} onClick={withdrawBalance}>
                    <span>Вывести средства</span>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.92869 1.40657L9.9692 0.33902C10.4098 -0.113007 11.1222 -0.113007 11.5581 0.33902L20.6696 9.68251C21.1101 10.1345 21.1101 10.8655 20.6696 11.3127L11.5581 20.661C11.1175 21.113 10.4051 21.113 9.9692 20.661L8.92869 19.5934C8.48343 19.1366 8.4928 18.3912 8.94744 17.944L14.5952 12.4235H1.12487C0.501507 12.4235 0 11.909 0 11.2694V9.73059C0 9.09102 0.501507 8.57648 1.12487 8.57648H14.5952L8.94744 3.05599C8.48812 2.60877 8.47874 1.86341 8.92869 1.40657Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}