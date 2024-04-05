import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import './draggable.css';
import { GlobalContext } from '../../../../context/GlobalContext';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Loading from '../../../layouts/common/Loading';
import TreeFolders from '../../../layouts/Applications/trees/TreeFolders';
import { FolderViewInterface, ViewInterface, useGlobalStore } from '../../../../stores';
import Axios from '../../../../config/axios';
//import { jsPDF } from "jspdf";

interface Props {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewView = ({ status, setStatus }: Props) => {

    const { viewerC } = React.useContext(GlobalContext);
    const textareaObj = useRef<TextBoxComponent>(null);
    const selectedFolderView = useRef<any>(null);
    let animationSettings: AnimationSettingsModel;

    const [img, setImg] = useState<string>('');
    const img1 = useRef<any>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const name1 = useRef<string>('');
    const description1 = useRef<string>('');
    animationSettings = { effect: 'None' };
    const loggedUser = useGlobalStore( state => state.loggedUser);    

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

    /*const buttonClick = (): void => {
        setStatus(true);
    }*/

    const dialogClose = (): void => setStatus(false);

    const saveView = async() => {
        console.log(selectedFolderView.current)
        
        console.log('user logged',loggedUser);
        console.log('isolateds',viewerC.current.getIsolatedNodes())
        
        if (!selectedFolderView.current) {
            return;
        }
        
        let FolderView:FolderViewInterface = selectedFolderView.current.taskData as FolderViewInterface;
        
        
        const formdata = new FormData();
        formdata.append("file", dataURItoBlob(img1.current), "postman-cloud:///1eee0fa4-977f-4c30-b33d-e8784f5171fa");

        try {
            
            let { data } = await Axios.post("upload/single/views", formdata, {headers: {'Content-Type': `multipart/form-data`}})
            console.log(data);

            let NewView:ViewInterface = {
                id:'',
                name:name1.current,
                datecreated:new Date(),
                description:description1.current,
                ids: viewerC.current.getIsolatedNodes(),
                image:data?.fileName,
                type:'default',
                user:loggedUser.id,
                to:[],
            }

            data = await Axios.post("views/", NewView, {headers:{Authorization:`Bearer ${localStorage.getItem("Token3Dev")?.replaceAll('"','')}`}})
            console.log('View ---->>>>>', data.data);

            FolderView = {
                ...FolderView,
                views:[...FolderView.views!.map((x:any)=> x.id ),data.data.id]
            }
            /*let FolderView1 = {
                ...FolderView,
                views:[...FolderView.views!,data.data]
            }*/

            console.log('FolderView to save', FolderView);

            data = await Axios.post("folderviews/update", FolderView, {headers:{Authorization:`Bearer ${localStorage.getItem("Token3Dev")?.replaceAll('"','')}`}})
            console.log('Updated FolderView ---->>>>>', data.data);

            //return;
            //setActualProyect(NewProject as ProjectInterface);
            //setProjects([...projects,NewProject] as ProjectInterface[]);*/
        } catch (error) {
            console.log('Response error catch ', error);
        }
        setStatus(false);

        /*const FolderViewInterface{
            id:string;
            name:string;
            dateCreated:Date;
            descripcion?:string;
            project:string;
            models:string;
            views?:ViewInterface[];
            user:any;
            to?:any[];
        }*/


        //setStatus(false);
        //setDisplay('inline-block');
    }
    const dialogOpen = (): void => {
        setStatus(true);
        //setDisplay('none');
    }

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




        return (
            <>
                <div className='control-pane'>

                    <div className='control-section card-control-section horizontal_card_layout'>
                        <div className="e-card-resize-container">
                            <div className="e-card e-card-horizontal" id="horizontal_product">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <TreeFolders selectedFolderView={selectedFolderView} />
                                </div>
                                <div className='e-card-stacked'>
                                    <div className="e-card-header">
                                        <div className="e-card-header-caption">
                                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                            <TextBoxComponent value={name} name="mane" onChange={onChange} placeholder="Name" floatLabelType="Auto" />
                                            <TextBoxComponent value={description} name="description" onChange={onChangeDes} id='default' multiline={true} floatLabelType={'Auto'} enabled={true} readonly={false} placeholder="Enter description" ref={textareaObj}>
                                            </TextBoxComponent>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px', marginBottom: '15px' }}>
                                <ButtonComponent onClick={saveView} style={{ marginLeft: '50%' }}>Save</ButtonComponent>
                                <ButtonComponent onClick={dialogClose} style={{ marginLeft: '25px' }}>Cancel</ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <DialogComponent id="dialogDraggable" header="Saving new View!!!" isModal={true} showCloseIcon={true} allowDragging={true} animationSettings={animationSettings} width="55vw" target="#root" visible={status} open={dialogOpen} close={dialogClose}
            content={content1}>
            <div className='control-pane' style={{ marginBottom: '-40px' }}>
                <div className='control-section card-control-section horizontal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className="e-card e-card-horizontal" id="horizontal_product">
                            <img src={img} style={{ height: '300px', width: '100%' }} alt="Camera" />
                        </div>
                    </div>
                </div>
            </div>
        </DialogComponent>
    );
}
export default NewView;