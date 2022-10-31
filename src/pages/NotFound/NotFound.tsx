import { Link } from "react-router-dom"
import styles from "./NotFound.module.scss"
import error from "./../../assets/err404.png"

export const NotFound = () => {
    return <section className={styles.notFound}>
        <img className={styles.errorImg} src={error} alt='error' />
        <h2 className={styles.heading}>Не найдено</h2>
        <Link className={styles.toMainPage} to='/'>На главную страницу</Link>
    </section>
}