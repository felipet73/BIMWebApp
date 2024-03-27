/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useLayoutEffect, useRef } from 'react';
import { RadialSettingsModel, SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-react-buttons';


//@ts-ignore
import { Map } from '!mapbox-gl';

import { PlacesContext, MapContext } from '../context';
import { Loading } from './';

const items: SpeedDialItemModel[] = [
    {
        title: 'Cut',
        iconCss: 'speeddial-icons speeddial-icon-cut'
    },
    {
        title: 'Copy',
        iconCss: 'speeddial-icons speeddial-icon-copy'
    },
    {
        title: 'Paste',
        iconCss: 'speeddial-icons speeddial-icon-paste'
    },
    {
        title: 'Delete',
        iconCss: 'speeddial-icons speeddial-icon-delete'
    }
];

const radialSetting: RadialSettingsModel = { offset: '70px' };
const radialSetting1: RadialSettingsModel = { offset: '110px' };

export const MapView = () => {

    const { isLoading, userLocation } = useContext( PlacesContext );
    const { setMap } = useContext( MapContext)

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if ( !isLoading ) {
            const map = new Map({
                container: mapDiv.current! , // container ID
                style: 'mapbox://styles/mapbox/light-v10', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 14 // starting zoom
            });

            setMap( map );
        }
    }, [ isLoading ])


    if ( isLoading ) {
        return ( <Loading /> )
    }


    return (
        <>
        <div ref={ mapDiv }
            style={{
                height: '70vh',
                left: 0,
                top: 0,
                width: '100%',
            }}
        >
            { userLocation?.join(',') }
        </div>
        <SpeedDialComponent openIconCss='speeddial-icons speeddial-icon-edit' cssClass="e-success" target='#speeddialtarget' title='Bottom Right' position='BottomRight' radialSettings={radialSetting1} mode='Radial' items={items}></SpeedDialComponent>
        </>
    )
}
