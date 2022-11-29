import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { SERVICE_URL } from '../../utils/links';
import { ApiService } from '../../api/ApiService';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../redux/selectors';

export type ServiceProps = {
    onClick: () => void;
}
type ServiceOfType = {
    title: string,
    description: string
}

export default function Service({ onClick }: ServiceProps) {
    const [show, setShow] = useState(false)
    const [serviceOnSite, setServiceOnSite] = useState<ServiceOfType[]>()
    const language = useSelector(selectLanguage)
    const api = new ApiService()

    const getServicePlus = async () => {
        const data = await api.getServiceOfSite(language)
        setServiceOnSite(data.service_of_site)
    }
    useEffect(() => {
        getServicePlus()
    }, [language])
    useEffect(() => {
        const handle = (e: Event) => {
            {/*@ts-expect-error*/ }
            if (!e.target.className || typeof (e.target.className) !== 'string') {
                return null
            }
            {/*@ts-expect-error*/ }
            if (!!!e.target.className.match('lang')) {
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
    return (
        <div className={styles.lang}>
            <div className={styles.langActiveService} onClick={() => setShow(!show)}>
                {language === "rus" ? "Сервис" : language === "eng" ? "Services" : "ChinaTown"}
                <span style={{ width: 10, display: 'inline-block' }}>{show ? '-' : "+"}</span></div>
            {show &&
                <div className={styles.langContainer}>
                    {serviceOnSite?.map(service => {
                        return <Link to={{ pathname: SERVICE_URL, state: service.description }} className={styles.langItem} onClick={handleClick}>{service.title}</Link>
                    })}
                    {/* <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link>
                <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link>
                <Link to={{pathname: SERVICE_URL}} className={styles.langItem} onClick={handleClick}>Сервис</Link> */}
                </div>}
        </div>
    )
}