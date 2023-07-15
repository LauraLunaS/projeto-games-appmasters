import ThumbImage from '../../assets/ThumbImage.png';
import logoWindowns from '../../assets/logoWindows.png'
import style from './style.module.css';

export default function Thumb() {
    return (
        <div className={style.container} >
            <img src={ThumbImage} className={style.thumbimage}></img>
            <div className={style.containerbox}>
                <h1 className={style.titleBox}>ONLINE MATCHES</h1>
                <p className={style.subtitleBox}>Largest and most trusted top-up websites for games and online entertainment in Asia and beyond.</p>
                <p className={style.avaliable}>Avaliable en:</p>
                <div className={style.icons}>
                    <img src={logoWindowns} className={style.logoWindowns}></img>
                    <p className={style.paragrafo}>, Web Browser</p>
                </div>
            </div>
        </div>
    )
}