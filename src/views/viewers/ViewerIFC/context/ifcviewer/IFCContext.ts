/* eslint import/no-webpack-loader-syntax: off */

import { createContext } from 'react';


interface IFCContextProps {
    //isMapReady: boolean;
    viewer?: any,
    container?: any,
    components?:any,
    scene?:any,
    fragments?: any,
    fragmentIfcLoader?: any,
    mainToolbar?:any,

    // Methods
    init: (container: HTMLDivElement) => void;
    setViewer: (viewer: any) => void;
    setContainer?: (container: any) => void;
    setComponents?: (components: any) => void;
    //getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>;
}



export const IFCContext = createContext({} as IFCContextProps );