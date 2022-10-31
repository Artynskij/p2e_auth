import { useState } from 'react';
import styles from './SettingsPage.module.scss'

export type SwitchProps = {
    title: string;
    check: boolean;
}

export default function Switch({title, check} : SwitchProps){
    const [isCheck, setIsCheck] = useState(check)
    return(
        <div className={styles.switchContainer}>
            <div className={styles.switch + ` ${isCheck && styles.switchActive}`} onClick={() => setIsCheck(!isCheck)}>
                <div className={styles.switchCircle}></div>
            </div>
            <div className={styles.switchTitle}>
                {title}
            </div>  
        </div>
    )
}