import { useState } from 'react';
import { HeaderPosition, OverflowMode, TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import ViewerHome from './ViewerHome';
import UsersHome from './Tabs/UsersHome';
import ProjectMenu from './Tabs/ProjectOptions/ProjectMenu';
import TableBadget2 from '../Erp/Tables/TableBadget2';
import NewDocument from './Tabs/DocumentOptions/NewDocument';
import ListItems1 from '../layouts/Applications/Lists/ListItems1';
import { useBimProjectsStore } from '../../stores';
import { UbicationsMaps } from './Maps/UbicationsMaps';

const ViewerMenu = () => {

    const [overflow, setOverflow] = useState<OverflowMode>("Scrollable");
    const [headerPlacement, setHeaderPlacement] = useState<HeaderPosition>("Top");
    const setOptionV1 = useBimProjectsStore(state => state.setOptionV1);
    
    let headertext: any;
    // Mapping Tab items Header property
    headertext = [{ text: "ModelWorkSpace" }, { text: "ProjectInformation" }, { text: "BudgetAndSchedulling" }, { text: "Documents" }, { text: "Users" }, { text: "Products&Specifications" }, { text: "Issues&Comments" },
    { text: "Ubications" }];
    return (
        <div className='control-pane'>
            <div className='control-section tab-control-section row'>
                <div className='col-lg-12 control-section'>
                    <div className='e-sample-resize-container'>
                        {/* Render the Tab Component */}
                        <TabComponent cssClass='responsive-mode' heightAdjustMode='None' height='78vh' width='auto' overflowMode={overflow} headerPlacement={headerPlacement} 
                          onClick={(e:any)=>{
                            //console.log(e)
                            if (e.target.innerText==='ProjectInformation'){
                                setOptionV1('ProjectInformation')
                                console.log('ProjectInformation')
                            }
                            if (e.target.innerText==='ModelWorkSpace'){
                                setOptionV1('Home')
                                console.log('Homwe')
                            }

                        }}
                         > 
                            <TabItemsDirective >
                                <TabItemDirective header={headertext[0] }
                                    content={ViewerHome} />

                                <TabItemDirective header={headertext[1]}
                                    content={ProjectMenu} />

                                <TabItemDirective header={headertext[2]}
                                    content={TableBadget2} />

                                <TabItemDirective header={headertext[3]}
                                    content={NewDocument} />

                                <TabItemDirective header={headertext[4]}
                                    content={UsersHome} />

                                <TabItemDirective header={headertext[5]}
                                    content={ListItems1} />

                                <TabItemDirective header={headertext[6]}
                                    content={'The ASP.NET MVC is a web application framework developed by Microsoft, which implements' +
                                        ' the model–view–controller (MVC) pattern. It is open-source software, apart from the ASP.NET Web ' +
                                        'Forms component which is proprietary. In the later versions of ASP.NET, ASP.NET MVC, ASP.NET Web ' +
                                        'API, and ASP.NET Web Pages (a platform using only Razor pages) will merge into a unified MVC 6. ' +
                                        'The project is called ASP.NET vNext.'} />

                                <TabItemDirective header={headertext[7]}
                                    content={UbicationsMaps} />
                            </TabItemsDirective>
                        </TabComponent>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default ViewerMenu;