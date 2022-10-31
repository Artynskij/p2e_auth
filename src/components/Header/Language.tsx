import { useEffect, useState } from 'react'
import styles from './Header.module.scss'

export default function Language(){
    const [lang, setLang] = useState('Ru')
    const [show, setShow] = useState(false)
    const handleClick = (lang : string) => {
        setLang(lang)
        setShow(false)
    }

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
    return(
        <div className={styles.lang}>
            <div className={styles.langActive} onClick={() => setShow(!show)}>{lang} <span style={{width: 10, display: 'inline-block'}}>{show ? '-' : "+"}</span></div>
            {show &&
            <div className={styles.langContainer}>
                <div className={styles.langItem} onClick={() => handleClick('En')}>English</div>
                <div className={styles.langItem} onClick={() => handleClick('Ru')}>Russian</div>
                <div className={styles.langItem} onClick={() => handleClick('Ch')}>Chines</div>
            </div>}
        </div>
    )
}