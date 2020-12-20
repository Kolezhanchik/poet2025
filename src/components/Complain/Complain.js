import React from 'react';
import './Complain.css';
import Header from '../Header/Header';

function Complain(props) {
    
    return (
<div className="section">
   <Header title="Жалоба" />
   <div className="petition">
      <form className="petition__form">
         {/* <p className="petition__poem-text">
            {props.location.data}
         </p> */}
         <textarea className="petition__poem-text" value={props.location.data}/>
         <fieldset className="petition__fieldset">
         <h3 className="petition__fieldset-heading">От кого:</h3>
         <label className="petition__label">
               <p className="petition__input-name">Имя</p>
               <input type="text" className="petition__input" placeholder="Ваше имя"/>
            </label>
            <label className="petition__label">
               <p className="petition__input-name">E-mail</p>
               <input type="text" className="petition__input" placeholder="example@mail.ru"/>
            </label>
            <label className="petition__label">
               <p className="petition__input-name">Номер телефона</p>
               <input type="text" className="petition__input" placeholder="+7 (123) 123-45-67"/>
            </label>
         </fieldset>
         <fieldset className="petition__fieldset">
            <h3 className="petition__fieldset-heading">Показать вашу жалобу?</h3>
            <label className="petition__label-radio">
               <input type="radio" name="public" className="petition__radio" value="yes"/> 
               <p className="petition__radio-name">Пусть увидят все</p>
            </label>
            <label className="petition__label-radio">
               <input type="radio" name="public" className="petition__radio" value="no" checked/> 
               <p className="petition__radio-name">Никому не показывать</p>
            </label>           
         </fieldset>
         <fieldset class="petition__fieldset">
    <h3 class="petition__fieldset-heading">Укажите где</h3>
    <div class="petition__map petition__map_visible" id="petition-map">
    </div>
    <button type="button" class="button petition__address-button">Изменить адрес</button>
    <div class="petition__address">
      <label class="petition__label">
        <p class="petition__input-name">Адрес</p>
        <input type="text" class="petition__input petition__input_type_address" placeholder="Москва"/>
        <input type="hidden" class="petition__input petition__input_type_coordinates"/>
      </label>
      <label class="petition__label">
        <p class="petition__input-name">Комментарий к адресу</p>
        <input type="text" class="petition__input" placeholder="Подъезд 2 / Кв. 1"/>
      </label>
    </div>
  </fieldset>
  <button type="submit" class="button petition__submit petition__submit_disabled" disabled>Подать жалобу</button>
      </form>
   </div>
</div>



     
            
    );
}

export default Complain;