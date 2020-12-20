import React, { useState } from 'react';
import './User.css';
import Header from '../Header/Header';
import Poem from "../Poem/Poem";

function User() {
    const [word, setWord] = useState('');
    const [poems, setPoems] = useState([]);
    const [poem, setPoem] = useState([]);

    function poemsListChange(){
        setPoem(poems);
        console.log(poem);
    }

    function getVal(event) {
        setWord(event.target.value)
    };

    function search() {
        return fetch(`https://raw.githubusercontent.com/IlyaGusev/PoetryCorpus/master/datasets/django/all_django.json`);
    }

    function handleClick(e) {
        e.preventDefault();
        search()
            .then((res) => {
                if (res.ok) { return res.json(); }
                return Promise.reject(res.status);

            })
            .then((res) => {
                let arr = [];
                for (let i = 0; i <= 10000; i++) {
                    if (res[i].fields.text.indexOf(word) > 0) {
                        arr.push(res[i].fields);
                    }
                }
                setPoems(arr);             
            })
            .catch((err) => {
                alert(err);
            })

    };

    return (
        <div className="section">
            <Header title="Поиск" />
            <div className="user">
                <form onClick={handleClick} name="search" className="form form_user_search">
                    <h3 className="user__title">Что искать?</h3>
                    <div className="user__wrapper">
                        <input type="text" name="poemLine" placeholder="Введите слово" onChange={getVal} className="user__input " />
                        <button className="user__btn" onClick = {poemsListChange}>
                            Поиск
                        </button>
                    </div>
                </form>
                {poems.map(item => <Poem key={item.id} poem = {item.text} />)}
            </div>
        </div>
    );
}

export default User;