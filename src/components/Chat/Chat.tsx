import { CSSProperties, StyleHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import styles from './Chat.module.scss'

export type ChatProps = {
    value: string;
    onChange: (val: string) => void;
    setChat: (ch: chatType[]) => void;
    chat: chatType[];
    style?: CSSProperties;
    className?: string
}

export type chatType = {
    id: number;
    text: string;
}

export default function Chat({value, onChange, setChat, chat, style, className}: ChatProps){

    const ref = useRef<HTMLInputElement>(null)
    const refChat = useRef<HTMLDivElement>(null)

    const onClick = useCallback(() => {
        value !== '' && setChat([...chat, {id: new Date().getMilliseconds(), text: value}])
        onChange('')
    }, [onChange, setChat, value])


    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if(e.key === 'Enter'){
                onClick()
            }
        }

        window.addEventListener('keypress', handle)

        return () => window.removeEventListener('keypress', handle)
    }, [value])
    return(
        <div className={`${styles.container} ${className}`} style={style}>
            <div 
                className={`${styles.chat} ${ chat.length === 0 && styles.chatEmpty}`} 
                ref={refChat}
                style={{maxHeight: refChat.current?.clientHeight}}
            >
                {
                    chat.length > 0 ? (
                        
                            chat.map(item => (
                                <div key={item.id} className={styles.chatItem}>
                                    {item.text}
                                </div>
                            ))
                        
                    ) : (
                        <div className={styles.placeholder}>
                            Напишите продавцу<br/>перед оплатой
                        </div> 
                    )
                }
            </div>
            <div className={styles.chatContainer}>
                <input
                    placeholder='Написать...'
                    className={styles.chatInput}
                    value={value}
                    ref={ref}
                    onChange={(e) => onChange(e.target.value)}
                />
                <svg width="15" onClick={onClick} height="12" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3235 6.3753L3.53849 0.191406C1.59505 -0.515151 0.0932691 1.86996 1.50666 3.28335L6.36555 8.14224L1.50666 13.0011C0.09327 14.4145 1.59477 16.7999 3.53849 16.0931L20.3235 9.90919C21.8256 9.29046 21.8256 6.99347 20.3235 6.3753Z" fill="white"/>
</svg>

            </div>
        </div>
    )
}