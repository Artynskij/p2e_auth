import spon1 from '../../../../assets/spon1.svg'
import spon2 from '../../../../assets/spon2.svg'
import spon3 from '../../../../assets/spon3.svg'
import spon4 from '../../../../assets/spon4.svg'
import styles from './Sponsor.module.scss'
import './Sponsor.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const responsive = [
    {
        breakpoint: 1000,
        settings: {
            slidesToShow: 1,
            rows: 2
        }
    }
]

export default function Sponsor() {
    return (
        <div className={styles.container}>
            <Slider slidesToShow={4} dots arrows={false} infinite={false} responsive={responsive}>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon1} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon1} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon1} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>SANDBOX</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon2} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon2} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon2} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>Mines of Dalarnia</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon3} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>SPLINTERLANDS</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon4} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>Star Atlas</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon3} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>SPLINTERLANDS</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon4} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>Star Atlas</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon4} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>Star Atlas</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon3} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>SPLINTERLANDS</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon4} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon4} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>Star Atlas</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.inner}>
                        <a>
                            <img src={spon3} className={`${styles.img} ${styles.t}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.g}`} alt="sponsor" />
                            <img src={spon3} className={`${styles.img} ${styles.b}`} alt="sponsor" />
                        </a>
                        <div className={styles.title}>SPLINTERLANDS</div>
                    </div>
                </div>
            </Slider>
        </div>

    )
}