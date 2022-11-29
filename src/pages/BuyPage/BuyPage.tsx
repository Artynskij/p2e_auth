import styles from './BuyPage.module.scss'
import { mockBuy } from '../../utils/mockData';
import { ApiService } from '../../api/ApiService';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectDataUser, selectLanguage } from '../../redux/selectors';
import useToken from '../../hooks/useToken';
import { allDataDeal } from '../../models/dealsModel';
import { Service } from '../../models/modelsGetData';

export default function BuyPage() {
    const [services, setServices] = useState<Service[]>()

    const api = new ApiService()
    const dataUser = useSelector(selectDataUser)
    const language = useSelector(selectLanguage)
    const { token } = useToken()

    const getServiceById = async (id: number) => {
        const data = await api.getServicesById(id)
        const service: Service = {
            count: data.count,
            category: data.category,
            detail_description: data.detail_description,
            id: data.id,
            price: data.price,
            seller: data.seller,
            short_description: data.short_description,
            additional: data.additional.map((i: any) => {
                const languageAdditional = language === "rus" ? i.rus : language === "eng" ? i.eng : i.chi
                return languageAdditional
            })

        }
      console.log(service);
      return service
    }

    const getDealsById = async (id: number, header: any) => {
        const data: allDataDeal[] = await api.getDealByIdForClient(id, header)
    }
    useEffect(() => {
        const dataToken = { Authorization: `Bearer ${token}` }
        getDealsById(dataUser.id, dataToken)
    }, [])



    return (
        <div className={styles.contianer}>
            <div className={styles.title}>Мои покупки</div>
            <div className={styles.subtitle}>Список ЗАКАЗОВ</div>
            <div className={styles.items}>
                <div className={styles.item}>Валюта</div>
                <div className={styles.item}>Аккаунты</div>
                <div className={styles.item}>Предметы</div>
                <div className={styles.item}>Услуги</div>
            </div>
            <div className={styles.table}>
                <div className={styles.tableTop}>
                    <span>Заказ №</span>
                    <span>Дата:</span>
                    <span>Игра:</span>
                    <span>Категория:</span>
                    <span>Сторона:</span>
                    <span>Сервер:</span>
                    <span>Количество:</span>
                    <span>Цена:</span>
                </div>
                {
                    mockBuy.map(item => (
                        <div className={styles.tableItem} key={item.id}>
                            <span>{item.number}</span>
                            <span>{item.date}</span>
                            <span>{item.game}</span>
                            <span>{item.category}</span>
                            <span>{item.side}</span>
                            <span>{item.server}</span>
                            <span>{item.count}</span>
                            <span>{item.price}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}