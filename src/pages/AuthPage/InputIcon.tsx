
import styles from './AuthPage.module.scss'

export type InputIconProps = {
    icon?: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: string;
}

export default function InputIcon({type, icon, value, onChange, placeholder} : InputIconProps){
    return(
        <div className={styles.input}>
            {icon && <img src={icon} alt='icon' className={styles.inputImg}/> }
            <input 
                className={styles.inputInput} 
                placeholder={placeholder} 
                value={value}
                type={type || 'text'}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>

    )
}