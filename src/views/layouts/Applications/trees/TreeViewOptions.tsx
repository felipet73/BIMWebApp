// TREE WITH AUTODESK CONSTRUCTION CLOUD DATASOURCE

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Selection, Filter, Sort, Reorder, Inject, ITreeData, RowDD, ContextMenu, Toolbar, Page, Edit } from '@syncfusion/ej2-react-treegrid';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { ContextMenuItemModel, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations'
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-react-inputs';
import { tokenInterface, useBimProjectsStore, useGlobalStore } from '../../../../stores';
import { AxiosAutodesk } from '../../../../config/axios';
import { DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { encode as base64_encode} from 'base-64';
import AddNewModel from '../../../Erp/Modals/bimprojects/AddNewModel';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GlobalContext } from '../../../../context/GlobalContext';
import './icons.css';

const TreeViewOptions = () => {
  const { modeSVF } = React.useContext( GlobalContext );
  const setUrn = useGlobalStore(state => state.setUrn);
  const urn = useGlobalStore(state => state.urn);
  const setActualModel = useBimProjectsStore(state => state.setActualModel);
  
  //const loading = useRef<boolean>(false);
  const [status, setStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

    const selectedModel = useRef<any>(null);
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
              modeSVF.current=false;
              setUrn(base64_encode(props.included.id));
              setActualModel({
                name:props.name,
                file:props.name,
                urn:base64_encode(props.included.id),
                source:'Bim360',
                isProjectModel:false,
                //faltan otras propiedades de modelo
              })
            }
              
            if (e.item.properties.text === 'Copy'){
              
              //console.log(img)
            }
            if (e.item.properties.text === 'Add to Project'){
              if (urn!==base64_encode(props.included.id)){
                modeSVF.current=false;
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


  const {access_token:token}:tokenInterface = useGlobalStore(state => state.token);
  const setToken = useGlobalStore(state => state.setToken);
  
	const [ tremodels, setTremodels] = React.useState([]);
  const auxModels:any = React.useRef([]);
 
	useEffect(	() => {
    
    const DatosHubs = async () => {
      try {
        const { data }:any = await AxiosAutodesk.get("/project/v1/hubs?",{headers:{Authorization: "Bearer " + token}});
        auxModels.current=data?.data?.map( (dt:any) => ({...dt, name:dt?.attributes?.name, type:'acount', children:[]}));          
      } catch (error) {
        (async ()=>{
          try {
            await AxiosAutodesk.post("authentication/v1/authenticate",
              {
                client_id: 'Lrn6oqLnwpCBd8GS0LuimGx5SHONYw4b',
                client_secret: 'JLA2LfrdwUg4hMkz',
                grant_type: 'client_credentials',
                scope: 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete',
              },
              {headers: {'Content-Type':'application/x-www-form-urlencoded'}}
            ).then(response => {
              console.log('Response token ',response.data);
              setToken(response.data)
          }).catch(response => {              
              console.log('Error Acad Token',response);
          });         
        } catch (error) {
            console.log('Response Acad token error catch ', error);
        }})();
      }
      //console.log(' Hubs respuesta', data);
    }
  
    const DatosProyectos = async () => {
      for(let i=0;i<auxModels.current?.length;i++){
        const { data } = await AxiosAutodesk.get("/project/v1/hubs/"+ auxModels.current[i]?.id +"/projects",{headers:{Authorization: "Bearer " + token}});
        //console.log(' Proyectos respuesta', data);
        auxModels.current[i].children=[...auxModels.current[i].children,...data?.data?.map( (dt:any) => ({...dt, name:dt?.attributes?.name, type:'project', children:[]}))]
      }
    }
    
  
    const DatosFolders = async () => {
      //console.log(' dato hasta ahora', auxModels.current);
      for (let j=0;j<auxModels.current.length;j++)
        for (let i=0;i<auxModels.current[j].children.length;i++){
          const { data } = await AxiosAutodesk.get("/project/v1/hubs/"+ auxModels.current[j].id +"/projects/" + auxModels.current[j].children[i].id + "/topFolders",{headers:{Authorization: "Bearer " + token}});
          //console.log(' Folders respuesta', data);
          auxModels.current[j].children[i]={...auxModels.current[j].children[i] , 
            ProjectFiles:data?.data?.find( (dt:any) => (dt?.attributes?.name ===  "Project Files" ))
          };
      }
    }
    //https://developer.api.autodesk.com/project/v1/hubs/b.add1a5d6-6782-4ab4-80b5-ec0ac90a3c44/projects
    //https://developer.api.autodesk.com/project/v1/hubs/b.add1a5d6-6782-4ab4-80b5-ec0ac90a3c44/projects/b.650b7b18-9a52-4032-a01d-9e7b181ca5f9/topFolders
    //https://developer.api.autodesk.com/data/v1/projects/b.650b7b18-9a52-4032-a01d-9e7b181ca5f9/folders/urn:adsk.wipprod:fs.folder:co.MiYHBR6bR7u6JNIMqiygGA/contents
  
    //let cantidadFolders=0;
  
      //let folders=[];
      //let foldersproy=[];
  
  
    const DatosContentFolders = async () => {
      

      for (let j=0;j<auxModels.current.length;j++)
        for (let i=0;i<auxModels.current[j].children.length;i++){
          const { data } = await AxiosAutodesk.get(
          "/data/v1/projects/" + auxModels.current[j]?.children[i]?.id +"/folders/" + auxModels.current[j]?.children[i]?.ProjectFiles?.id + "/contents",
          {headers:{Authorization: "Bearer " + token}});
          console.log(' Folders FolderFiles', data);

          
          for (let k=0;k<data.data.length;k++){
            //auxModels.current[j].children[i].children=[data.data[k]];
            auxModels.current[j].children[i].children.push({...data.data[k], included:data?.included?.find( (x:any) => x.attributes?.displayName === data.data[k].attributes.displayName ), name:data.data[k].attributes.displayName, children:[]});
          }
          
        /*
        for (let j=0;j<data.data.length;j++){
          if (data.data[j].type==='items' && filtrado!=='' && !data.data[j].attributes.displayName?.toUpperCase().includes(filtrado.toUpperCase())){
  
  
          }else
          {
  
            let nodo = {
              Id:data.data[j].id,
              Descripcion:data.data[j].attributes.displayName,
              PhantomParentId:ArrayFolders[i].Id,
              Tipo:data.data[j].type,
              IdProyecto:ArrayFolders[i].PhantomParentId,
              Nivel:4
            };
          
            arreglo.push(nodo);
            if (data.data[j].type === 'folders') {
              let rep = await BuscarHijos(nodo, arreglo1, 5, arregloHijos);
              //console.log('mi arreglo ',arregloHijos);
              arregloHijosAc.push(...rep);
              //folders.push(data.data[j].id);
              //foldersproy.push(ArrayFolders[i].PhantomParentId);
              //DatosContentFolders2(data.data[j].id,ArrayFolders[i].PhantomParentId);
            }else{
              for (let k = 0; k < data.included?.length; k++) {
                if (data.data[j].attributes.displayName === data.included[k].attributes.name) {
                  arreglo1.push(
                    {
                      Id: data.included[k].id,
                      Descripcion: 'Version ' + data.included[k].attributes.versionNumber + ' ' + data.included[k].attributes.lastModifiedTime.substring(0, 10),
                      PhantomParentId: data.data[j].id,
                      Nivel: 5,
                      Version: data.included[k].attributes.versionNumber
                    },
                  )
                }
              }
            }					
          }*/
  
        
        //let long;
        /*console.log([...ArregloNiveles.current,
          arreglo,arreglo1,arregloHijosAc
        ]);*/
  
  
        /*setAllLevels( (state)=>{
          return[...ArregloNiveles.current,
          ...arreglo,...arreglo1,...arregloHijosAc
        ]
        });*/

        //setLastLevel(6);
      }
      console.log(' dato hasta ahora', auxModels.current);
    }
  
    /*
    const BuscarHijos = async (nodo, arreglo1, Nivel, arregloHijos) => {
      //console.log('Se llama Hubs ' + "Bearer ");
      //setLastLevel(Nivel+1);
      //let arreglo=[];
      let arregloHijos1=[];
      let arreglo2=[];
  
      const { data } = await AxiosAutodesk.get(
        "/data/v1/projects/" + nodo.IdProyecto + "/folders/" + nodo.Id + "/contents",
        {
          headers:
          {
            Authorization: "Bearer " + token
          },
        }
      );
      console.log(' Content Folders respuesta');
      console.log(data);
  
      for (let j = 0; j < data.data.length; j++) {
        if (data.data[j].type==='items' && filtrado!=='' && !data.data[j].attributes.displayName?.toUpperCase().includes(filtrado.toUpperCase())){
  
  
        }else
        {
  
        let nodo1 = {
          Id: data.data[j].id,
          Descripcion: data.data[j].attributes.displayName,
          PhantomParentId: nodo.Id,
          Tipo: data.data[j].type,
          IdProyecto: nodo.IdProyecto,
          Nivel: Nivel
        };
  
        arreglo1.push(nodo1);	
  
        if (data.data[j].type === 'folders') {
          //let resp = BuscarHijos1(nodo1, arreglo2, Nivel+1, arregloHijos1);
          
          
          //folders.push(data.data[j].id);
          //foldersproy.push(ArrayFolders[i].PhantomParentId);
          //DatosContentFolders2(data.data[j].id,ArrayFolders[i].PhantomParentId);
        } else {
          for (let k = 0; k < data.included?.length; k++) {
            //alert(data.included.length)
            if (data.data[j].attributes.displayName === data.included[k].attributes.name) {
              arreglo2.push(
                {
                  Id: data.included[k].id,
                  Descripcion: 'Version ' + data.included[k].attributes.versionNumber + ' ' + data.included[k].attributes.lastModifiedTime.substring(0, 10),
                  PhantomParentId: data.data[j].id,
                  Nivel: Nivel+1,
                  Version: data.included[k].attributes.versionNumber
                },
              )
            }
          }
        }
      }
      }
        
        //console.log('mi arreglo ',arreglo);
        //arrHijos = [];
        console.log('RETORNOOOO ')
        console.log([arreglo2,...arregloHijos1])
  
        arregloHijos = [...arreglo2];
      //return [arreglo2,arregloHijos1];
      return [...arreglo2,...arregloHijos1];
  
    }
    */
    
    const ObteinData = (async ()=>{
      //setAllLevels(null);
      //await ObtenerTokenAdsk();
      await DatosHubs();
      await DatosProyectos();
      await DatosFolders();
      await DatosContentFolders();
      setTremodels(auxModels.current);
    })();
		//setIndicaRecarga(false);
	}, [])


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
    <div className="control-pane">
      {status && <AddNewModel selectedModel={selectedModel} status={status} setStatus={setStatus} loading={loading} setLoading={setLoading}/>}
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
              headerText="ACC Docs"
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
export default TreeViewOptions;