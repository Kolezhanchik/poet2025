import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Subcategory.css';

function Subcategory(props) {

    const subcat = props.location.data.map((item) => {
        return <Link
            className="subcategory__item"
            style={{ backgroundImage: `url(${props.location.url})`}} 
            to={{
                pathname: "/complain",
                data: item.props.subpoems,
                title: item.props.name
            }}
        >
           <p className="subcategory__name"> {item.props.name}</p>
        </Link>
    });

    return (
        <div className="subcategory">            
            <Header title={`${props.location.title}`} />            
            <div className="subcategory__items">
            <h2 className="subcategory__subtitile">Выберите подкатегорию</h2>  
                {subcat}
            </div>
        </div>
    )
}

export default Subcategory;