import React, { useState } from 'react';
import './Search.css';
import Header from '../Header/Header';
import Poem from "../Poem/Poem";

function Search() {
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

    function LookForPoem() {
        return fetch(`https://raw.githubusercontent.com/IlyaGusev/PoetryCorpus/master/datasets/django/all_django.json`);
    }

    function handleClick(e) {
        e.preventDefault();
        LookForPoem()
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
            <div className="search">
                <form onClick={handleClick} name="search" className="form form_search_search">
                    <h3 className="search__title">Что искать?</h3>
                    <p className="search__text">
                        Ввведите в строку поиска слово(или корень слова) которое должно быть в вашем итоговом стихотворении. Вы получите список стихотворений содеражших данное слово(или корень) если таковое стихотворение было написано.
                    </p>
                    <p className="search__text">
                       По клику на выбранное вами из результатов поиска стихотворение вы передете к заполнению формы жалобы с этим стихотворением
                    </p>
                    <div className="search__wrapper">
                        <input type="text" name="poemLine" placeholder="Введите слово" onChange={getVal} className="search__input " />
                        <button className="search__btn" onClick = {poemsListChange}>
                            Поиск
                        </button>
                    </div>
                </form>
                {poems.map(item => <Poem key={item.id} poem = {item.text} />)}
            </div>
        </div>
    );
}

export default Search;