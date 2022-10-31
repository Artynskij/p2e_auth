import styles from './SettingsPage.module.scss'
import manSvg from '../../assets/man.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function ChangeAvatar(){
    const ref = useRef<HTMLInputElement>(null)
    const [cur, setCur] = useState(false)
    const handleClick = useCallback(() => {ref.current?.click(); setCur(false)}, [ref.current])
    return(
        <div className={styles.avatar} onClick={handleClick}>
            <img src={manSvg} alt="icon" />
            <div className={styles.avatarTitle}>{cur && ref.current?.files && ref.current?.files.length > 0 ? ref.current?.files[0].name : 'Сменить аватар' }</div>
            <input type="file" onChange={() => setCur(true)} ref={ref} />
        </div>
    )
}