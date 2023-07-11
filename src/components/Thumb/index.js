import style from "./style.module.css"
import thumb from "../../assets/thumb.jpg"

export default function Thumb() {
    return (
            <div className={style.thumb}>
               <img src={thumb} className={style.thumbImage}></img> 
            </div>
    )
}