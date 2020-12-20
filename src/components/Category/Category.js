import React from "react";
import Poem from "../Poem/Poem";

function Category(props) {
    const poems = props.poems;
    const poem = poems.map(item => <Poem key={item.id} poem = {item.poem} />);

    return (
        <div>
            <h2 className="section__titile">{props.name}</h2>
            {poem}
        </div>
    )
}

export default Category