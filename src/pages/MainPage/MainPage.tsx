import hero from "../../assets/hero.png";
import Letters from "./components/Letters/Letters";
import styles from "./MainPage.module.scss";
import SearchResultList from "./components/SearchResult/SearchResultList";
import FAQ from "./components/FAQ/FAQ";
import Sponsor from "./components/Sponsor/Sponsor";
import { useEffect, useState } from "react";
import { lettersMock } from "../../utils/mockData";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useSelector } from "react-redux";
import { ApiService } from "../../api/ApiService";
// import { selectGames } from '../../redux/selectors';

export default function MainPage() {
  const letterClick = (item: string) => {
    let element = document.getElementById(item);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y - 60,
      behavior: "smooth",
    });
  };

  const [mainImg, setMainImg] = useState([{title:"", img:"", id:0}]);
  const api = new ApiService();
  const funcGetMainImg = async () => {
    const data = await api.getMainImage();
    setMainImg(data);
  };
  useEffect(() => {
    funcGetMainImg();
  }, []);


  const show = useScrollDirection();

  const isVisible = (elem: HTMLElement | null) => {
    if (!elem) return;
    var position = elem.getBoundingClientRect();
    // checking whether fully visible
    if (show) {
      if (
        (position.top >= 0 && position.bottom <= window.innerHeight) ||
        (position.top < window.innerHeight && position.bottom >= 0)
      ) {
        return true;
      }
    } else {
      if (
        (position.top >= 0 && position.bottom - 60 <= window.innerHeight) ||
        (position.top - 60 < window.innerHeight && position.bottom - 60 >= 0)
      ) {
        return true;
      }
    }
  };

  useEffect(() => {
    const handle = () => {
      let activeLetters = lettersMock
        .filter((l) => {
          let container = document.getElementById(l);
          return isVisible(container);
        })
        .map((l) => {
          let container = document.getElementById(l);
          if (!container) return { letter: "", top: 0 };
          let top = container.getBoundingClientRect().top;
          return { letter: l, top };
        });
      let activeLetterTop: number;
      if (show) {
        activeLetterTop = Math.max(...activeLetters.map((v) => v.top));
      } else {
        activeLetterTop = activeLetters[0]?.top || 0;
      }
      let activeLetter = activeLetters.find((l) => l.top === activeLetterTop);

      lettersMock.forEach((item) => {
        const id = "#id" + item;
        const elem = document.querySelector(id);
        if (activeLetter?.letter === item) {
          if (elem) {
            {/*@ts-expect-error*/ }
            elem.style.color = "rgb(0 255 25)";
          }
        } else {
          if (elem) {
            {/*@ts-expect-error*/ }
            elem.style.color = "#bdbdbd";
          }
        }
      });
    };

    window.addEventListener("scroll", handle);

    return () => window.removeEventListener("scroll", handle);
  }, [show]);

  return (
    <>
    {mainImg.map((item) => {
      return <img key={item.id} className={styles.img} src={`https://alexeygrinch.pythonanywhere.com${item.img}`} alt={item.title} />
    })}
      {/* <img key={item.id} className={styles.img} src={`https://alexeygrinch.pythonanywhere.com${mainImg[0].img}`} alt={mainImg[0].title} /> */}
      <div className={styles.result} id="result">
        <Letters handleClick={letterClick} />
        <div className={styles.resultInner}>
          <SearchResultList letter="A" />
          <SearchResultList letter="B" />
          <SearchResultList letter="C" />
          <SearchResultList letter="D" />
          <SearchResultList letter="F" />
          <SearchResultList letter="G" />
          <SearchResultList letter="H" />
          <SearchResultList letter="I" />
          <SearchResultList letter="J" />
          <SearchResultList letter="K" />
          <SearchResultList letter="L" />
          <SearchResultList letter="M" />
          <SearchResultList letter="N" />
          <SearchResultList letter="O" />
          <SearchResultList letter="P" />
          <SearchResultList letter="Q" />
          <SearchResultList letter="R" />
          <SearchResultList letter="S" />
          <SearchResultList letter="T" />
          <SearchResultList letter="U" />
          <SearchResultList letter="V" />
          <SearchResultList letter="W" />
          <SearchResultList letter="X" />
          <SearchResultList letter="Y" />
          <SearchResultList letter="Z" />
          
        </div>
      </div>
      <FAQ />
      <Sponsor />
    </>
  );
}