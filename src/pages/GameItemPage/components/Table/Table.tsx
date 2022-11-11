import styles from './Table.module.scss'
import { useState, useEffect } from 'react';
import TableItem from './TableItem';
import { TableItemName } from './TableItemName';
import { accountsMock, itemsMock, kinahMock, servicesMock } from '../../../../utils/mockData';
import { useLocation } from 'react-router-dom';
import { useBreadcrumbs } from './../../../../hooks/useBreadcrumbs';
import { GAMES_URL } from './../../../../utils/links';

export type TableProps = {
    game: string;
    subCat:any
    items: typeof kinahMock | typeof accountsMock | typeof itemsMock | typeof servicesMock
    className?: string
    customCategory?: {
        name: string
        link: string
    }
}

export type TableFiltersType = { [key: string]: string }
export type TableItemKeys = keyof TableFiltersType

export default function Table(props: TableProps) {
    const { pathname } = useLocation()
    let category = pathname.includes('all') ? {name: 'Кинары', link: pathname} : pathname.includes('accounts') ? {name: 'Аккаунты', link: pathname} : pathname.includes('items') ? {name: 'Предметы', link: pathname} : pathname.includes('services') ? {name: 'Услуги', link: pathname} : null
    console.log(category);
    
    // @ts-ignore

    useBreadcrumbs([{name: props.game, link: `${GAMES_URL}/${props.game}`}, category].filter(i => i !== null))
    const [filters, setFilters] = useState<TableFiltersType>({} as TableFiltersType)
    const [items, setItems] = useState(props.items)
    
    const [maxLvl, setMaxLvl] = useState('')
    const [minLvl, setMinLvl] = useState('')
    // const [categorTrue, setMinLvl] = useState('')

    const handleLvlBlur = (type: 'max' | 'min') => {
        if (type === 'max') {
            //@ts-ignore
            setFilters(prev => ({...prev, maxLvl}))
        } else {
            //@ts-ignore
            setFilters(prev => ({...prev, minLvl }))
        }
    }

    useEffect(() => {
        let newItems = props.items.filter(i => {
            let filterKeys = Object.keys(filters) as TableItemKeys[]
            return filterKeys.every(k => {
                //@ts-ignore
                if (k.includes('Lvl')) {
                    if (k === 'maxLvl') {
                        if (filters.minLvl !== undefined) {
                            //@ts-ignore
                            return i['lvl'] <= (Number(filters.maxLvl) || 999) && i['lvl'] >= (Number(filters.minLvl) || 0)
                        } else {
                            //@ts-ignore
                            return i['lvl'] <= (Number(filters.maxLvl) || 999)
                        }
                    } else {
                        if (filters.maxLvl !== undefined) {
                            //@ts-ignore
                            return i['lvl'] >= (Number(filters.minLvl) || 0) && i['lvl'] <= (Number(filters.maxLvl) || 999)
                        } else {
                            //@ts-ignore
                            return i['lvl'] >= (Number(filters.minLvl) || 0)
                        }
                    }
                } else {
                    //@ts-ignore
                    return i[k] === filters[k]
                }
            })
        })
        setItems(newItems)
    }, [filters])
    const getUniqeItems = (filterKey: TableItemKeys) => {
        //@ts-ignore
        return props.items.filter((value, index, self) => index === self.findIndex((t) => t[filterKey] === value[filterKey])).map(f => f[filterKey])
    }
    
    
    
    
    // const getChoiceServer = (filterKey: TableItemKeys) => {
    //     //@ts-ignore
    //     return props.subCat.choices.filter((value, index, self) => index === self.findIndex((t) => t[filterKey] === value[filterKey])).map(f => f[filterKey])
    // }
    return (
        <div className={`${styles.table} ${props.className ? props.className : ''}`}>
            <div className={styles.extraFilter}>
                {pathname.includes('accounts') && <div className={styles.lvlFilter}>
                    <p>Уровень</p>
                    <input onBlur={() => handleLvlBlur('min')} value={minLvl} onChange={e => setMinLvl(e.target.value)} placeholder='мин.' />
                    <input onBlur={() => handleLvlBlur('max')} value={maxLvl} onChange={e => setMaxLvl(e.target.value)} placeholder='макс.' />
                </div>
                }
                {pathname.includes('items') && <TableItemName className={styles.headerServer} enName='type' name='Тип' items={getUniqeItems('type')} filters={filters} setNewFilter={setFilters} />}
                {Object.keys(filters).length >= 2 && (
                    <button className={styles.resetFilters} onClick={() => setFilters({})}>Сбросить</button>
                )}
            </div>
            <div className={styles.header}>
            {props.subCat?.map((element: any, i: any) => {
                        return (
                            <TableItemName
                                className={styles.headerServer}
                                enName={`enName${i}`}
                                name={element.title}
                                items={element.choices}
                                filters={filters}
                                setNewFilter={setFilters}
                            />
                        );
                    })}
                {/* <TableItemName className={styles.headerServer} enName='server' name='Сервер' items={getUniqeItems('server')} filters={filters} setNewFilter={setFilters} /> */}
                {/* <TableItemName className={styles.side} enName='side' name='Сторона' items={getUniqeItems('side')} filters={filters} setNewFilter={setFilters} />
                <div className={styles.desc}>Описание</div>
                <TableItemName className={styles.nik} enName='online' name='Ник' items={['Онлайн', 'Оффлайн']} filters={filters} setNewFilter={setFilters} />
                <div className={styles.count}>Наличные</div>
                <div>Цена</div> */}
            </div>
            <div className={styles.list}>
                {
                    items.map(item => (
                        <TableItem category={category} key={item.id} {...props} {...item} />
                    ))
                }
                {items.length === 0 &&
                    <h4 className={styles.notFound}>Не найдено</h4>
                }
            </div>
        </div>
    )
}