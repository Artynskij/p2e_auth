import styles from './AuthPage.module.scss'
import InputIcon from './InputIcon'
import { useState, useCallback, FormEvent, useRef } from 'react'
import checkSubmit from '../../utils/checkSubmit'
import Repatcha from 'react-google-recaptcha'
import { Toastify } from './../../components/Toastify/Toastify';
import { toast } from 'react-toastify';
import { ApiService } from '../../api/ApiService';
import { UserRegistrationCredentials } from '../../models/userRegistrationCredentials';
import { Redirect } from 'react-router-dom'

export default function RegTab() {
    const [toastifyStatus, setToastifyStatus] = useState<'success' | 'error'>('success')

    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [passT, setPassT] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState('')
    const [TOUR, setTOUR] = useState<'true' | 'false'>('false') //terms of the user afteement
    const [registered, setRegistered ] = useState(false)
    const ref = useRef<HTMLFormElement>(null)

    const [captchaVerify, setCaptchaVerify] = useState(false)
    const captchaRef = useRef<any>(null)
    const handleCaptchaVerify = useCallback((token: string | null) => {
        if (token === null) setCaptchaVerify(false);
        token && setCaptchaVerify(true)
    }, []);

    const userRegistration = async (fullUserRegistrationCredentials: UserRegistrationCredentials) => {
        const apiService = new ApiService();
        const response =await apiService.userRegistration(fullUserRegistrationCredentials);
        console.log(response);
        
        
        if(response.status===201) {
           setRegistered(true)
        } else {
            setToastifyStatus('error')
            toast('Пользователь с таким именем или почтой уже существует')
        }
    }

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        const nResp = checkSubmit('name', name)
        const pResp = checkSubmit('password', pass)
        const mResp = checkSubmit('mail', mail)
        const ptResp = checkSubmit('passwordT', passT)
        const TOURResp = checkSubmit('TOUR', TOUR)
        if (nResp.status &&
            pResp.status &&
            ptResp.status &&
            mResp.status &&
            pass === passT && TOURResp.status && captchaVerify
        ) {
            setErr('')
            setName('')
            setMail('')
            setPassT('')
            setPass('')
            setTOUR('false')
            setCaptchaVerify(false)
            captchaRef.current?.reset && captchaRef.current?.reset()
            // setToastifyStatus('success')
            // toast('Успех')

            const fullUserRegistrationCredentials: UserRegistrationCredentials = {
                username: name,
                email: mail,
                password: pass,
                repeat_password: passT,
                agreement_confirmation: true
            }

            userRegistration(fullUserRegistrationCredentials)
        } else {
            setErr(
                (!nResp.status && nResp.text) ||
                (!pResp.status && pResp.text) ||
                (!ptResp.status && ptResp.text) ||
                (!mResp.status && mResp.text) ||
                (!TOURResp.status && TOURResp.text) ||
                (!captchaVerify && 'Вы должны пройти капчу') ||
                'Что-то пошло не так...'
            )
            setToastifyStatus('error')
            toast('Неправильная почта или пароль')
        }
    }, [name, checkSubmit, mail, passT, pass, TOUR, captchaVerify])
if(registered) return <Redirect to={"/login"}/>
    return (

        <form className={styles.body} onSubmit={handleSubmit} ref={ref}>
            {err !== '' && <div className={styles.err}>{err}</div>}
            <InputIcon
                value={name}
                onChange={setName}
                placeholder={'Имя пользователя'}
            // icon={user}
            />
            <InputIcon
                value={mail}
                onChange={setMail}
                placeholder={'Email'}
                // icon={mailSvg}
                type='email'
            />
            <InputIcon
                value={pass}
                onChange={setPass}
                placeholder={'Пароль'}
                // icon={lock}
                type='password'
            />
            <InputIcon
                value={passT}
                onChange={setPassT}
                placeholder={'Подтвердите пароль'}
                // icon={lock}
                type='password'
            />
            <div className={styles.bodyRow}>
                <input onChange={() => setTOUR(prev => prev === 'false' ? 'true' : 'false')} checked={TOUR === 'true'} type='checkbox' className={styles.radio} id='radio' />
                <label htmlFor='radio' style={{ fontSize: 10 }}>Я прочитал(а) и принимаю условия пользовательсткого соглашения</label>
            </div>
            <Repatcha ref={captchaRef} onChange={handleCaptchaVerify} size={window.innerWidth <= 400 ? 'compact' : 'normal'} theme='dark' hl='ru' sitekey={'6LcF4-whAAAAAMUm1K7CQkl04fG7f2yOxDPzmeaQ'} />
            <button className={styles.btn} style={{ marginBottom: 0 }}>Регистрация</button>
            <Toastify status={toastifyStatus} />
        </form>
    )
}