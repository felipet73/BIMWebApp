/**
 * TREE WITH THE LIST OF THE PROJECT MODELS
 */

import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { useBimProjectsStore, useGlobalStore } from '../../../../stores';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import TreeModelDetail from './TreeModelDetail';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import NewProject from '../../../Erp/Modals/bimprojects/NewProject';
import OpenProject from '../../../Erp/Modals/bimprojects/OpenProject';
import { encode as base64_encode} from 'base-64';
import './icons.css';
//import Logo from '/assets/svg/oops.svg';

const items: ItemModel[] = [
    {
        text: 'View-Open',
        iconCss: 'e-ddb-icons e-dashboard'
    },
    {
        text: 'Add to Project',
        iconCss: 'e-ddb-icons e-notifications',
    },
    {
        text: 'Copy',
        iconCss: 'e-ddb-icons e-settings',
    },
    {
        text: 'Info',
        iconCss: 'e-ddb-icons e-logout'
    }];


export const AnyProject = () => {
    const setSelectedMenu = useGlobalStore(state => state.setSelectedMenu);
    return (
        <div className='control-pane'>
            <div className='control-section card-control-section flip_card_layout'>
                <div className="e-card-resize-container">
                    <div className='row'>
                        <div className="row card-layout">
                            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                                <div className={''} id="card_flip_profile" onClick={() => { }} title="Click to flip the Card">
                                    <div className="e-card-header e-back">
                                        <img src={'/assets/svg/oops.svg'} alt="Logo" />
                                    </div>
                                    <div className="e-card-front e-front">
                                        <div className="e-card-header e-card-right" style={{ justifyContent: 'flex-end' }}>
                                            <div className="e-card-header-image"></div>
                                        </div>
                                        <div className="e-card-header e-card-left" style={{ textAlign: 'left' }}>
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">You don't have any open Projects!!</div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px' }}>
                                            <ButtonComponent onClick={() => setSelectedMenu('OpenProject')} >Open Project</ButtonComponent>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ marginTop: '15px' }}>
                                            <ButtonComponent onClick={() => setSelectedMenu('NewProject')} >New Project</ButtonComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const TreeViewProject1 = () => {
    //Customizing the elements to perform our own events
    const [data, setData] = React.useState<any>([]);
    const actualProyect = useBimProjectsStore(store => store.actualProject);
    const setActualModel = useBimProjectsStore(state => state.setActualModel);
    const [status1, setStatus1] = React.useState<boolean>(false);
    const [loading1, setLoading1] = React.useState<boolean>(true);
    const [status2, setStatus2] = React.useState<boolean>(false);
    const selectedMenu = useGlobalStore(state => state.selectedMenu);
    const setSelectedMenu = useGlobalStore(state => state.setSelectedMenu);
    const setUrn = useGlobalStore(state => state.setUrn);    

    let share: any;
    let comments: any;
    let bookmark: any;
    let timeStamp: any;
    // Set customized list template
    /*const listTemplate1 = (data: any) => {
        return (
            <div className={true ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar"}
                style={{ fontSize: "13px", fontFamily: "Segoe UI" }}>
                {
                    //data.imgSrc !== "" ? <img className='e-avatar' src={`${data.imgSrc}`} /> : ""
                    (data?.image && data?.image !== '') ?
                        <img className='e-avatar' style={{ width: '70px' }} src={`${process.env.REACT_APP_BASE_URL}images/models/${data?.image}`} /> :
                        <img className='e-avatar' src={`${"http://localhost:3001/api/images/users/e719a8ae-68bf-4ad0-a3b2-6702936cef42.png"}`} />
                }
                <img style={{ position: 'absolute', left: '100px', marginTop: '8px', width: '25px', height: '25px' }} src={`${data?.open ? "/assets/icons/mostrar.png" : "/assets/icons/ocultar.png"}`} />
                {data?.main && <img style={{ position: 'absolute', left: '130px', marginTop: '8px', width: '25px', height: '25px' }} src={`${"/assets/icons/main.png"}`} />}
                <DropDownButtonComponent items={items} style={{ position: 'absolute', right: '5px', marginTop: '15px' }} select={(e: any) => {
                    //console.log(e, props);
                }}></DropDownButtonComponent>
                <span className="e-list-item-header" style={{ fontSize: "13px", fontFamily: "Segoe UI" }}>{data.name} </span>
                <span className="e-list-content e-text-overflow" dangerouslySetInnerHTML={{ __html: data.description }} ></span>
                {
                    data.createdAt !== "" ?
                        <div>
                            <div id="list-logo">
                                <span className="bookmark"></span>
                                <span className="comments"></span>
                                <span className="share"></span>
                            </div>
                            <div className="timeStamp">{data.createdAt}</div></div> : ""
                }
                {data?.open && <TreeModelDetail modelId={data?.id} />}
            </div>
        );
    }*/

    const listTemplate = (data: any) => {
        return (
            <div className="sample_container card_sample" style={{ height: '100%' }}>
                <div className="e-card e-custom-card">
                    <div className="e-card-header">
                        <img style={{ position: 'absolute', left: '30px', marginTop: '-8px', width: '45px', height: '45px' }} src={`${true ? "/assets/images/svf.png" : "/assets/icons/ocultar.png"}`} />
                        <img style={{ position: 'absolute', right: '10px', marginTop: '-58px', width: '35px', height: '35px' }} src={`${data?.open ? "/assets/icons/mostrar.png" : "/assets/icons/ocultar.png"}`} />
                        <div className="e-avatar e-avatar-circle e-avatar-xlarge" style={{ height: '150px', width: '150px' }}>
                            {
                                (data?.image && data?.image !== '') ?
                                    <img className='e-avatar' src={`${process.env.REACT_APP_BASE_URL}images/models/${data?.image}`} style={{ top: 'auto', height: '80%', left: '-30px' }} /> :
                                    <img src={`${"http://localhost:3001/api/images/users/e719a8ae-68bf-4ad0-a3b2-6702936cef42.png"}`} alt="profile_pic" style={{ top: 'auto', height: '80%', left: '-30px' }} />

                            }
                        </div>
                        &nbsp;
                    </div>
                    <div className="e-card-header">
                        <div className="e-card-header-caption center">
                            <div className="e-card-header-title name">{data.name}</div>
                        </div>
                    </div>
                    <img style={{ position: 'absolute', left: '100px', marginTop: '8px', width: '25px', height: '25px' }} src={`${data?.open ? "/assets/icons/mostrar.png" : "/assets/icons/ocultar.png"}`} />
                    {data?.main && <img style={{ position: 'absolute', right: '10px', marginTop: '8px', width: '25px', height: '25px' }} src={`${"/assets/icons/main.png"}`} />}
                    <DropDownButtonComponent items={items} style={{ position: 'absolute', right: '5px', marginTop: '-155px' }} 
                    select={(e: any) => {
                        //console.log(e, props);

                    }}></DropDownButtonComponent>

                    <div className="e-card-content">
                        <p className="avatar-content">{data.description}</p>
                    </div>
                    {
                        data.createdAt !== "" ?
                            <div>
                                <div id="list-logo">
                                    <span className="bookmark"></span>
                                    <span className="comments"></span>
                                    <span className="share"></span>
                                </div>
                                <div className="timeStamp" style={{ marginLeft: '15px' }}>{data.createdAt}</div></div> : ""
                    }
                    {data?.open && <TreeModelDetail modelId={data?.id} />}
                </div>
            </div>


        );
    }


    const onComplete = (): void => {
        let instance: any = document.getElementById('listview_template');
        instance = instance.ej2_instances[0];
        let listHeader: HTMLElement = instance.element.childNodes[0] as HTMLElement;
        let header: HTMLElement = listHeader.childNodes[0] as HTMLElement;
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader: HTMLElement = listHeader.childNodes[2] as HTMLElement;
                childHeader.remove();
            }
        } else {
            let headerEle: HTMLElement = instance.element.querySelector('.e-list-header') as HTMLElement;
            let headerElement: HTMLElement = instance.element.querySelector('#list-logo') as HTMLElement;
            let clone: HTMLElement = headerElement.cloneNode(true) as HTMLElement;
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        share = document.getElementsByClassName('share');
        comments = document.getElementsByClassName('comments');
        bookmark = document.getElementsByClassName('bookmark');
        timeStamp = document.getElementsByClassName('timeStamp');
        postActions();
    }
    // EventHnadler to Comments, BookMarks and Share Icons
    const postActions = (): void => {
        for (let i: number = 0; i < comments.length; i++) {
            comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            comments[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < bookmark.length; i++) {
            bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            bookmark[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < share.length; i++) {
            share[i].setAttribute('title', 'We can customize this element to perform our own action');
            share[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < timeStamp.length; i++) {
            timeStamp[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }
    }

    useEffect(() => {
        console.log('Este es actualProject', actualProyect);
        setTimeout(() => {
            
            if (actualProyect?.models && actualProyect?.models?.length>0){
                const mainMod = actualProyect?.models.find((x:any) => x?.main);
                if (mainMod){
                    setActualModel({
                        ...mainMod,
                        urn:base64_encode(mainMod.urn),
                        source:'Bim360',
                        isProjectModel:true,
                      })
                      setUrn(base64_encode(mainMod.urn));
                }else{
                    setActualModel({
                        name: actualProyect?.models[0]?.name,
                        file:actualProyect?.models[0]?.file,
                        urn:base64_encode(actualProyect?.models[0]?.urn),
                        source:'Bim360',
                        isProjectModel:true,
                        //faltan otras propiedades de modelo
                      })
                      setUrn(base64_encode(actualProyect?.models[0]?.urn));
                }
                
            }
            
            setData(actualProyect?.models || []);
        }, 200);

        //setTit(actualProyect?.name || '')
    }, [actualProyect])

    useEffect(() => {
        if (selectedMenu === 'NewProject') {
            setStatus1(true)
            setSelectedMenu('');
        }
        if (selectedMenu === 'OpenProject') {
            setStatus2(true)
            setSelectedMenu('');
        }
    }, [selectedMenu])


    return (
        <>
            {status1 && <NewProject status={status1} setStatus={setStatus1} />}
            {status2 && <OpenProject status={status2} setStatus={setStatus2} />}
            {actualProyect && actualProyect.name !== '' ?
                <ListViewComponent id='listview_template' dataSource={data} headerTitle={actualProyect?.name} showHeader={true} cssClass='e-list-template' actionComplete={onComplete.bind(this)} template={listTemplate as any} height='440px' width='100%' style={{ maxWidth: '1000px' }}></ListViewComponent> :
                <AnyProject />
            }

        </>

    )
}
export default TreeViewProject1;