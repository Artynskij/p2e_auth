import ChangeAvatar from './ChangeAvatar'
import MailCard from './MailCard'
import NotificationCard from './NotificationCard'
import PassCard from './PassCard'
import styles from './SettingsPage.module.scss'

export default function SettingsPage(){
    
    return(
        <div className={styles.container}>
            <ChangeAvatar/>
            <div className={styles.cards}>
               <PassCard/>
               <MailCard/>
                <NotificationCard/>
            </div>
        </div>
    )
}