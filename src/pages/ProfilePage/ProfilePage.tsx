import styles from './ProfilePage.module.scss'
import { mockUser } from '../../utils/mockData';

export default function ProfilePage(){
    return(
        <div className={styles.container}>
            <div className={styles.title}>Профиль</div>
            <div className={styles.body}>
                <div className={styles.bodyTop}>Информация об аккаунте</div>
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        <div>
                            <img src={mockUser.avatar} />
                            <p>{mockUser.status}</p>
                        </div>
                        <div>
                            <span>Ваш статус:</span>
                            <span>Логин:</span>
                            <span>E-mail:</span>
                            <span>Баланс:</span>
                        </div>
                    </div>
                    <div className={styles.contentRight}>
                        <span>{mockUser.role}</span>
                        <span>{mockUser.name}</span>
                        <span>{mockUser.mail}</span>
                        <span>{mockUser.balance} p</span>
                    </div>
                </div>
            </div>
        </div>
    )
}