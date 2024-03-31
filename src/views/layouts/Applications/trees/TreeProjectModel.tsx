
// TREE WITH THE MODEL STRUCTURE PANEL 

import * as React from 'react';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { useBimProjectsStore, useGlobalStore } from '../../../../stores';
import { GlobalContext } from '../../../../context/GlobalContext';
import { useProjectsTreeStore } from '../../../../stores/erp/bimprojects/projecttree.store';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { rippleEffect } from '@syncfusion/ej2-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';
import { TooltipComponent, Position } from '@syncfusion/ej2-react-popups';
import './icons.css';
import NewView from '../../../Erp/Modals/bimprojects/NewView';

const TreeProjectModel = () => {
  
  const { viewerC, modeSelect } = React.useContext( GlobalContext );
  const selectedTheme = useGlobalStore(store => store.selectedTheme);
  const charged = useProjectsTreeStore(store => store.charged)
  const [status, setStatus] = React.useState<boolean>(false);
  const actualProyect = useBimProjectsStore(store => store.actualProject);

  useEffect(() => {
    try {
       //viewerC.current?.loadedExtensions.Autodesk?.ModelStructure.activate();
       //ViewerLayersPanel
       let TreeModel: HTMLDivElement|null = document.getElementById('ViewerModelStructurePanel') as HTMLDivElement;
       if (TreeModel) {
        console.log('Elimino anterior')
        TreeModel?.remove();
       }
       TreeModel = document.getElementById('ViewerModelStructurePanel') as HTMLDivElement;
       if (TreeModel) {
        console.log('Elimino anterior')
        TreeModel?.remove();
       }
       TreeModel = document.getElementById('ViewerModelStructurePanel') as HTMLDivElement;
       if (TreeModel) {
        console.log('Elimino anterior')
        TreeModel?.remove();
       }
       


       viewerC.current.getExtension('Autodesk.ModelStructure',(e:any)=>{
        console.log('get extension', e)
        e?.activate();
       });
      
       setTimeout(()=>{
        TreeModel = document.getElementById('ViewerModelStructurePanel') as HTMLDivElement;
        TreeModel!.style.display = 'block';
        TreeModel!.style.position = 'relative';
        let hj: HTMLDivElement = TreeModel.firstChild as HTMLDivElement;
        hj!.style.visibility = 'hidden'
        hj!.style.background = 'transparent'
        //hj!.style.padding = '0px'
        //hj!.style.height = '0px'
        console.log(TreeModel);
        const ThisModel = document.getElementById('TreeModelContainer')
        const cls1: HTMLDivElement = TreeModel.childNodes[1] as HTMLDivElement;
        cls1!.style.visibility = 'hidden'
        
        //TreeModel!.style.top = '-48px!important';
        TreeModel!.style.height = '400px';
        TreeModel!.style.maxHeight = '500px';
        //var tmp = document.getElementById('child');
        //ThisModel?.appendChild(TreeModel?.cloneNode(true)!);
        ThisModel?.appendChild(TreeModel!);
        setTimeout(()=>{TreeModel!.style.top = '0px ';},2000)
       },800)
        
    } catch (error) {
      
    }
    //TreeModel?.remove();
  }, [charged])

  

  useLayoutEffect(() => {

        // To enable ripple in checkbox/radio type ButtonGroup.
        let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
        let button: HTMLElement;
        for (let i: number = 0; i < buttons.length; i++) {
            button = buttons.item(i) as HTMLElement;
            rippleEffect(button, { selector: '.e-btn' });
        }
    

      const rippleHandler = (e: MouseEvent): void => {
          let rippleSpan: Element = document.querySelector(".e-ripple-container") as Element;
          if (rippleSpan) {
              rippleMouseHandler(e, rippleSpan);
          }
      }
      
      let elemArray: NodeListOf<Element> = document.querySelectorAll(".switch-control label");
      for (let i: number = 0, len: number = elemArray.length; i < len; i++) {
          elemArray[i].addEventListener("mouseup" as any, rippleHandler as any);
          elemArray[i].addEventListener("mousedown" as any, rippleHandler as any);

  }  
  }, [])


  const ff=(e:any)=>{
    console.log('isolation changed',e)
    if (e.isolation.length>0){
      viewerC.current.select(e.isolation[0]?.ids);
    setTimeout(() => {
      viewerC.current.showAll();  
    }, 500);

    }
  }

//bg-icons e-btngrp-watch


  return (
    <>
    {status && <NewView status={status} setStatus={setStatus} />}
    <div className="control-pane" >
            <div className="control-section button-group-container" style={{position: 'absolute',zIndex: 9,marginLeft: '15px', marginTop:'0px'}}>
                <div className="button-group-section">
                    <div id="button-group-control">
                        <div className="row">
                            <div id="bgicon" className="e-btn-group">
                            
                            <label htmlFor="checked" style={{ padding: "0px 5px 0px 0px" }}> Selection </label>
                            <SwitchComponent id="checked" checked={modeSelect.current} style={{ top:'15px', marginRight:'10px' }} change={(e)=>{
                              console.log(e)
                              modeSelect.current=e.checked;
                              var currIsolated = viewerC.current!.getIsolatedNodes();
                              var currSelection = viewerC.current!.getSelection();
                              console.log(currIsolated)
                              console.log(modeSelect.current)

                              if (modeSelect.current){

                                viewerC.current.select(currIsolated);
                                viewerC.current.showAll();
                                viewerC.current.removeEventListener(Autodesk.Viewing.AGGREGATE_ISOLATION_CHANGED_EVENT, ff);
                                  
                                  //console.log('mode select',modeSelect.current)
                                viewerC.current.addEventListener(Autodesk.Viewing.AGGREGATE_ISOLATION_CHANGED_EVENT, ff);

                              }else{
                                viewerC.current.removeEventListener(Autodesk.Viewing.AGGREGATE_ISOLATION_CHANGED_EVENT, ff);
                                viewerC.current.isolate(currSelection);
                              }
                              //var currSelection = viewerC.current!.getSelection();


                            }}></SwitchComponent>
                        
                                {actualProyect &&
                                <>
                                <TooltipComponent content={`Save actual ${modeSelect.current ? 'selection':'view'}`} position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 110px)', top: '45%' }}>
                                <ButtonComponent iconCss='e-icons e-save' style={{ marginLeft:'15px' }} onClick={()=>setStatus(true)} ></ButtonComponent>
                                </TooltipComponent>
                                <TooltipComponent content="Save actual view" position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 105px)', top: '45%' }}>
                                <ButtonComponent iconCss='bg-icons e-btngrp-star'></ButtonComponent>
                                </TooltipComponent>                                  
                                <TooltipComponent content="Save actual view" position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 100px)', top: '45%' }}>
                                <ButtonComponent iconCss='bg-icons e-btngrp-download'></ButtonComponent>
                                </TooltipComponent>                                                                  
                                </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      <div className={selectedTheme==='material3' ? 'control-section adsk-viewing-viewer touch quality-text light-theme':'control-section adsk-viewing-viewer touch quality-text dark-theme'} id='TreeModelContainer' style={{ background:'transparent' }}>
      </div>
    </div>
    </>
  );
}
export default TreeProjectModel;