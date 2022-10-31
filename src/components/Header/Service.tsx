import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { SERVICE_URL } from '../../utils/links';

export type ServiceProps = {
    onClick: () => void;
}

export default function Service({onClick} : ServiceProps){
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handle = (e: Event) => {
            {/*@ts-expect-error*/}
            if(!e.target.className || typeof(e.target.className) !== 'string'){
                return null
            }
            {/*@ts-expect-error*/}
            if(!!!e.target.className.match('lang')){
                setShow(false)
            }
        }
        window.addEventListener('click', handle)

        return () => window.removeEventListener('click', handle)
    }, [])

    const handleClick = () => {
        setShow(false)
        onClick();
    }
    return(
        <div className={styles.lang}>
            <div className={styles.langActiveService} onClick={() => setShow(!show)}>Сервис <span style={{width: 10, display: 'inline-block'}}>{show ? '-' : "+"}</span></div>
            {show &&
            <div className={styles.langContainer}>
                <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link>
                <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link>
                <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link>
            </div>}
        </div>
    )
}