import { useState } from 'react'
import Card from './Card'
import SettingsInput from './SettingsInput'
import styles from './SettingsPage.module.scss'

export default function PassCard(){
    const [nowPass, setNowPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [addPass, setAddPass] = useState('')
    return(
        <Card
        title='Смена пороля:'
    >
        <SettingsInput
            label='Текущий пароль:'
            placeholder='введите текущий пароль'
            type='password'
            value={nowPass}
            onChange={setNowPass}
        />
        <SettingsInput
            label='Новый пароль:'
            placeholder='введите новый пароль'
            type='password'
            value={newPass}
            onChange={setNewPass}
        />
        <SettingsInput
            label='Подвтвердите пароль:'
            placeholder='Подвтвердите пароль'
            type='password'
            value={addPass}
            onChange={setAddPass}
        />
        <button className={styles.btn}>Поменять</button>
    </Card>
    )
}