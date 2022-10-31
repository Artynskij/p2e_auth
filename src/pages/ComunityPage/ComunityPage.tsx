import styles from './ComunityPage.module.scss'
import { mockChatUsers } from '../../utils/mockData';
import User from './User';
import { useRouteMatch } from 'react-router';
import Chat, { chatType } from '../../components/Chat/Chat';
import { useState, useEffect } from 'react';

export type ComunityPageProps = {
    variant: ComunityPageVariant
}

export enum ComunityPageVariant {
    NoChat,
    Chat
}

export default function ComunityPage({variant} : ComunityPageProps){
    const mathch = useRouteMatch<{id: string}>()
    const [mess, setMess] = useState('')
    const [chat, updateChat] = useState<chatType[]>([])
    const [, updateState] = useState({});
    useEffect(() => {
        updateChat([])
    }, [mathch.params.id])
    return(
        <div className={styles.container}>
            <div className={styles.users}>
                {
                    mockChatUsers.map(item => <User key={item.id} active={mathch.params.id === item.id } {...item}/>)
                }
            </div>
            <div className={styles.chat}>
                {
                    variant === ComunityPageVariant.NoChat ? (
                        <div className={styles.chatPrevie}>Выберите кому хотите написать</div>
                    ) : (
                        <Chat
                            value={mess}
                            onChange={setMess}
                            chat={chat}
                            setChat={updateChat}
                            style={{borderRadius: 10}}
                        />
                    )
                }
            </div>
        </div>
    )
}