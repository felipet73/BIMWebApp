// TREE WITH MODELS SVF SOURCEDATA

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Selection, Filter, Sort, Reorder, Inject, ITreeData, RowDD, ContextMenu, Toolbar, Page, Edit } from '@syncfusion/ej2-react-treegrid';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { ContextMenuItemModel, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations'
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-react-inputs';
import { tokenInterface, useGlobalStore } from '../../../../stores';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { encode as base64_encode} from 'base-64';
import AddNewModel from '../../../Erp/Modals/bimprojects/AddNewModel';
import NewProject from '../../../Erp/Modals/bimprojects/NewProject';
import OpenProject from '../../../Erp/Modals/bimprojects/OpenProject';
import { ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import './icons.css';
import { GlobalContext } from '../../../../context/GlobalContext';

const TreeSVFOptions = () => {
  
  const { modeSVF } = React.useContext( GlobalContext );
  const setUrn = useGlobalStore(state => state.setUrn);
  const urn = useGlobalStore(state => state.urn);
  //const loading = useRef<boolean>(false);
  const [status, setStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

    const selectedModel = useRef<any>(null);
    const selectedMenu = useGlobalStore(state => state.selectedMenu);
    const setSelectedMenu = useGlobalStore(state => state.setSelectedMenu);
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
            if (e.item.properties.text === 'View-Open'){
              modeSVF.current=true;
              setUrn(props.urn);
              
            }
              
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
    let row: Element = elem.closest(".e-row")!;
    let uid: string = row && row.getAttribute("data-uid")!;
    let items: NodeListOf<Element> = document.querySelectorAll(".e-menu-item");
    for (let i: number = 0; i < items.length; i++) {
      items.item(i).setAttribute("style", "display: block;");
    }
    
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

  const [ tremodels, setTremodels] = React.useState([]);
  const auxModels:any = React.useRef([]);
 
	useEffect(	() => {
    
    auxModels.current=[
      {
        id:'1',name:'SVF Models', type:'acount', 
        children:[
          {name:'My Models', type:'folders', 
          children:[
            {name:'First model', type:'items', urn:'/0/0.svf', children:[]},
            {name:'Jay Street', type:'items', urn:'/svf/11 Jay Street (1)/11 Jay Street/Resource/3D_View/3D/3D.svf', children:[]},
            {name:'King Office', type:'items', urn:'/svf/210 King Office/210 King Office/Resource/3D View/{3D} 1583181/{3D}.svf', children:[]},
            {name:'Buiding F6', type:'items', urn:'/svf/Building-F5~F6/Building-F5~F6/Resource/____/_3D_ 96277/_3D_.svf', children:[]},
            {name:'City', type:'items', urn:'/svf/City/City/0/0.svf', children:[]},
            {name:'Condos', type:'items', urn:'/svf/Condos/Condos/cc051d36-a0ca-dc86-a20d-6244e66ab539/0.svf', children:[]},
            {name:'Juice Line', type:'items', urn:'/svf/Juice Line/Juice Line/e58d1223-960b-e819-6f65-21e1ba58bcd0/0.svf', children:[]},
            {name:'Napa', type:'items', urn:'/svf/Napa/Napa/Resource/3D_View/_3D_ 191869/_3D_.svf', children:[]},
          ]
        }
    ]}
  ];
    
    setTimeout(() => {
      console.log('File ModelsSVFFFFF', auxModels.current )
      setTremodels(auxModels.current);  
    }, 500);
    
	}, [])





  



  const modes: { [key: string]: Object }[] = [
    { text: "Parent", value: "Parent" },
    { text: "Child", value: "Child" },
    { text: "Both", value: "Both" },
    { text: "None", value: "None" },
  ];

  const onChange = (sel: ChangeEventArgs): void => {
    let mode: any = sel.value.toString();
    treegridObj.current?.search("");
    treegridObj.current!.searchSettings.hierarchyMode = mode;
  };

  const toolbarOptions: any = [
    "Search",
    { text: "Option", tooltipText: "my option", id: "option" },
  ];

  const toolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === "option") {
      console.log('clieck enoption')
      treegridObj.current?.filterByColumn("taskName", "startswith", "Testing");
    }
  };



  return (
    <div className="control-pane">
      
      <div className="control-section">
        
        <TreeGridComponent
          ref={treegridObj}
          dataSource={tremodels}
          childMapping="children"
          height="370"
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
          toolbar={toolbarOptions}
          toolbarClick={toolbarClick.bind(this)}

          //treeColumnIndex={1}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="SVF Files"
              width="195"
              template={flagtemplate}
              filter={provinceFilter}
            ></ColumnDirective>
            
          </ColumnsDirective>
          <Inject services={[Filter, Sort, Reorder, Selection, ContextMenu, Toolbar, Page, Edit]} />
        </TreeGridComponent>
      </div>
    </div>
  );
}
export default TreeSVFOptions;