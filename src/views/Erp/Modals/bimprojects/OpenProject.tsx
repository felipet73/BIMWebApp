import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
//import { GlobalContext } from '../../../../context/GlobalContext';
//import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import TreeFileProjects from '../../../layouts/Applications/trees/TreeFileProjects';
import { ProjectInterface, useBimProjectsStore } from '../../../../stores';
import './draggable.css';

interface Props {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenProject = ({ status, setStatus }: Props) => {

    //const { viewerC } = React.useContext(GlobalContext);
    //const textareaObj = useRef<TextBoxComponent>(null);
    const [selected, setSelected] = React.useState<any>({});
    const setActualProject = useBimProjectsStore(store=> store.setActualProject);
    const dataProjects = useBimProjectsStore(store=> store.projects);
    let animationSettings: AnimationSettingsModel;
    const projectSel = useRef<any>([]);
    //const setActualProject = useBimProjectsStore(store=> store.setActualProject);            
    //let buttonEle: HTMLButtonElement;
    //const [status, setStatus] = useState<boolean>(true);
    //const [display, setDisplay] = useState<string>('none');

    //const [img, setImg] = useState<string>('');

    animationSettings = { effect: 'None' };

    /*const buttonClick = (): void => {
        setStatus(true);
    }*/

    
    const selectProject = (): void => {
        console.log(projectSel)
        //return;
        //const actu:any = projects.current.find((x:any) => x.id===selected?.nodeId);
        //console.log(actu)
        //setProjects([...projects.current]);
        //setActualProject(actu);
        const act = dataProjects.find ( (x:any) => x.id === projectSel.current?.nodeId );
        setActualProject( act! as ProjectInterface );

        /*setActualProject({
            id:selected?.nodeId,
            name:selected?.nodeText,
            dateCreated: new Date(),
            descripcion:'',
            image:'',
            models: []
        })*/
        setStatus(false);
        //setDisplay('inline-block');
    }

    const dialogClose = (): void => {
        setStatus(false);
        //setDisplay('inline-block');
    }
    const dialogOpen = (): void => {
        setStatus(true);
        //setDisplay('none');
    }

    useLayoutEffect(() => {
        /*if (loading){
            setTimeout(() => {
                const img = viewerC.current.canvas.toDataURL('image/png')
                setImg(img);    
                setLoading(false);
            }, 6000);
        }else{
            const img = viewerC.current.canvas.toDataURL('image/png')
            setImg(img);                        
        }*/
        //window.location = viewerC.current.canvas.toDataURL('image/png')
        //document.write('<img src="'+img+'"/>');
    }, [])


    const content1 = () => {
        return(
            <>
            <div className='control-pane'>
                <div className='control-section card-control-section horizontal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className="e-card e-card-horizontal" id="horizontal_product">
                            <div className='e-card-stacked'>
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                        <TreeFileProjects setSelected={setSelected} projectSel={projectSel} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <ButtonComponent onClick={selectProject} style={{ marginLeft: '50%' }}>Open</ButtonComponent>
                            <ButtonComponent onClick={dialogClose} style={{ marginLeft: '25px' }}>Cancel</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }


    return (
        <DialogComponent id="dialogDraggable" header="Open Project!!!" isModal={true} showCloseIcon={true} allowDragging={true} animationSettings={animationSettings} width="450px" target="#root" visible={status} open={dialogOpen} close={dialogClose}
        content={content1}
        >
                <div className='control-pane' style={{ marginBottom: '-40px' }}>
                <div className='control-section card-control-section horizontal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className="e-card e-card-horizontal" id="horizontal_product">
                            {(selected && selected?.icon==='project') ? selected?.nodeText:'No selected'}
                        </div>
                    </div>
                </div>
                </div>

            {/*loading &&
                <div className='control-pane' style={{ marginBottom: '-40px' }}>
                <div className='control-section card-control-section horizontal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className="e-card e-card-horizontal" id="horizontal_product">
                            <Loading/>
                        </div>
                    </div>
                </div>
                </div>
    */}

        </DialogComponent>
    );
}
export default OpenProject;