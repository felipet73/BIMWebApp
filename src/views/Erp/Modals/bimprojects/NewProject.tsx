import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import './draggable.css';
import { GlobalContext } from '../../../../context/GlobalContext';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Loading from '../../../layouts/common/Loading';
import Axios from '../../../../config/axios';
import { ProjectInterface, useBimProjectsStore } from '../../../../stores';
//import { jsPDF } from "jspdf";

interface Props {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProject = ({ status, setStatus }: Props) => {

    const { viewerC } = React.useContext(GlobalContext);
    const textareaObj = useRef<TextBoxComponent>(null);
    let animationSettings: AnimationSettingsModel;
    const setActualProyect = useBimProjectsStore(store=> store.setActualProject);
    const setProjects = useBimProjectsStore(store => store.setProjects);
    const projects = useBimProjectsStore(store => store.projects);
    //let buttonEle: HTMLButtonElement;
    //const [status, setStatus] = useState<boolean>(true);
    //const [display, setDisplay] = useState<string>('none');
    const [img, setImg] = useState<string>('');
    const img1 = useRef<any>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const name1 = useRef<string>('');
    const description1 = useRef<string>('');
    animationSettings = { effect: 'None' };
    
    const onChange = (e:any)=>{
        setName(e.target.value);
        name1.current=e.target.value;
        //console.log(e.target.value)
    }
    const onChangeDes = (e:any)=>{
        setDescription(e.target.value);
        description1.current=e.target.value;
        //console.log(e.target.value)
    }

    function dataURItoBlob(dataURI:any) {
        if(typeof dataURI !== 'string'){
            throw new Error('Invalid argument: dataURI must be a string');
        }
        dataURI = dataURI.split(',');
        var type = dataURI[0].split(':')[1].split(';')[0],
            byteString = atob(dataURI[1]),
            byteStringLength = byteString.length,
            arrayBuffer = new ArrayBuffer(byteStringLength),
            intArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteStringLength; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], {
            type: type
        });
    }

    const saveModel= async ()=> {
        console.log('name', name1.current)
        console.log('description', description1.current)
        
        if (name1.current===''){
            return;
        }
        
        const formdata = new FormData();
        formdata.append("file", dataURItoBlob(img1.current), "postman-cloud:///1eee0fa4-977f-4c30-b33d-e8784f5171fa");

        try {
            
            let { data } = await Axios.post("upload/single/projects", formdata, {headers: {'Content-Type': `multipart/form-data`}})
            console.log(data);

            const NewProject:any={
                name:name1.current,
                dateCreated:new Date(),
                description:description1.current,
                image:data?.fileName,
                models:[]
            }

            data = await Axios.post("projects/", NewProject, {headers:{Authorization:`Bearer ${localStorage.getItem("Token3Dev")?.replaceAll('"','')}`}})
            console.log('Model', data.data);
            //let NProy:any;
            //let NProy1:any;
            
            /*if (actualProyect && actualProyect?.models?.length!>0){
                NProy = {
                    ...actualProyect,
                    models:[...actualProyect?.models!.map((dt:any)=>dt.id)!,data.data.id]
                }
                NProy1 = {
                    ...actualProyect,
                    models:[...actualProyect?.models!,data.data]
                }
    
            }else{
                NProy = {
                    ...actualProyect,
                    models:[data.data.id]
                }
                NProy1 = {
                    ...actualProyect,
                    models:[data.data]
                }                
            }*/
            //setViewables([...viewables,{ ModelId:data.data.id, Viewables: tree}]);
            //data = await Axios.post("projects/update", NProy, {headers:{Authorization:`Bearer ${localStorage.getItem("Token3Dev")?.replaceAll('"','')}`}})
            //console.log('Project update', data.data);
            setActualProyect(NewProject as ProjectInterface);
            setProjects([...projects,NewProject] as ProjectInterface[]);
        } catch (error) {
            console.log('Response error catch ', error);
        }
        setStatus(false);
    }


    /*const buttonClick = (): void => {
        setStatus(true);
    }*/
    const dialogClose = (): void => setStatus(false);
    const dialogOpen = (): void => setStatus(true);

    useLayoutEffect(() => {
        const img = viewerC.current.canvas.toDataURL('image/png')
        img1.current=img;
        setImg(img);                        
        //var imgData = canvas.toDataURL('image/png');              
        //var doc = new jsPDF('p', 'mm');
        //doc.addImage(img, 'PNG', 10, 10);
        //doc.save('sample-file.pdf');
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
                                            <TextBoxComponent value={name} name="mane" onChange={onChange} placeholder="Name" floatLabelType="Auto" />
                                            <TextBoxComponent value={description} name="description" onChange={onChangeDes} id='default' multiline={true} floatLabelType={'Auto'} enabled={true} readonly={false} placeholder="Enter description" ref={textareaObj}>
                                            </TextBoxComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <ButtonComponent onClick={saveModel} style={{ marginLeft: '50%' }}>Save</ButtonComponent>
                            <ButtonComponent onClick={dialogClose} style={{ marginLeft: '25px' }}>Cancel</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }


    return (
        <DialogComponent id="dialogDraggable" header="Adding new Project!!!" isModal={true} showCloseIcon={true} allowDragging={true} animationSettings={animationSettings} width="450px" target="#root" visible={status} open={dialogOpen} close={dialogClose}
        content={content1}
        >
                <div className='control-pane' style={{ marginBottom: '-40px' }}>
                <div className='control-section card-control-section horizontal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className="e-card e-card-horizontal" id="horizontal_product">
                            <img src={img} style={{ height: '100%', width: '100%' }} alt="Camera" />
                        </div>
                    </div>
                </div>
                </div>
        </DialogComponent>
    );
}
export default NewProject;