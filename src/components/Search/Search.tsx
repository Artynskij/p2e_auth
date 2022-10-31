import styles from './Search.module.scss'
import icon from '../../assets/search.svg'
import { useRef, useEffect, useState } from 'react';
import { games } from '../../utils/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchItems, selectSearchValue } from '../../redux/selectors';
import { updateSearchValue } from '../../redux/reducers/searchReducer';

export type SearchProps = {
    value: string;
    onValueChange: (val: string) => void;
    placeholder?: string;
    onBlur?: () => void;
    className?: string;
}

export default function Search({ placeholder, onBlur, className}:SearchProps){
    const inputRef = useRef<HTMLInputElement>(null)
    const clearRef = useRef<HTMLButtonElement>(null)
    const dispatch = useDispatch()
    const searchValue = useSelector(selectSearchValue)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])
    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {        
        if (event.relatedTarget !== clearRef.current && onBlur && searchValue === '') {
            onBlur()
        } else if (event.relatedTarget === clearRef.current) {
            dispatch(updateSearchValue(''))
            onBlur && onBlur()
        } else {
            inputRef.current?.focus()
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchValue(e.target.value))
    }

    return(
        <div className={`${styles.container} ${className ? className : ''}`}>
            <input
                ref={inputRef}
                className={styles.input} 
                placeholder={placeholder || 'Поиск...'} 
                value={searchValue}
                onBlur={handleBlur}
                onChange={handleInputChange}
            />
            <button ref={clearRef} className={styles.icon}>+</button>
        </div>
    )
}