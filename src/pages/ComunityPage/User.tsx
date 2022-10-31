import styles from './ComunityPage.module.scss'
import { Link } from 'react-router-dom';
import { COMUNITY_URL } from '../../utils/links';

export type UserProps = {
    id: string;
    active: boolean;
    status: string;
    avatar: string;
    nickname: string;
}

export default function User({id, active, status, nickname, avatar} : UserProps){
    return(
        <Link to={{pathname: `${COMUNITY_URL}/${id}`}} className={`${styles.user} ${active && styles.userActive}`}>
            <div className={status === 'online' ? styles.active : ''}>
                <img src={avatar}/>
            </div>
            <div className={styles.userTitle}>{nickname}</div>
        </Link>
    )
}