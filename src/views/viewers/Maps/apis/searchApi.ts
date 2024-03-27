import axios from 'axios';


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiZmVsaXBldDczIiwiYSI6ImNra2Zzb3U2czA2b24ycXBkenFheDc2b2MifQ.Ozz_Ac3fOyCfTgjofz04wQ'
    }
})


export default searchApi;