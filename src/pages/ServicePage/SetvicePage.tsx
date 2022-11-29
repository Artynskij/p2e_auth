import { useLocation } from 'react-router-dom'
import { useRef } from "react"
import styles from './ServicePage.module.scss'
import { JsxElement } from 'typescript'

export default function ServicePage() {
    const ref = useRef()
    const location = useLocation()
    console.log(location.state);
    const data:any = location.state
    
    
    return (
        <>
        <div className={styles.text} dangerouslySetInnerHTML={{__html: 
        data}}>
        </div>
        </>
    )
}




