import styles from "./UserPage.module.scss"
import arrow from "../../assets/arrow.png" //Play icons created by Roundicons - Flaticon
import { useState, useEffect } from 'react';
import { mockUser, mockUsers } from "../../utils/mockData";

type Props = {
    category: string
    items: {
        description: string
        price: number
    }[]
}

export const Offer = ({ category, items }: Props) => {
    const [priceFilter, setPriceFilter] = useState<null | boolean>(null)
    type FilterItemsType = typeof items
    let [filterItems, setFilterItems] = useState<FilterItemsType>([])

    useEffect(() => {
        setFilterItems(items)
    }, [items])

    const handleFilter = (newType: null | boolean) => {
        if (newType === null) return;
        if (newType === false) setFilterItems(prev => prev.sort((a, b) => a.price - b.price))
        if (newType === true) setFilterItems(prev => prev.sort((a, b) => b.price - a.price))
        setPriceFilter(newType)
    }

    return <div className={styles.offer}>
        <h3 className={styles.categoryName}>{category}</h3>
        <div className={styles.columnNames}>
            <p>Описание</p>
            <p onClick={() => handleFilter(priceFilter === null ? true : !priceFilter)} className={styles.price}>Цена
                <span className={styles.arrows}>
                    {priceFilter === null && <>
                        <img className={styles.arrowTop} src={arrow} alt='arrow up' />
                        <img className={styles.arrowBottom} src={arrow} alt='arrow down' />
                    </>}
                    {priceFilter === true && <img className={styles.arrowTop} src={arrow} alt='arrow up' />}
                    {priceFilter === false && <img className={styles.arrowBottom} src={arrow} alt='arrow down' />}
                </span>
            </p>
        </div>
        <div className={styles.items}>
            {filterItems.map((i, index) => {
                return <div className={styles.item} key={index}>
                    <p className={styles.description}>{i.description}</p>
                    <p className={styles.price}>{i.price} ₽</p>
                </div>
            })}
        </div>
    </div>
}