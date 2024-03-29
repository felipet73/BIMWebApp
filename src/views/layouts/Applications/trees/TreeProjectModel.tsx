
import * as React from 'react';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Selection, Filter, Sort, Reorder, Inject, ITreeData, RowDD, ContextMenu, Toolbar, Page, Edit } from '@syncfusion/ej2-react-treegrid';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { ContextMenuItemModel, EditSettingsModel } from '@syncfusion/ej2-react-grids';

import { getValue } from '@syncfusion/ej2-base';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations'
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-react-inputs';
import { useGlobalStore } from '../../../../stores';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { encode as base64_encode} from 'base-64';
import AddNewModel from '../../../Erp/Modals/bimprojects/AddNewModel';
import NewProject from '../../../Erp/Modals/bimprojects/NewProject';
import OpenProject from '../../../Erp/Modals/bimprojects/OpenProject';
import { GlobalContext } from '../../../../context/GlobalContext';
import { useProjectsTreeStore, ElementInterface } from '../../../../stores/erp/bimprojects/projecttree.store';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { rippleEffect } from '@syncfusion/ej2-base';

import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';

import { TooltipComponent, Position } from '@syncfusion/ej2-react-popups';


import './icons.css';



const TreeProjectModel = () => {
  
  const { viewerC, modeSelect } = React.useContext( GlobalContext );

  const setUrn = useGlobalStore(state => state.setUrn);
  const urn = useGlobalStore(state => state.urn);
  //const loading = useRef<boolean>(false);
  const [status, setStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const selectedTheme = useGlobalStore(store => store.selectedTheme);

    const selectedModel = useRef<any>(null);
    //const selectedMenu = useGlobalStore(state => state.selectedMenu);
    //const setSelectedMenu = useGlobalStore(state => state.setSelectedMenu);
    const [status1, setStatus1] = React.useState<boolean>(false);
    const [loading1, setLoading1] = React.useState<boolean>(true);

    const [status2, setStatus2] = React.useState<boolean>(false);
    //const actualProject = useBimProjectsStore( store=>store.actualProject )

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


   const gridTemplate = (props:any): any => {
    //console.log(props)
    var flagIconLocation = props.parentItem
      ? props.parentItem.name
      : props.name;
    return (
      <>
      <div style={{ display: "inline" }}>
        <div style={{ display: "contents"}}>
          <img
            className="e-image"
            src={"/assets/icons/" + props.type + ".png"}
            alt = {flagIconLocation}
            style={{ width:'25px', height:'25px', marginRight:'10px'  }}
          ></img>

          {props.name}      
          {props.type==='items' && 
          <DropDownButtonComponent items={items} iconCss='' style={{ position:'absolute', right:'5px', marginTop:'-5px' }} select={(e)=>{
            //console.log(e, props);
            if (e.item.properties.text === 'View-Open')
              setUrn(base64_encode(props.included.id));
            if (e.item.properties.text === 'Copy'){
              
              //console.log(img)
            }
            if (e.item.properties.text === 'Add to Project'){
              if (urn!==base64_encode(props.included.id)){
                setUrn(base64_encode(props.included.id));
                
                setLoading(true);
              }
              selectedModel.current=props.included;
              setStatus(true);
            }


          }}></DropDownButtonComponent>
          }

          
          
          

        
        
    </div>        

      </div>
      </>
    );
  };

  
  let flagtemplate: any = gridTemplate;
  
  const provinceFilter: IFilter = {
    type: "Excel",
    itemTemplate: flagtemplate,
  };
  let treegridObj = React.useRef<TreeGridComponent>(null);

  const editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  const contextMenuItems: ContextMenuItemModel[] = [
    { text: "Collapse the Row", target: ".e-content", id: "collapserow" },
    { text: "Expand the Row", target: ".e-content", id: "expandrow" },
    { text: "Collapse All", target: ".e-headercontent", id: "collapseall" },
    { text: "Expand All", target: ".e-headercontent", id: "expandall" },
  ];

  const contextMenuOpen = (args: BeforeOpenCloseEventArgs): void => {
    //alert()
    let elem: Element = args.event.target as Element;
    //let row: Element = elem.closest(".e-row")!;
    //let uid: string = row && row.getAttribute("data-uid")!;
    let items: NodeListOf<Element> = document.querySelectorAll(".e-menu-item");
    for (let i: number = 0; i < items.length; i++) {
      items.item(i).setAttribute("style", "display: block;");
    }
    /*if (elem.closest(".e-row")) {
      if (
        isNullOrUndefined(uid) ||
        isNullOrUndefined(
          getValue(
            "hasChildRecords",
            treegridObj.current!.grid.getRowObjectFromUID(uid).data
          )
        )
      ) {
        args.cancel = true;
      } else {
        let flag: boolean = getValue(
          "expanded",
          treegridObj.current!.grid.getRowObjectFromUID(uid).data
        );
        let val: string = flag ? "none" : "block";
        document
          .querySelectorAll("li#expandrow")[0]
          .setAttribute("style", "display: " + val + ";");
        val = !flag ? "none" : "block";
        document
          .querySelectorAll("li#collapserow")[0]
          .setAttribute("style", "display: " + val + ";");
      }
    } else {*/
      let len =
        treegridObj.current!.element.querySelectorAll(
          ".e-treegridexpand"
        ).length;
      if (len !== 0) {
        document
          .querySelectorAll("li#collapseall")[0]
          .setAttribute("style", "display: block;");
      } else {
        document
          .querySelectorAll("li#expandall")[0]
          .setAttribute("style", "display: block;");
      }
    //}
  };  
  const contextMenuClick = (args: MenuEventArgs): void => {
    //console.log(args.item);
    //return;
    if (args.item.id === "collapserow") {
      treegridObj.current?.collapseRow(
        treegridObj.current?.getSelectedRows()[0] as HTMLTableRowElement,
        treegridObj.current?.getSelectedRecords()[0]
      );
    } else if (args.item.id === "expandrow") {
      treegridObj.current?.expandRow(
        treegridObj.current?.getSelectedRows()[0] as HTMLTableRowElement,
        treegridObj.current?.getSelectedRecords()[0]
      );
    } else if (args.item.id === "collapseall") {
      treegridObj.current?.collapseAll();
    } else if (args.item.id === "expandall") {
      treegridObj.current?.expandAll();
    }
  };


  //const {access_token:token}:tokenInterface = useGlobalStore(state => state.token);
  //const setToken = useGlobalStore(state => state.setToken);
 
  const [ treProject, setTreProject] = React.useState<ElementInterface[] | []>([]);
  
  const auxTree:any = React.useRef([]);
  const charged = useProjectsTreeStore(store => store.charged)
  //const projectTree = useProjectsTreeStore(store => store.projectTree)
  /*
	useEffect(	() => {
       
    const ObteinData = (async ()=>{
      auxTree.current=[];
      viewerC.current?.getObjectTree(function (objTree:any) {
        //console.log(objTree);
        objTree.enumNodeChildren(
            objTree.getRootId(),
            function (dbId:any) {
                var objSelected = dbId;
                viewerC.current.getProperties(objSelected, (props:any) => {
                  //console.log(props);
                  if (!props.name.includes('Analyti')){
                    var it = viewerC.current.model.getData().instanceTree;
                    let hijos = props.properties.filter((data:any)=>data.displayName==='child').map((data:any)=>{
                      var nodeFinalName = it.getNodeName(data.displayValue)
                      //if (nodeFinalName==='') return;
                      //if (nodeFinalName?.includes('ANALY')) return;
                      return ({
                        id:data.displayValue,
                        name:nodeFinalName,
                        type:'family',
                        expanded:false,
                        children:[]
                      })
                    }) ;
                    //console.log('hijos', hijos);
                    auxTree.current=[...auxTree.current,{id:props.dbId,name:props.name, type:'category' , expanded:false, children:hijos.filter((x:any)=>x.name)}]
  
                  }
                })
            })
        })      
        setTimeout(() => {
          var it = viewerC.current.model.getData().instanceTree;
          for (let i=0;i<auxTree.current.length;i++)
            for (let j=0;j<auxTree.current[i].children.length;j++){
              let prophijos:any=[];
              const ObteinProps1=(props1:any) => {
                //console.log(props1)  
                prophijos = props1.properties.filter((data1:any)=>data1.displayName==='child').map((data1:any)=>{
                  var nodeFinalName1 = it.getNodeName(data1.displayValue)                  
                  //if (nodeFinalName1==='') return;
                  //if (nodeFinalName1?.includes('ANALY')) return;
                  return ({
                    id:data1.displayValue,
                    name:nodeFinalName1,
                    type:'type',
                    expanded:false,
                    children:[]
                  })
                });
                auxTree.current[i].children[j].children=prophijos.filter((x:any)=>x.name);
              }
              viewerC.current.getProperties(auxTree.current[i].children[j].id, ObteinProps1);
            }

          setTimeout(() => {
            var it = viewerC.current.model.getData().instanceTree;
            for (let i=0;i<auxTree.current.length;i++)
              for (let j=0;j<auxTree.current[i].children.length;j++)
                for (let k=0;k<auxTree.current[i].children[j].children.length;k++){  
                let prophijos:any=[];
                const ObteinProps1=(props1:any) => {
                  prophijos = props1.properties.filter((data1:any)=>data1.displayName==='child').map((data1:any)=>{
                    var nodeFinalName1 = it.getNodeName(data1.displayValue)
                    //if (nodeFinalName1==='') return;
                    //if (nodeFinalName1?.includes('ANALY')) return;  
                    return ({
                      id:data1.displayValue,
                      name:nodeFinalName1,
                      type:'element',
                      expanded:false,
                      children:[]
                    })
                  });
                  //console.log(prophijos)
                  auxTree.current[i].children[j].children[k].children=prophijos.filter((x:any)=>x.name);
                }
                viewerC.current.getProperties(auxTree.current[i].children[j].children[k].id, ObteinProps1);
              }
              setTimeout(() => {
                setTreProject(auxTree.current);
              }, 1300);
          }, 1300);
        }, 1300);
    })();

	}, [charged])*/




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
                        
                                <TooltipComponent content="Save actual view" position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 110px)', top: '45%' }}>
                                <ButtonComponent iconCss='e-icons e-save' style={{ marginLeft:'15px' }}></ButtonComponent>
                                </TooltipComponent>
                                <TooltipComponent content="Save actual view" position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 105px)', top: '45%' }}>
                                <ButtonComponent iconCss='bg-icons e-btngrp-star'></ButtonComponent>
                                </TooltipComponent>                                  
                                <TooltipComponent content="Save actual view" position={('TopCenter' as Position)} tabIndex={0} style={{ display: 'block', position: 'relative', left: 'calc( 50% - 100px)', top: '45%' }}>
                                <ButtonComponent iconCss='bg-icons e-btngrp-download'></ButtonComponent>
                                </TooltipComponent>                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              



      {status && <AddNewModel selectedModel={selectedModel} status={status} setStatus={setStatus} loading={loading} setLoading={setLoading}/>}
      {status1 && <NewProject status={status1} setStatus={setStatus1} loading={loading1} setLoading={setLoading1}/>}
      {status2 && <OpenProject status={status2} setStatus={setStatus2} />}
      <div className={selectedTheme==='material3' ? 'control-section adsk-viewing-viewer touch quality-text light-theme':'control-section adsk-viewing-viewer touch quality-text dark-theme'} id='TreeModelContainer' style={{ background:'transparent' }}>

          {/* <TreeGridComponent
          ref={treegridObj}
          dataSource={treProject}
          childMapping="children"
          height="400"
          allowReordering={true}
          allowFiltering={true}
          allowSorting={true}
          filterSettings={{ type: "Menu", hierarchyMode: "Parent" }}
          gridLines='None'
          //allowRowDragAndDrop={true}
          selectionSettings={{type:'Multiple'}}
          contextMenuItems={contextMenuItems}
          contextMenuOpen={contextMenuOpen.bind(this)}
          contextMenuClick={contextMenuClick.bind(this)}
          //selectedRowIndex={8}
          //onClick={(e:any)=>{console.log(e)}}
          rowSelected={(e:any)=>{
            console.log(e)
            viewerC.current?.isolate(e.data.id);
            viewerC.current?.fitToView(e.data.id);
            viewerC.current?.select(e.data.id);
            
           

          }}
          expanded={(e:any)=>{
            console.log(e)
            
            
            //console.log(repTree.current)
            if (e.data.type==='category'){
              
            }
            if (e.data.type==='family' || e.data.type==='type'){

            }
            
          }}
          //treeColumnIndex={1}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="Tree model"
              width="195"
              template={flagtemplate}
              filter={provinceFilter}
            ></ColumnDirective>
            
          </ColumnsDirective>
          <Inject services={[Filter, Sort, Reorder, Selection, ContextMenu, Toolbar, Page, Edit]} />
        </TreeGridComponent> */}
      </div>
    </div>
    </>
  );
}
export default TreeProjectModel;