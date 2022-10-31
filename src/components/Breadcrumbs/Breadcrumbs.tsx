import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { BreadcrumbsItemType } from "../../redux/reducers/breadcrumbsReducer"
import { selectBreadcrumbItems } from "../../redux/selectors"
import styles from "./Breadcrumbs.module.scss"

type ItemType = {
    item: BreadcrumbsItemType
    index: number
    arrLength?: number
}

const Item: React.FC<ItemType> = ({ item, index, arrLength }) => {
    const { pathname } = useLocation()

    // if (arrLength && (arrLength === index)) {
    //     return <li className={styles.item}>
    //         <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M0.340492 6.70337L6.92047 0.330366C7.37527 -0.110122 8.11067 -0.110122 8.56063 0.330366L9.65407 1.38941C10.1089 1.8299 10.1089 2.54217 9.65407 2.97798L4.99486 7.5L9.65891 12.0173C10.1137 12.4578 10.1137 13.1701 9.65891 13.6059L8.56547 14.6696C8.11067 15.1101 7.37527 15.1101 6.92531 14.6696L0.34533 8.29663C-0.114301 7.85614 -0.114301 7.14386 0.340492 6.70337Z" fill="white" />
    //         </svg>
    //         <p>{item.name}</p>
    //     </li>
    // }

    return <li className={styles.item}>
        {index !== 0
            ? <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.340492 6.70337L6.92047 0.330366C7.37527 -0.110122 8.11067 -0.110122 8.56063 0.330366L9.65407 1.38941C10.1089 1.8299 10.1089 2.54217 9.65407 2.97798L4.99486 7.5L9.65891 12.0173C10.1137 12.4578 10.1137 13.1701 9.65891 13.6059L8.56547 14.6696C8.11067 15.1101 7.37527 15.1101 6.92531 14.6696L0.34533 8.29663C-0.114301 7.85614 -0.114301 7.14386 0.340492 6.70337Z" fill="white" />
            </svg>
            : undefined
        }
        {item.link
            ? <Link to={item.link}>{item.name}</Link>
            : <Link to={pathname}>{item.name}</Link>
        }
    </li>
}

export const Breadcrumbs: React.FC = () => {
    let items = useSelector(selectBreadcrumbItems).map((i, index, arr) => <Item index={index + 1} item={i} arrLength={arr.length} key={index} />)

    return <ul className={styles.breadcrumbs}>
        <Item index={0} item={{ name: 'Главная', link: '/' }} />
        {items}
    </ul>
}