
/* eslint import/no-webpack-loader-syntax: off */

import { MapsApp } from './MapsApp';

//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

 
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBldDczIiwiYSI6ImNra2Zzb3U2czA2b24ycXBkenFheDc2b2MifQ.Ozz_Ac3fOyCfTgjofz04wQ';


if ( !navigator.geolocation ) {
  alert( 'Tu navegador no tiene opción de Geolocation' );
  throw new Error('Tu navegador no tiene opción de Geolocation');
}


export const UbicationsMaps = () => {
    return (
        <MapsApp />
        )
}

