import React from 'react';
import './MainSection.css';


function MainSection(props) {
    return (
        <div className="main__section">
             <div className="main__section-picutre"
                style={{ backgroundImage: `url(${props.url})`}}              
              ></div>
                <h3 className="main__section-subtitile">
                {props.title}
                </h3>
                <p className="main__section-text">
                    {props.text}
                </p>
        </div>
    );
}

export default MainSection;