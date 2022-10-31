import { useState } from "react";
import Card from "./Card";
import SettingsInput from "./SettingsInput";
import Switch from "./Switch";


export default function MailCard(){
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    return(
        <Card
            title="Контакты и безопасность:"
        >
            <Switch
                title="Двухфакторная аутентификация"
                check={false}
            />
            <SettingsInput
                label='Email:'
                placeholder='Bведите email'
                type='email'
                value={mail}
                onChange={setMail}
            />
            <SettingsInput
                label='Телефон:'
                placeholder='Bведите телефон'
                type='text'
                value={phone}
                onChange={setPhone}
            />
        </Card>
    )
}