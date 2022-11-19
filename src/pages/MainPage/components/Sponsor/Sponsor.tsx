import spon1 from "../../../../assets/spon1.svg";
import spon2 from "../../../../assets/spon2.svg";
import spon3 from "../../../../assets/spon3.svg";
import spon4 from "../../../../assets/spon4.svg";
import { useEffect, useState } from "react";
import styles from "./Sponsor.module.scss";
import "./Sponsor.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ApiService } from "../../../../api/ApiService";

const responsive = [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 1,
      rows: 2,
    },
  },
];

export default function Sponsor() {
  const [sponsorGames, setSponsorGames] = useState([
    { title: "", icon: "", id: 0, official_site_url: "/" },
  ]);
  const api = new ApiService();
  const getSponsor = async () => {
    const data = await api.getSponsorGames();
    setSponsorGames(data);
  };
  useEffect(() => {
    getSponsor();
  }, []);
  if (sponsorGames.length > 0) {
    return (
      <div className={styles.container}>
        <Slider
          slidesToShow={4}
          dots
          arrows={false}
          infinite={false}
          responsive={responsive}>
          {sponsorGames.map((spon) => {
            return (
              <div key={spon.id} className={styles.item}>
                <div className={styles.inner}>
                  <a href={spon.official_site_url}>
                    <img
                      src={`https://alexeygrinch.pythonanywhere.com${spon.icon}`}
                      className={`${styles.img} ${styles.t}`}
                      alt="sponsor"
                    />
                    <img
                      src={`https://alexeygrinch.pythonanywhere.com${spon.icon}`}
                      className={`${styles.img} ${styles.g}`}
                      alt="sponsor"
                    />
                    <img
                      src={`https://alexeygrinch.pythonanywhere.com${spon.icon}`}
                      className={`${styles.img} ${styles.b}`}
                      alt="sponsor"
                    />
                  </a>
                  <div className={styles.title}>{spon.title}</div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Slider
          slidesToShow={4}
          dots
          arrows={false}
          infinite={false}
          responsive={responsive}>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon1}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon1}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon1}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>SANDBOX</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon2}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon2}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon2}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>Mines of Dalarnia</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>SPLINTERLANDS</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>Star Atlas</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>SPLINTERLANDS</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>Star Atlas</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>Star Atlas</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>SPLINTERLANDS</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon4}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>Star Atlas</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner}>
              <a>
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.t}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.g}`}
                  alt="sponsor"
                />
                <img
                  src={spon3}
                  className={`${styles.img} ${styles.b}`}
                  alt="sponsor"
                />
              </a>
              <div className={styles.title}>SPLINTERLANDS</div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
