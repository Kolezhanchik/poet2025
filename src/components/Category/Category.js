import React from "react";
import Poem from "../Poem/Poem";
import { Link } from 'react-router-dom';
import './Category.css';

function Category(props) {

    const poems = props.subcategories.map(item => <Poem key={item.id} name={item.subname} subpoems={item.poem} />);

    return (
        <Link className="category"
        style={{ backgroundImage: `url(${props.url})`}} 
            to={{ 
                pathname: "/subcategory", 
                data: poems, 
                url: props.url,
                title: props.name 
            }}
        >
            {props.name}
        </Link>

    )
}

export default Category