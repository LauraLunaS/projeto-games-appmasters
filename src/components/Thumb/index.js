import style from "./style.module.css"
import thumbImage from "../../assets/thumbImage.png"

export default function Thumb() {
    return (
        <div className={style.thumb}>
            <div className={style.cardThumb}>
                <h2 className={style.thumbTitle}>Valorant</h2>
                <h3 className={style.thumbSubtitle}>+300 JOGOS PARA VISUALIZAR</h3>
            </div>
            <img src={thumbImage} className={style.thumbImage}></img>
        </div>
    )
}