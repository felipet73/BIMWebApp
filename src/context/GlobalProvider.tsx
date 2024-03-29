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

const INITIAL_STATE4 = {
    modeSelect:{ current:false }
}

const INITIAL_STATE5 = {
    modeIssues:{ current:'none' }
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const GlobalProvider = ({children}:Props) => {

    const viewerC = INITIAL_STATE;
    const actualViewables = INITIAL_STATE1;
    const viewerCIFC = INITIAL_STATE2;
    const modeSVF= INITIAL_STATE3;
    const modeSelect= INITIAL_STATE4;
    const modeIssues= INITIAL_STATE5;
    
    return(
        <GlobalContext.Provider value={{
            viewerC, actualViewables, viewerCIFC, modeSVF, modeSelect, modeIssues
        }}>
            {children}
        </GlobalContext.Provider>
    );
}