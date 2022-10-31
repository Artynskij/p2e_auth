export default function checkSubmit(type: string, value: string){
    if(!value){
        return {status: false, text : 'Все поля должны быть заполнены!'}
    }

    switch(type){
        case 'mail' : {
            if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)){
                return {status: true, text: 'ok'}
            }

            return {status: false, text : 'Некорректный почтовый адрес'}
        }
        case 'tel' : {
            if(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)){
                return {status: true, text: 'ok'} 
            }

            return {status: false, text : 'Некорректный телефон'}
        }
        case 'name': {
            if (/^[A-Za-z][A-Za-z0-9]*$/.test(value)) {
                return {status: true, text: 'ok'} 
            }
            return {status: false, text : 'Некорректное имя (пример: aa111)'}
        }
        case 'password': {
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                return {status: true, text: 'ok'} 
            }
            return {status: false, text : 'Некорректный пароль (пример: aaaaaaa111)'}
        }
        case 'passwordL': {
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                return {status: true, text: 'ok'} 
            }
            return {status: false, text : 'Некорректный пароль'}
        }
        case 'passwordT': {
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                return {status: true, text: 'ok'} 
            }
            return {status: false, text : 'Некорректный пароль (пример: aaaaaaa111)'}
        }
        case 'TOUR': {
            if (value === 'true') {
                return {status: true, text: 'ok'} 
            }
            return {status: false, text : 'Для регистрации необходимо подтвердить условия пользовательсткого соглашения'}
        }
        default: {
            return {status: true, text: 'ok'}
        }
    }
}