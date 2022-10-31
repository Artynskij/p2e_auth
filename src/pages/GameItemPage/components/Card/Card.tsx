
import { NavLink, useLocation } from 'react-router-dom';
import { GAMES_URL } from '../../../../utils/links';
import { games } from '../../../../utils/mockData';
import styles from './Card.module.scss'

export type CardProps = typeof games[0]

export default function Card({ imgBig, name, description, tags }: CardProps) {
    const { pathname } = useLocation()
    let sellItemName = pathname.includes('kinah') ? 'валюту' : pathname.includes('accounts') ? 'аккаунт' : pathname.includes('items') ? 'предметы' : pathname.includes('services') ? 'услуги' : 'валюту'

    return (
        <div className={styles.container}>
            <img className={styles.img} src={imgBig} alt="avatar" />
            <div>
                <div className={styles.title}>
                    <span>{name}</span>
                    <button>Продать {sellItemName}</button>
                </div>
                <div className={styles.text}>{description}</div>
                <div className={styles.itemContainer}>
                    {
                        tags.en.split(',').map((item, index) => (
                            <NavLink
                                className={(pathname.includes(item.replace(/\s+/g, '').toLowerCase()) || (pathname === `${GAMES_URL}/${name}` && index === 0)) ? `${styles.item} ${styles.itemActive}` : styles.item}
                                key={index}
                                to={`${GAMES_URL}/${name}/${item.replace(/\s+/g, '').toLowerCase()}`}
                            >
                                {tags.ru.split(',')[index]}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}