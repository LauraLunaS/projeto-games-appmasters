import React from 'react';
import style from './style.module.css';
import errorImage from "../../assets/errorImage.png"

export default function Error({errorMessage}) {
    return (
        <div className={style.errorMessage}>
            <img src={errorImage} className={style.errorImage}></img>
            <p className={style.subtitleError}>OPS!</p>
            <p className={style.titleError}>{errorMessage}</p>
        </div>
    )
}