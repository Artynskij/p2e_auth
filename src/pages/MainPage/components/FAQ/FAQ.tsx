import styles from './FAQ.module.scss'
import {useState} from 'react';

export default function FAQ(){
    return(
        <section>
            <h2 className={styles.title}>FAQ</h2>
            <p className={styles.text}>Получите ответы на все свои вопросы, прежде чем начать использовать наш сервис</p>
            <div className={styles.container}>
                <Item 
                    title='Почему пользоваться сервисом безопасно?'
                    description='Не следует, однако забывать, что реализация намеченных плановых заданий в значительной степени обуславливает 
                    создание систем массового участия. Таким образом рамки и место обучения кадров играет важную роль в формировании 
                    модели развития. Равным образом реализация намеченных плановых заданий позволяет оценить значение направлений прогрессивного развития.'
                />
                <Item 
                    title='Почему пользоваться сервисом безопасно?'
                    description='Не следует, однако забывать, что реализация намеченных плановых заданий в значительной степени обуславливает 
                    создание систем массового участия. Таким образом рамки и место обучения кадров играет важную роль в формировании 
                    модели развития. Равным образом реализация намеченных плановых заданий позволяет оценить значение направлений прогрессивного развития.'
                />
                <Item 
                    title='Почему пользоваться сервисом безопасно?'
                    description='Не следует, однако забывать, что реализация намеченных плановых заданий в значительной степени обуславливает 
                    создание систем массового участия. Таким образом рамки и место обучения кадров играет важную роль в формировании 
                    модели развития. Равным образом реализация намеченных плановых заданий позволяет оценить значение направлений прогрессивного развития.'
                />
            </div>
        </section>
    )
}

type ItemProps = {
    title: string, description: string
}

const Item = ({title, description} : ItemProps) => {
    const [isShow, setIsShow] = useState(false)
    return(
        <div className={styles.item} onClick={() => setIsShow(!isShow)}>
            <div className={styles.itemTitle}>
                <span>{title}</span>
                <div className={isShow ? `${styles.itemIcon} ${styles.itemIconActive}` : styles.itemIcon}>
                    <span className={!isShow ? styles.plus : undefined}>{isShow ? '-' : "+"}</span>
                </div>
            </div>
            {isShow && <div className={styles.itemText}>{description}</div>}
        </div>
    )
}