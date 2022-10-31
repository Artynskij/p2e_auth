import styles from './ContactPage.module.scss'
import { useState, useCallback, FormEvent, useRef } from 'react'
import checkSubmit from '../../utils/checkSubmit';
import { Toastify } from '../../components/Toastify/Toastify';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addFeedback as addFeedback } from '../../redux/reducers/feedbackReducer';
import { Feedback } from '../../models/feedback';

export default function ContactPage() {
    const [toastifyStatus, setToastifyStatus] = useState<'success' | 'error'>('success')

    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [tel, setTel] = useState('')
    const [mess, setMess] = useState('')
    const [err, setErr] = useState('')

    const dispatch = useDispatch()

    const ref = useRef<HTMLFormElement>(null)
    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        const nResp = checkSubmit('name', name)
        const mResp = checkSubmit('mail', mail)
        const pResp = checkSubmit('tel', tel)
        const ptResp = checkSubmit('text', mess)
        if (nResp.status &&
            pResp.status &&
            ptResp.status &&
            mResp.status
        ) {
            setErr('')
            setName('')
            setMail('')
            setTel('')
            setMess('')
            setToastifyStatus('success')
            toast('Успех!')
            
            const feedbackSave: Feedback =
            {
                name: name,
                email: mail,
                phone_number: tel,
                text_of_feedback: mess
            }

            dispatch(addFeedback(feedbackSave));
        } else {
            setErr(
                (!nResp.status && nResp.text) ||
                (!pResp.status && pResp.text) ||
                (!ptResp.status && ptResp.text) ||
                (!mResp.status && mResp.text) ||
                'ошибка'
            )
            setToastifyStatus('error')
            toast('Что-то пошло не так')
        }
    }, [checkSubmit, name, mail, tel, mess])
    return (
        <div className={styles.container}>
            <form className={styles.body} onSubmit={handleSubmit} ref={ref}>
                <div className={styles.title}>Форма обратной связи</div>
                {err !== '' && <div className={styles.err}>{err}</div>}
                <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Введите ваше имя'
                />
                <input
                    className={styles.input}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    type='email'
                    placeholder='Введите свой E-mail'
                />
                <input
                    className={styles.input}
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    type='phone'
                    placeholder='Введите номер телефона'
                />
                <textarea
                    rows={4}
                    className={styles.input}
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    placeholder='Введите сообщение'
                />
                <button className={styles.btn}>Отправить</button>
            </form>
            <Toastify status={toastifyStatus} />
        </div>
    )
}