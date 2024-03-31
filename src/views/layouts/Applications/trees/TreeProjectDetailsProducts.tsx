
//TREES FOR SUPPLIERS AND ORDERS

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Selection, Filter, Sort, Reorder, Inject, ITreeData, RowDD, ContextMenu, Toolbar, Page, Edit } from '@syncfusion/ej2-react-treegrid';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { ContextMenuItemModel } from '@syncfusion/ej2-react-grids';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations'
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-react-inputs';
import { useBimProjectsStore, useViewerStore } from '../../../../stores';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import './icons.css';
import { AnyProject } from './TreeViewProject1';


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

const TreeProjectDetailsProducts = () => {
  const modeDetailsProducts = useViewerStore(state => state.modeDetailsProducts);
  const actualProyect = useBimProjectsStore(store => store.actualProject);

   const gridTemplate = (props:any): any => {
    //console.log(props)
    var flagIconLocation = props.parentItem
      ? props.parentItem.name
      : props.name;
    return (
      <>
      <div style={{ display: "inline"  }}>
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
             
              
            }
              
            if (e.item.properties.text === 'Copy'){
              
              //console.log(img)
            }
            if (e.item.properties.text === 'Add to Project'){
              
            }


          }}></DropDownButtonComponent>
          }
        <div>1  </div>  
        <div>2  </div>  
        <div>3 </div>  
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

  /*const editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };*/
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
  
  const [ data, setData] = React.useState([]);
  const [ title, setTitle] = React.useState('');
  const auxData:any = React.useRef([]);
 
	useEffect(	() => {
    console.log('modeDetailsIssues',modeDetailsProducts);
    //ProjectSelections
    //ProjectViews
    if (modeDetailsProducts==='ProjectSuppliers'){
      auxData.current=[
        {
          id:'1',name:'Project Supliers', type:'acount', 
          children:[
            {name:'My Suppliers', type:'folders', 
            children:[
              {name:'Issue 1', type:'items', urn:'/0/0.svf', children:[]},
              {name:'Issue 2222', type:'items', urn:'/svf/11 Jay Street (1)/11 Jay Street/Resource/3D_View/3D/3D.svf', children:[]},
              {name:'333', type:'items', urn:'/svf/210 King Office/210 King Office/Resource/3D View/{3D} 1583181/{3D}.svf', children:[]},
            ]
          }
      ]}
    ];
    }
    if (modeDetailsProducts==='ProjectOrders'){
      auxData.current=[
        {
          id:'1',name:'Project Orders', type:'acount', 
          children:[
            {name:'My Orders', type:'folders', 
            children:[
              {name:'Coment 1', type:'items', urn:'/0/0.svf', children:[]},
              {name:'Copmment 2', type:'items', urn:'/svf/11 Jay Street (1)/11 Jay Street/Resource/3D_View/3D/3D.svf', children:[]},
            ]
          }
      ]}
    ];
    }

    setTimeout(() => {
      //setTitle(modeDetailsProducts);
      setData(auxData.current);
    }, 500);
    
    

	}, [modeDetailsProducts])


  /*const modes: { [key: string]: Object }[] = [
    { text: "Parent", value: "Parent" },
    { text: "Child", value: "Child" },
    { text: "Both", value: "Both" },
    { text: "None", value: "None" },
  ];

  const onChange = (sel: ChangeEventArgs): void => {
    let mode: any = sel.value.toString();
    treegridObj.current?.search("");
    treegridObj.current!.searchSettings.hierarchyMode = mode;
  };*/

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
    <>
    {actualProyect && actualProyect.name !== '' ?
    <div className="control-pane">
      <div className="control-section">
        
        <TreeGridComponent
          ref={treegridObj}
          dataSource={data}
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
              headerText={'Name'}
              width="195"
              template={flagtemplate}
              filter={provinceFilter}
            ></ColumnDirective>
            
          </ColumnsDirective>
          <Inject services={[Filter, Sort, Reorder, Selection, ContextMenu, Toolbar, Page, Edit]} />
        </TreeGridComponent>
      </div>
    </div>
    :<AnyProject />
    }
</>    
  );
}
export default TreeProjectDetailsProducts;