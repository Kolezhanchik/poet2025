import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import MainSection from '../MainSection/MainSection';
import sectionData from '../../data/mainSectionData.json';

function Main() {

    const sections = sectionData.map(item => <MainSection
        key={item.id}
        title={item.title}
        url={item.url}
        text={item.text}
    />)


    return (
        <div className="main">
            <div className="main">
                <div className="main__picutre"></div>
                <p className="main__text">
                    Во имя защиты общественной нравственности к рассмотрению принимаются обращения, написанные исключительно цитатами поэтов-классиков.
                </p>
                <h3 className="main__subtitile">
                    Что это такое?
                </h3>
                <p className="main__text">
                Сервис быстрого подбора стихотворений и отправки жалобы соответствующему адресату.
                </p>
                {sections}
                <Link to="/complain" onClick = {() => {window.scrollTo(0, 0)}} className="main__btn"> Подать жалобу</Link>
            </div>
        </div>
    );
}

export default Main;