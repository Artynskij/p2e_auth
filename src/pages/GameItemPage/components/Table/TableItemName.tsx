import styles from './Table.module.scss'
import { useState, useRef, useEffect } from 'react';
import { TableFiltersType, TableItemKeys } from './Table';

type TableItemNameProps = {
    name: string
    enName: TableItemKeys
    items: string[]
    setNewFilter: React.Dispatch<React.SetStateAction<TableFiltersType>>
    className: string
    filters: TableFiltersType
}

export const TableItemName = ({ items, name, enName, setNewFilter, className, filters }: TableItemNameProps) => {
    const [show, setShow] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)
    const nameInnerRef = useRef<HTMLDivElement>(null)

    const handleFilterItemClick = (filterName: string | null) => {
        setShow(false)
        if (filterName === null) {
            setNewFilter(prev => {
                let copy = { ...prev }
                delete copy[enName]
                return copy
            })
            return
        }
        setNewFilter(prev => {
            if (prev[enName]) {
                let copy = { ...prev }
                //@ts-ignore
                copy[enName] = filterName
                return copy
            }
            return { ...prev, [enName]: filterName }
        })
    }
    let Items = items.map((i, index) => <div key={index} className={`${styles.tableItemListItem} ${filters[enName] === i ? styles.tableItemListItem_active : ''}`} onClick={() => handleFilterItemClick(i)}>{i}</div>)

    useEffect(() => {
        if (!show) return;

        setTimeout(() => {
            listRef.current?.focus()
        }, 100)
    }, [show])
    
    const handleShowStatus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShow(!show)
    }
    const handleDeleteFilter = () => {
        handleFilterItemClick(null)
    }
    const handleListBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (e.relatedTarget !== nameInnerRef.current) {
            setShow(false)
        }
    }

    return <div className={`${styles.tableItemName} ${className}`}>
        <div className={styles.name}>
            <div tabIndex={-1} ref={nameInnerRef} className={styles.nameInner} onClick={handleShowStatus}>
                <span>{name}</span>
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.47171 6.43917L0.22038 2.05066C-0.07346 1.74734 -0.07346 1.25686 0.22038 0.95676L0.92685 0.22749C1.22069 -0.07583 1.69584 -0.07583 1.98656 0.22749L5 3.33817L8.0134 0.22749C8.3073 -0.07583 8.7824 -0.07583 9.0731 0.22749L9.7796 0.95676C10.0735 1.26008 10.0735 1.75056 9.7796 2.05066L5.52829 6.43917C5.2407 6.7425 4.76555 6.7425 4.47171 6.43917Z" fill="white" />
                </svg>
            </div>
            {filters[enName] &&
                <span onClick={handleDeleteFilter} className={styles.deleteFilter}>+</span>
            }
        </div>
        {show &&
            <div onBlur={handleListBlur} tabIndex={-1} ref={listRef} className={styles.tableItemList}>
                <div className={`${styles.tableItemListItem} ${!filters[enName] ? styles.tableItemListItem_active : ''}`} onClick={handleDeleteFilter}>Все</div>
                {Items}
            </div>
        }
    </div>
}