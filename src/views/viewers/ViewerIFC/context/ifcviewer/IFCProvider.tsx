/* eslint import/no-webpack-loader-syntax: off */
import * as THREE from 'three';
import * as OBC from 'openbim-components';
import { useViewerIFCStore } from '../../../../../stores';
import { useContext, useEffect, useReducer } from 'react';

//@ts-ignore
import { IFCContext } from './IFCContext';
import { ifcReducer } from './ifcReducer';

//import { directionsApi } from '../../apis';
//import { DirectionsResponse } from '../../interfaces/directions';



export interface IFCState {
    //isMapReady: boolean;
    viewer?: any;
    container?: any;
    components?:any;
    scene?:any;
    fragments?: OBC.FragmentManager | null;
    fragmentIfcLoader?:OBC.FragmentIfcLoader | null;
    mainToolbar?:OBC.Toolbar|null;
}

const INITIAL_STATE: IFCState = {
    //isMapReady: false,
    viewer: undefined,
    container: null,
    components:null,
    scene:null,
    fragments: null,
    fragmentIfcLoader: null,
    mainToolbar:null,
    //markers: [],
}

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const IFCProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( ifcReducer, INITIAL_STATE );
    const selectedModels = useViewerIFCStore(store => store.selectedModels);

    useEffect(() => {
        
        /*state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name_es }</p>
                `);
            
            const newMarker = new Marker()
                .setPopup( popup )
                .setLngLat([ lng, lat ])
                .addTo( state.map! );
            
            newMarkers.push( newMarker );
        }

        // Todo: limpiar polyline

        dispatch({ type: 'setMarkers', payload: newMarkers });*/
        
    }, [ ])


    const init = ( container: HTMLDivElement ) => {

        const components:any = new OBC.Components();
        console.log('COMPONENTS',components);
        //state.components
        //const fragments: OBC.Fragments;
        components.scene = new OBC.SimpleScene(components);
        //components.renderer = new OBC.SimpleRenderer(components, container);
        components.renderer = new OBC.PostproductionRenderer(components, container);
        //components.renderer.postproduction.enabled = true;
        components.camera = new OBC.SimpleCamera(components);
        components.raycaster = new OBC.SimpleRaycaster(components);        
        components.init();
        const scene = components.scene.get();
        components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
        const grid = new OBC.SimpleGrid(components);
        components.renderer.postproduction.enabled = true;
        /*const boxMaterial = new THREE.MeshStandardMaterial({ color: '#6528D7' });
        const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
        const cube = new THREE.Mesh(boxGeometry, boxMaterial);
        cube.position.set(0, 1.5, 0);
        scene.add(cube); */

        components.scene?.setup();
        
        let fragments = new OBC.FragmentManager(components);
        let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);        
        
        const mainToolbar = new OBC.Toolbar(components, {name: 'Main Toolbar', position: 'bottom'});
        const charg= (async()=>{
            components.ui.addToolbar(mainToolbar);
            const ifcButton = fragmentIfcLoader.uiElement.get("main");
            mainToolbar.addChild(ifcButton as any);
            await fragmentIfcLoader.setup()    
        })()

        const loadFragments = async () => {
            if(fragments.groups.length) return;
            const file = await fetch("/small.frag");
            const data = await file.arrayBuffer();
            const buffer = new Uint8Array(data);
            const group = await fragments.load(buffer);
            fragments.load(buffer);    
            }
            const loadButton = new OBC.Button(components);
            loadButton.materialIcon = "download";
            loadButton.tooltip = "Load model";
            mainToolbar.addChild(loadButton);
            loadButton.onClick.add(() => loadFragments())

            function importExternalFragment() {
                if(fragments.groups.length) return;
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = async () => {
                if (input && input.files && input.files.length>0){
                const file = input.files[0];
                if(file.name.includes(".frag")) {
                    const url = URL.createObjectURL(file);
                    const result = await fetch(url);
                    const data = await result.arrayBuffer();
                    const buffer = new Uint8Array(data);
                    fragments.load(buffer);
                    //console.log(buffer)
                    }
                }
                input.remove();
                }
                input.click();
                }
                const openButton = new OBC.Button(components);
                openButton.materialIcon = "folder_open";
                openButton.tooltip = "Import model";
                mainToolbar.addChild(openButton);
                openButton.onClick.add(() => importExternalFragment());
                
                function disposeFragments() {
                    fragments.dispose();
                    }
                    const disposeButton = new OBC.Button(components);
                    disposeButton.materialIcon = "delete";
                    disposeButton.tooltip = "Delete model";
                    mainToolbar.addChild(disposeButton);
                    disposeButton.onClick.add(() => disposeFragments());

                if (selectedModels!==null){
                    (async()=>{
                        if(fragments.groups.length) return;
                        const buffer = new Uint8Array(selectedModels);
                        const group = await fragments.load(buffer);
                        console.log(buffer)
                        fragments.load(buffer); 
                    })();
                }   
                dispatch({ type: 'setComponents', payload: {components, container, scene, fragments, fragmentIfcLoader, mainToolbar } })
    }

    const setViewer = ( viewer: any ) => {

        /*const myLocationPopup = new Popup()
            .setHTML(`
            <h4>Aquí estoy</h4>
            <p>En algún lugar del mundo</p>
        `);

        new Marker({
            color: '#61DAFB'
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map );*/


        dispatch({ type: 'setViewer', payload: viewer })

    }


    /*const getRouteBetweenPoints = async(start: [number, number], end: [number, number] ) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100;

        const minutes = Math.floor( duration / 60 );
        console.log({ kms, minutes });

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords ) {
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 200
        });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData );

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })


        
    }*/


    return (
        <IFCContext.Provider value={{
            ...state,

            // Methods
            setViewer,
            init,
            
        }}>
            { children }
        </IFCContext.Provider>
    )
}


