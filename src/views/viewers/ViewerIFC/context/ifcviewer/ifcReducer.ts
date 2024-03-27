/* eslint import/no-webpack-loader-syntax: off */

import { IFCState } from './IFCProvider';


type IFCAction = 
| { type: 'setViewer', payload: any }
| { type: 'setContainer', payload: any }
| { type: 'setComponents', payload: any }

export const ifcReducer = ( state: IFCState, action: IFCAction ):IFCState => {

    switch ( action.type ) {
        case 'setViewer':
            return {
                ...state,
                //isMapReady: true,
                viewer: action.payload
            }    
        
        case 'setComponents':
            return {
                ...state,
                components: action.payload.components,
                scene: action.payload.scene,
                fragments: action.payload.fragments,
                fragmentIfcLoader: action.payload.fragmentIfcLoader,
                mainToolbar: action.payload.mainToolbar,
            }

        default:
            return state;
    }

}