import { RefObject, useRef } from 'react';
import { GlobalContext } from './GlobalContext';


/*export interface GlobalState {
    viewerC:RefObject<Autodesk.Viewing.GuiViewer3D | null>
}*/

const INITIAL_STATE = {
    viewerC:{ current:null }
}
const INITIAL_STATE1 = {
    actualViewables:{ current:[] }
}

const INITIAL_STATE2 = {
    viewerCIFC:{ current:null }
}

const INITIAL_STATE3 = {
    modeSVF:{ current:false }
}


interface Props {
    children: JSX.Element | JSX.Element[];
}

export const GlobalProvider = ({children}:Props) => {

    const viewerC = INITIAL_STATE;
    const actualViewables = INITIAL_STATE1;
    const viewerCIFC = INITIAL_STATE2;
    const modeSVF= INITIAL_STATE3;
    
    return(
        <GlobalContext.Provider value={{
            viewerC, actualViewables, viewerCIFC, modeSVF
        }}>
            {children}
        </GlobalContext.Provider>
    );
}