import { useCallback, useRef, useState } from 'react';
import styles from './SettingsPage.module.scss'
import open from '../../assets/openEye.svg'
import close from '../../assets/closeEye.svg'

export type SettingsInputProps = {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
}

export default function SettingsInput({label, type, placeholder, onChange, value} : SettingsInputProps){
    const ref = useRef<HTMLInputElement>(null)
    const [show, setShow] = useState(true)
    const handleEyeClick = useCallback(() => {
        setShow(!show);
        ref.current!.type = show ? 'text' : 'password'
    }, [ref.current, show])
    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>{label}</div>
            <input 
                type={type || 'text'} 
                placeholder={placeholder}
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                ref={ref}
            />
            {
                type === 'password' && (
                    <img src={show ? close : open} onClick={handleEyeClick} className={styles.inputIcon} />
                )
            }
        </div>

    )
}