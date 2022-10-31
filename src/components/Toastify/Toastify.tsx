import { ToastContainer } from 'react-toastify';
import "./Toastify.scss";

type ToastifyProps = {
    status: 'success' | 'error'
}

export const Toastify = ({ status }: ToastifyProps) => {

    return <ToastContainer className={`toast ${status === 'success' ? 'toast_success' : 'toast_error'}`} theme='dark' position='bottom-right' />
}