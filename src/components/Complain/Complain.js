import React, { useState, useEffect } from 'react';
import './Complain.css';
import Header from '../Header/Header';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { YMaps, Map, ZoomControl, FullscreenControl, SearchControl, GeolocationControl, Placemark } from "react-yandex-maps";
import { backender } from "../../backend-demo/backender";


function Complain(props) {

   const [address, setAddress] = useState('Москва');
   const [mapState, setMapState] = useState({ center: [55.75, 37.57], zoom: 9 });
   const [coordinates, setCoordsState] = useState([55.75, 37.57]);
   let coordString = "";

   function search() {
      return fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=15e586b6-9e0e-4163-b84e-6eaec1f97d60&geocode=${coordString}`);
   }

   useEffect(() => {
      coordString = coordinates[1] + ',' + coordinates[0];
      search()
         .then((res) => {
            if (res.ok) { return res.json(); }
            return Promise.reject(res.status);
         })
         .then((res) => {
            setAddress(res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text);
         })
         .catch((err) => {
            alert(err);
         })
   }, [coordinates])

   const onMapClick = (e) => {
      const coords = e.get("coords");
      setMapState({ center: coords })
      setCoordsState(coords);
   };

   const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
   const SignupSchema = Yup.object().shape({
      text: Yup.string().typeError('Что-то пошло не так').min(20, "Пишите...").required('Обязательно'),
      name: Yup.string().typeError('Должно быть строкой').min(2, "Не менее 2-х знаков").max(50, "Не более 50-ти знаков").required('Обязательно'),
      email: Yup.string().email('Введите верный email').required('Обязательно'),
      phone: Yup.string().matches(phoneRegExp, 'Не соответствует формату').required('Обязательно'),
      address: Yup.string().typeError('Должно быть строкой').min(2, "Не менее 2-х знаков"),
      addressComent: Yup.string().typeError('Должно быть строкой').min(2, "Не менее 2-х знаков")
   });

   return (
      <div className="section">
         <Header title="Жалоба" />
         <div className="petition">
            <Formik
               initialValues={{
                  text: (props.location.data || "Вставьте или напишите ваше стихотворение"),
                  name: '',
                  email: '',
                  phone: '',
                  toggle1: false,
                  toggle2: true,
                  address: "Москва",
                  addressComent: ''
               }}
               validateOnBlur
               onSubmit={(values) => {
                  const petiton = {
                     "TEXT": values.text,
                     POET: 'POET',                 // поэт
                     AUTHOR_NAME: values.name,     // имя автора жалобы
                     AUTHOR_EMAIL: values.email,      // емейл автора жалобы
                     AUTHOR_TEL: values.phone,   // телефон автора жалобы
                     ADDRESS: values.address,// адрес
                     ADDRESS_EXTENDED: values.addressComent,    // комментарий к адресу
                     ADDRESS_COORDINATES: '55.75916251059246,37.62138180426003', // координаты
                     PUBLIC: (values.toggle1 ? 'Y' : 'N')
                  }
                  backender.savePetition(petiton, function (result) {
                     if(result.STATUS === 'OK') alert ("Ваша жалоба отправлена");
                     // в консоли будет что-то типа такого
                     // {STATUS: "OK", MESSAGE: "Жалоба сохранена.", DATA: ""}
                     // то есть если статус = OK, значит жалоба успешно сохранена
                     // если при сохранении возникнет какая-то ошибка, в статусе будет значение NEOK
                     // а в поле MESSAGE будет комментарий к ошибке (например, что не заполнено какое-то обязательное поле)
                 });


               }}
               validationSchema={SignupSchema}
            >
               {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                  <Form className={'petition__form'}>
                     <fieldset className="petition__fieldset">
                        <textarea
                           type={"textarea"}
                           name={"text"}
                           className="petition__poem-text"
                           placeholder="Вставьте или напишите ваше стихотворение"
                           onChange={handleChange}
                           value={values.text}
                           onBlur={handleBlur}
                        />
                        {touched.text && errors.text && <span style={{ opacity: 1 }} className="petition__input-error">{errors.text}</span>}
                        <span id="name-input-error" className="petition__input-error">Какая-то ошибка*</span>
                        <h3 className="petition__fieldset-heading">От кого:</h3>
                        <label className="petition__label"><p className="petition__input-name">Имя</p>
                           <input
                              type={"text"}
                              onChange={handleChange}
                              value={values.name}
                              onBlur={handleBlur}
                              name={"name"}
                              className="petition__input"
                              placeholder="Ваше имя"
                           />
                           {touched.name && errors.name && <span style={{ opacity: 1 }} className="petition__input-error">{errors.name}</span>}
                           <span id="name-input-error" className="petition__input-error">Какая-то ошибка*</span>
                        </label>
                        <label className="petition__label">
                           <p className="petition__input-name">E-mail</p>
                           <input
                              type={"email"}
                              name={"email"}
                              className="petition__input"
                              placeholder="example@mail.ru"
                              value={values.email}
                              onChange={handleChange}
                              value={values.email}
                              onBlur={handleBlur}
                           />
                           {touched.email && errors.email && <span style={{ opacity: 1 }} className="petition__input-error">{errors.email}</span>}
                           <span id="email-input-error" className="petition__input-error">Какая-то ошибка*</span>
                        </label>
                        <label className="petition__label">
                           <p className="petition__input-name">Номер телефона</p>
                           <input
                              type={"tel"}
                              name={"phone"}
                              className="petition__input"
                              placeholder="+7 (123) 123-45-67"
                              onChange={handleChange}
                              value={values.phone}
                              onBlur={handleBlur}
                           />
                           {touched.phone && errors.phone && <span style={{ opacity: 1 }} className="petition__input-error">{errors.phone}</span>}
                           <span id="tel-input-error" className="petition__input-error">Какая-то ошибка*</span>
                        </label>
                     </fieldset>

                     <fieldset className="petition__fieldset">
                        <h3 className="petition__fieldset-heading">Показать вашу жалобу?</h3>
                        <label className="petition__label-radio">
                           <input
                              type={"radio"}
                              name={"public"}
                              className="petition__radio"
                              value={values.toggle1}
                           />
                           <p className="petition__radio-name">Пусть увидят все</p>
                        </label>
                        <label className="petition__label-radio">
                           <input
                              type={"radio"}
                              name={"public"}
                              className="petition__radio"
                              value={values.toggle2}
                              checked
                           />
                           <p className="petition__radio-name">Никому не показывать</p>
                        </label>
                     </fieldset>

                     <fieldset className="petition__fieldset">
                        <h3 className="petition__fieldset-heading">Укажите где</h3>


                        <YMaps query={{ apikey: "" }} >
                           <Map
                              modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                              onClick={onMapClick}
                              state={mapState}
                              width='100%'
                              height='500px'
                           >
                              {coordinates ? <Placemark geometry={coordinates} /> : null}
                              <ZoomControl />
                              <FullscreenControl />
                              <SearchControl />
                              <GeolocationControl />
                           </Map>
                        </YMaps>
                        <div className="petition__address">
                           <label className="petition__label">
                              <p className="petition__input-name">Адрес</p>
                              <textarea
                                 type={"text"}
                                 onChange={handleChange}
                                 value={values.address = address}
                                 onBlur={handleBlur}
                                 name={"address"}
                                 class="petition__input petition__input_type_address"
                                 placeholder="Москва"
                              />

                              {touched.address && errors.address && <span style={{ opacity: 1 }} className="petition__input-error">{errors.address}</span>}
                              <span id="address-input-error" className="petition__input-error">Какая-то ошибка*</span>

                           </label>
                           <label className="petition__label">
                              <p className="petition__input-name">Комментарий к адресу</p>
                              <input
                                 type={"text"}
                                 onChange={handleChange}
                                 value={values.addressComent}
                                 onBlur={handleBlur}
                                 name={"addressComent"}
                                 class="petition__input"
                                 placeholder="Подъезд 2 / Кв. 1" />
                              {touched.addressComent && errors.addressComent && <span style={{ opacity: 1 }} className="petition__input-error">{errors.address}</span>}
                              <span id="addressComent-input-error" className="petition__input-error">Какая-то ошибка*</span>
                           </label>
                        </div>
                     </fieldset>
                     <button
                        className={(!isValid || !dirty) ? "petition__submit petition__submit_disabled" : "petition__submit"}
                        disabled={!isValid || !dirty}
                        onClick={handleSubmit}
                        type={<code>submit</code>}
                     >Отправить жалобу</button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>

   );
}

export default Complain;