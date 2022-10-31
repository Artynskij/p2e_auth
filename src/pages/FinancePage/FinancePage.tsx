import CardBalance from './CardBalance'
import Info from './Info'
import History from './History'

export default function FinancePage(){
    return(
        <div>
            <CardBalance/>
            <Info/>
            <History/>
        </div>
    )
}