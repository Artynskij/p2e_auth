import { PropsWithChildren } from 'react';
import styles from './SettingsPage.module.scss'

export type CardProps = PropsWithChildren<{title: string;}>

export default function Card({children, title} :  CardProps){
    return(
        <div className={styles.card}>
            <div className={styles.cardTop}>
                {title}
            </div>
            <div className={styles.cardBody}>
                {children}
            </div>
        </div>
    )
}