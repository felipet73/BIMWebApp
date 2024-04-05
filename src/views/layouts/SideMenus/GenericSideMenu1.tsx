import { useState } from 'react';
import { HeaderPosition, OverflowMode, TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { useViewerStore } from '../../../stores';

export interface OptionsMenuInterface {
    headertext:string;
    content:string | (() => JSX.Element);
}

export interface PropsMenuInterface {
    options:OptionsMenuInterface[];
}

const GenericSideMenu1 = ({options=[]}:PropsMenuInterface) => {

    const [overflow, setOverflow] = useState<OverflowMode>("Scrollable");
    const [headerPlacement, setHeaderPlacement] = useState<HeaderPosition>("Top");
    const setModeDetails = useViewerStore(state => state.setModeDetails);
    const setModeDetailsIssues = useViewerStore(state => state.setModeDetailsIssues);
    const setModeDetailsProducts = useViewerStore(state => state.setModeDetailsProducts);
    
    //const [headertext, setHeaderText] = useState<any>([{ text: "Autodesk CC" }, { text: "IFC Repo" }, { text: "SWF Repo" }]);
    
    //let headertext: any;
    /*headertext = [{ text: "Project" }, { text: "Views" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" },
    { text: "" }];*/

    /*useEffect(() => {
        if (type===1){
            setHeaderText([{ text: "Autodesk CC" }, { text: "IFC Repo" }, { text: "SWF Repo" }])
        }

    }, [])*/
    
    console.log('OPTIONNNS',options)

    return (
                        <TabComponent cssClass='responsive-mode' heightAdjustMode='None' height='150px' width='auto' overflowMode={overflow} headerPlacement={headerPlacement} 
                        onClick={(e:any)=>{
                            //console.log('Click en tab component', e.target.innerText)
                            if (e.target.innerText==='Views'){
                            //setOptionV1('ProjectInformation')
                            console.log('Click en Views')
                            //setModeDetails('ProjectViews');
                            }
                        }}
                        > 
                            <TabItemsDirective >
                                {options.map((item:OptionsMenuInterface)=>(<TabItemDirective key={item.headertext} header={{text:item.headertext}} content={item.content} 
                                    
                                />))}
                            </TabItemsDirective>
                        </TabComponent>
    );
}
export default GenericSideMenu1;