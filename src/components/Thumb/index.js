import logoWindowns from '../../assets/logoWindows.png';
import imagethumb from '../../assets/imagethum.png';
import style from './style.module.css';

export default function Thumb() {
    return (
        <div className={style.container} >
            <img src={imagethumb} className={style.thumbimage}></img>
            <div className={style.containerbox}>
                <h1 className={style.titleBox}>ONLINE MATCHES</h1>
                <p className={style.subtitleBox}>Abra as portas do seu universo virtual e mergulhe na paixão dos jogos sem limites.</p>  
                <div className={style.description}>
                    <p className={style.avaliable}>Plataform en:</p>
                </div>
                <div className={style.icons}>
                    <img src={logoWindowns} className={style.logoWindowns}></img>
                    <p className={style.paragrafo}>, Web Browser</p>
                </div>
            </div>
        </div>
    )
}