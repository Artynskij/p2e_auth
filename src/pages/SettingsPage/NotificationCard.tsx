import Card from "./Card";
import Switch from "./Switch";

export default function NotificationCard(){
    return(
        <Card
            title='Уведомления:'
        >
            <Switch
                title="Сообщения"
                check={true}
            />
            <Switch
                title="Финансы"
                check={true}
            />
            <Switch
                title="Покупки"
                check={true}
            />
            <Switch
                title="Новые лоты"
                check={true}
            />
            <Switch
                title="E-mail уведомления"
                check={true}
            />
        </Card>
)
}