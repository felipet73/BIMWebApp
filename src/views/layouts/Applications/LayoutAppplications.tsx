import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import GeneratorMenu from '../../CodeGenerator/GeneratorMenu';
import ErpMenu from '../../Erp/ErpMenu';
import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';
import SideOptions from './SideOptions';
import { useGlobalStore, useMenuStore, useOptionModelStore, useViewerIFCStore } from '../../../stores';
import ViewerMenu from '../../viewers/VieverMenu';
//import { dataSource } from './Lists/listData';
import { FileMenuEventArgs, LauncherClickEventArgs } from '@syncfusion/ej2-react-ribbon';
import { MenuBimProjects } from './Menus/MenuBimProjects';
//import { GenericMenu } from './Menus/GenericMenu';
import SideRightOptions from './SideRightOptions';
//import BarChart1 from '../../Erp/Graphics/BarChart1';
import { GlobalContext } from '../../../context/GlobalContext';
//import { CurrentAction } from '@syncfusion/ej2-react-schedule';
//import NewProject from '../../Erp/Modals/bimprojects/NewProject';
import './default.css';
import { IFCContext } from '../../viewers/ViewerIFC/context/ifcviewer/IFCContext';


/*interface Prps {
    option: number;
}*/

const LayoutAppplications = () => {

    const option = useGlobalStore(state => state.option);
    const SetOptionModel = useOptionModelStore(state => state.setOptionModel);
    const [widthVw, setWidthVw] = React.useState(700);
    
    const setOptionModelTipo = useOptionModelStore(state => state.setOptionModelTipo);
    //const [status, setStatus] = React.useState(false);
    //const [loading, setLoading] = React.useState<boolean>(false);
    //const { components } = React.useContext( IFCContext );
    const setResizing = useViewerIFCStore(store => store.setResizing);
    const renderizar = React.useRef(true);
    const setOption = useGlobalStore(state => state.setOption);
    const setSelectedMenu = useGlobalStore(state => state.setSelectedMenu);
    const { viewerC } = React.useContext( GlobalContext );
    let panelR = useRef<SplitterComponent>(null);

    let toastInstance = useRef<ToastComponent>(null);

    /*const fileOptions: MenuItemModel[] = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
        text: "Save as", iconCss: "e-icons e-save", id: "save",
        items: [
            { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
            { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
            { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
    }]*/

    /*const [fileOptions, setFileOptions] = React.useState<MenuItemModel[]>([{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
        text: "Save as", iconCss: "e-icons e-save", id: "save",
        items: [
            { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
            { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
            { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
    }]);*/


    const hPaneContent1 = () => (<div className="splitter-content"><SideOptions /></div>)
    const hPaneContent3 = () => (<div className="splitter-content"><SideRightOptions /></div>)
    
    const hPaneContent2 = () => {
        return (
            <>
                <div className="splitter-content" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                    {option === 'MenuGenerator' && <><GeneratorMenu /></>}
                    {option === 'MenuErp' && <><ErpMenu /></>}
                    {option === 'Viewer' && <>
                        {/* <SplitterComponent separatorSize={4} orientation={'Vertical'} resizeStop={(e) => {
                            }} beforeCollapse={(e) => {
                            }} beforeExpand={(e) => {
                            }}>
                                <PanesDirective>
                                    <PaneDirective size="50%" min="60px" content={ViewerMenu} collapsible={true} />
                                    <PaneDirective size="50%" min="60px" content={()=><h1>Hello</h1>} collapsible={true} />
                                </PanesDirective>
                            </SplitterComponent>  */}
                        <ViewerMenu />
                    </>}
                </div>
                {/* <div style={{ position:'absolute', width: widthVw panelR.current!.paneSettings[1].size, height:'100%'}}>
                {option === 'Viewer' && <><ViewerSc /></>}
            </div> */}
            </>
        );
    };

    const updateContent = (args: any) => {
        toastInstance.current!.show({ content: "Last clicked item is " + args });
        
        if (args === 'File -> New') setSelectedMenu('NewProject');
        if (args === 'File -> Open') setSelectedMenu('OpenProject');
        if (args === 'Viewer -> Autodesk Viewer') setOptionModelTipo('Autodesk');
        if (args === 'Viewer -> IFC Viewer') setOptionModelTipo('IFC');
        if (args === 'View -> Budget excel') SetOptionModel('TableBudget');
        if (args === 'View -> Budget') SetOptionModel('TableBudget1');
        if (args.trim() === 'Graphics -> 3DBar Advance Comparative'.trim()) SetOptionModel('Graphics1');
        if (args === 'Graphics -> TimeLine') SetOptionModel('Graphics2');
        if (args === 'Graphics -> Gr1') SetOptionModel('Graphics3');
        if (args === 'Graphics -> Gr2') SetOptionModel('Graphics4');
        if (args === 'Graphics -> Gr3') SetOptionModel('Graphics5');
        if (args === 'Planning -> Gantt') SetOptionModel('Gantt');
        if (args === 'Planning -> Kanban') SetOptionModel('Kanban1');
        if (args === 'Planning -> Schedulle') SetOptionModel('Schedulle');

        if (args === 'Cut') {
            //setOption('Viewer');
            //renderizar.current = true;
            //setFileOptions([]);
        }
        if (args === 'Copy') {
            //setOption('Viewer');
            //renderizar.current = true;
            //setFileOptions([]);
        }
    }

    const fileSelect = (args: FileMenuEventArgs) => {
        if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
            updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            updateContent("File -> " + args.item.text);
        }
    }

    const launchClick = (args: LauncherClickEventArgs) => {

        updateContent(args.groupId);
        if (args.groupId == "clipboard") {
            updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            updateContent("Header & Footer Launcher Icon");
        }
    }


    useEffect(() => {
        console.log('Panel', panelR.current)
    }, [])


    const ChildPanel = () => {
        return (
            <SplitterComponent ref={panelR} height='100%' width="100%" separatorSize={4} resizeStop={(e) => {
                renderizar.current = false;
                //setWidthVw(e.paneSize[1]);
                console.log(panelR);
                setTimeout(() => {if (viewerC.current) viewerC.current.resize();
                    setResizing(true);
                }, 300);
            }} beforeCollapse={() => {
                setTimeout(() => {if (viewerC.current) viewerC.current.resize();
                    setResizing(true);
                }, 300);
            }} beforeExpand={() => {
                setTimeout(() => {if (viewerC.current) viewerC.current.resize();
                    setResizing(true);
                }, 300);
            }}>
                <PanesDirective>
                    {option==='Viewer' &&
                    <PaneDirective size="15%" min="60px" content={hPaneContent1} collapsible={true} />
                    }
                    <PaneDirective size="70%" min="60px" content={hPaneContent2} collapsible={true} />
                    {option==='Viewer' &&                    
                    <PaneDirective size="15%" min="60px" content={hPaneContent3} collapsible={true} />
                    }
                </PanesDirective>
            </SplitterComponent>

        )
    }


    return (
        <div className='control-pane'>            
            <div className='col-lg-12 control-section default-ribbon-section'>
                <div className='control ribbon-sample'>
                    <div id="default-ribbonContainer" className='default-ribbon-container' style={{ height: '93vh' }}>
                        {option==='Viewer' && <MenuBimProjects updateContent={updateContent} fileSelect={fileSelect} launchClick={launchClick}/>}
                        <div id="default-ribbonPlaceHolder" style={{ height: '80%' }}>
                            <ChildPanel />
                            <ToastComponent id='toast' ref={toastInstance} position={{ X: 'Right' }} width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#default-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        {/* <ListViewComponent id='default-pictureList' dataSource={['Autodesk Viewer', 'IFC Viewer']} showHeader={true} headerTitle="Select Viewer" select={(args: any) => { updateContent("Viewer -> " + args.text); }}></ListViewComponent> */}
                    </div>

                </div>
            </div>
        </div>
    );
}
export default LayoutAppplications;