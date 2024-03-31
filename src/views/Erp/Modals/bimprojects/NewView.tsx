import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import './draggable.css';
import { GlobalContext } from '../../../../context/GlobalContext';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Loading from '../../../layouts/common/Loading';
import TreeFolders from '../../../layouts/Applications/trees/TreeFolders';
//import { jsPDF } from "jspdf";

interface Props {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewView = ({ status, setStatus }: Props) => {

    const { viewerC } = React.useContext(GlobalContext);
    const textareaObj = useRef<TextBoxComponent>(null);

    let animationSettings: AnimationSettingsModel;
    //let buttonEle: HTMLButtonElement;
    //const [status, setStatus] = useState<boolean>(true);
    //const [display, setDisplay] = useState<string>('none');

    const [img, setImg] = useState<string>('');

    animationSettings = { effect: 'None' };

    const buttonClick = (): void => {
        setStatus(true);
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
            const img = viewerC.current.canvas.toDataURL('image/png')
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
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                            <TreeFolders/>
                                        </div>

                            <div className='e-card-stacked'>
                                <div className="e-card-header">
                                    <div className="e-card-header-caption">
                                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">

                                            <TextBoxComponent placeholder="Name" floatLabelType="Auto" />
                                            <TextBoxComponent id='default' multiline={true} floatLabelType={'Auto'} enabled={true} readonly={false} placeholder="Enter description" ref={textareaObj}>
                                            </TextBoxComponent>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <ButtonComponent onClick={() => {dialogClose() }} style={{ marginLeft: '50%' }}>Save</ButtonComponent>
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
                            <img src={img} style={{ height: '100%', width: '100%' }} alt="Camera" />
                        </div>
                    </div>
                </div>
                </div>
        </DialogComponent>
    );
}
export default NewView;