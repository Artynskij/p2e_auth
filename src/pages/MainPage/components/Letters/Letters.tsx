import { lettersMock } from "../../../../utils/mockData"
import styles from './Letter.module.scss'
import { useEffect, useState, useRef } from 'react';

export type LettersProps = {
    handleClick?: (letter: string) => void;
}

export default function Letters({ handleClick }: LettersProps) {
    const [prevPos, setPrevPos] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef?.current && window.innerHeight <= containerRef.current.clientHeight) {
            const handler = () => {
                var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
                if (st > prevPos){
                    if (containerRef.current) {
                        let topPos = window.innerHeight - containerRef.current.clientHeight + 'px'
                        containerRef.current.style.top = topPos
                    }
                } else {
                    if (containerRef.current) {
                        containerRef.current.style.top = '60px'
                    }
                }
                setPrevPos(st <= 0 ? 0 : st)
            }
            window.addEventListener('scroll', handler)
            return () => window.removeEventListener('scroll', handler)
        }
    }, [prevPos])

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={`${styles.inner}`}>
                {
                    lettersMock.map((item, index) => <div id={`id${item}`} className={styles.item} onClick={() => handleClick && handleClick(item)} key={index}>{item}</div>)
                }
            </div>
        </div>
    )
}