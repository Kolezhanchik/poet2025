import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Main() {
    return (
        <div className="section">
            <Header title="Негодующий поэт" />
            <div className="main">
                <div className="section__rectangle section__rectangle_first"></div>
                <p className="section__text section__text_left">
                    Для защиты общественной нравственности к рассмотрению принимаются только обращения, написанные цитатами поэтов-классиков.
                </p>
                <h2 className="section__titile">
                    Порядок Действий:
                </h2>
                <div className="section__rectangle section__rectangle_second"></div>
                <h3 className="section__subtitile">
                    У вас есть текст стихотворения:
                </h3>
                <p className="section__text">
                    Нажмите на кнопку "Подать жалобу" внизу и заполните форму
                </p>
                <div className="section__rectangle section__rectangle_second"></div>
                <h3 className="section__subtitile">
                   Вы хотите выбрать стихотворение из каталога:
                </h3>
                <p className="section__text">
                    Перейдите во вкладку "Каталог" и выбирите подходяшую вам категории с гарантией интрепретации
                </p>
                <h3 className="section__subtitile">
                   Вы хотите выбрать стихотворение сами:
                </h3>
                <p className="section__text">
                    Перейдите во вкладку поиск и выбирите подходяшее вам стихотворение по ключевому слову
           
                </p>
                <Link to="/complain" className="section__btn"> Подать жалобу</Link>
            </div>
        </div>
    );
}

export default Main;