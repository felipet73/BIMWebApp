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

const GenericSideMenu = ({options=[]}:PropsMenuInterface) => {

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
        <div className='control-pane'>
            <div className='control-section tab-control-section row'>
                <div className='col-lg-12 control-section'>
                    <div className='e-sample-resize-container'>
                        {/* Render the Tab Component */}
                        <TabComponent cssClass='responsive-mode' heightAdjustMode='None' height='500px' width='auto' overflowMode={overflow} headerPlacement={headerPlacement} 
                        onClick={(e:any)=>{
                            //console.log('Click en tab component', e.target.innerText)
                            if (e.target.innerText==='Views'){
                            //setOptionV1('ProjectInformation')
                            console.log('Click en Views')
                            setModeDetails('ProjectViews');
                            }
                            if (e.target.innerText==='Selections'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Selections')
                                setModeDetails('ProjectSelections');
                            }
                            if (e.target.innerText==='Lists'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Selections')
                                setModeDetails('ProjectLists');
                            }
                            if (e.target.innerText==='Issues'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Issues')
                                setModeDetailsIssues('ProjectIssues');
                            }
                            if (e.target.innerText==='Comments'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Comments')
                                setModeDetailsIssues('ProjectComments');
                            }
                            if (e.target.innerText==='Requirements'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Requirements')
                                setModeDetailsIssues('Requirements');
                            }

                            if (e.target.innerText==='Suppliers'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Requirements')
                                setModeDetailsProducts('ProjectSuppliers');
                            }

                            if (e.target.innerText==='Orders'){
                                //setOptionV1('ProjectInformation')
                                console.log('Click en Requirements')
                                setModeDetailsProducts('ProjectOrders');
                            }

    
                        }}
                        
                        > 
                            <TabItemsDirective >
                                {options.map((item:OptionsMenuInterface)=>(<TabItemDirective key={item.headertext} header={{text:item.headertext}} content={item.content} 
                                    
                                />))}
                            </TabItemsDirective>
                        </TabComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GenericSideMenu;