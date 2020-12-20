import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import './Poem.css';

function Poem(props) {
    const [poem, setPoem] = useState(props.poem);
    const poemRef = useRef();

    function handleClick() {
        setPoem(poemRef.current.value);
    }

    return (
        <div>
            <Link className="poem" to={{ pathname: "/complain", data: poem }} ref={poemRef} onClick={handleClick}>{poem}</Link>
        </div>
    )
}

export default Poem;
