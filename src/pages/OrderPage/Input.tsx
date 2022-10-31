import styles from './OrderPage.module.scss'

export type InputProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    id: string;
    readonly?: boolean;
}

export default function Input({label, placeholder, value, onChange, id, readonly } : InputProps){
    return(
        <div>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <input 
                id={id}
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                readOnly={readonly}
            />
        </div>
    )
}