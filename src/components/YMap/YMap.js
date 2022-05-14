import React, { useState } from "react";
import { YMaps, Map, ZoomControl, FullscreenControl, SearchControl, GeolocationControl, Placemark } from "react-yandex-maps";

function YMap({updateAddress} ) {

    const [mapState, setMapState] = useState({ center: [55.75, 37.57], zoom: 9 });
    const [coordinates, setCoordsState] = useState([]);
    const [coordString, setCoordString] =  useState("55.75, 37.57");
    const [userAdr, setUserAdr] = useState("");

    function search() {               
        return fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=15e586b6-9e0e-4163-b84e-6eaec1f97d60&geocode=${coordString}`);
    }    
    
    const onMapClick = (e) => {
        const coords = e.get("coords");
        setCoordsState(coords);
        setCoordString(coordinates[1] +','+ coordinates[0]);
        
        if(coordString){
            search()
            .then((res) => {
                if (res.ok) { return res.json(); }            
                return Promise.reject(res.status);
            })
            .then((res) => {
                let str = res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text; 
                () => updateAddress(str);                  
            })
            .catch((err) => {
                alert(err);
            })
        }
        
    };

    return (
        <div>
             <YMaps query={{ apikey: "" }}>
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
        </div>
    )
}
export default YMap;