//DETAIL OF THE MODEL VIEWS

import * as React from 'react';
import { useEffect } from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import './icons.css';
import { useBimProjectsStore } from '../../../../stores';

interface Props{modelId:string;}

const TreeModelDetail = ({ modelId }:Props) => {
    const [fields, setFields] = React.useState<any>([]);
    const viewables = useBimProjectsStore(store => store.viewables);

    useEffect(() => {
        const dataViewable = viewables.find((x:any) => x.ModelId === modelId);
        if (!dataViewable) return;
        console.log('viewable', dataViewable);
        for (let i=0;i<dataViewable.Viewables.length;i++)
        {
            if (dataViewable.Viewables[i].data.type === 'geometry')
                dataViewable.Viewables[i].hasChild=false;
            else
                dataViewable.Viewables[i].hasChild=true;
            if (dataViewable.Viewables[i].Parent===""){
                dataViewable.Viewables[i]={
                    name: dataViewable.Viewables[i].name,
                    data: dataViewable.Viewables[i].data,
                    id: dataViewable.Viewables[i].id,
                    //"Parent": 22,
                    hasChild: true,
                }
            }
        }
        const data= {
            templateData:[
                ...dataViewable.Viewables
            ]
        }
        //setData(dataSource);
        //setData(dataViewable.Viewables);
        setFields({ dataSource: data.templateData, value: 'id', parentValue: 'Parent', text: 'name', hasChildren: "hasChild" });
    }, [])
    

    // maps the appropriate column to fields property
    //const fields: object = { dataSource: data.templateData, value: 'id', parentValue: 'Parent', text: 'name', hasChildren: "hasChild" };
    //set the value to header template
    /*const headerTemplate = () => {
        return (
            <div className="head"> Views </div>
        );
    }*/
    //set the value to item template
    /*const itemTemplate = (data: any) => {
        return (
            // <div> <img className="eimage" src={"src/images/employees/" + '2' + ".png"} />
                <div> <div className="" > {data.name} </div></div>
                // </div>
        );
    }*/
    //set the value to footer template
    /*const footerTemplate = () => {
        return (
            <div className="footer" > <div className="footer-content">
                <span className="e-badge">
                    
                    <span className="display unavailable">
                        <span className="status away"></span>
                    </span>
                </span>
            </div> </div>
        );
    }*/

    return (
      <DropDownTreeComponent fields={fields} placeholder="Select View" 
      //itemTemplate={itemTemplate} 
      //footerTemplate={footerTemplate} 
      //headerTemplate={headerTemplate} 
      popupHeight="220px" cssClass="ddt-template" width="100%"  />
    );
}
export default TreeModelDetail;