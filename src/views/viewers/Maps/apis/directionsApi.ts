import axios from 'axios';


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZmVsaXBldDczIiwiYSI6ImNra2Zzb3U2czA2b24ycXBkenFheDc2b2MifQ.Ozz_Ac3fOyCfTgjofz04wQ'
    }
})


export default directionsApi;