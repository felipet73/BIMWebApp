//TREE WITH ALL THE PROJECTS (OPEN PROJECTS)

import * as React from 'react';
import { useEffect } from "react";
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { useBimProjectsStore } from '../../../../stores';
import './icons.css';

const dataFolders = {
  iconData: [
    {
      nodeId: "01", nodeText: "My Projects", icon: "folder",
      nodeChild: []
    },
    {
      nodeId: "02", nodeText: 'New Folder', icon: 'folder',
      nodeChild: []
    },
  ]
}

interface Props {
  setSelected: any;
  projectSel: any;
}

const TreeFileProjects = ({ setSelected, projectSel }: Props) => {

  const [data, setData] = React.useState<any>(dataFolders);
  const fields: Object = { dataSource: data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image', type: 'icon' };
  const dataProjects = useBimProjectsStore(store => store.projects);

  useEffect(() => {
    console.log('*This are the projects', dataProjects);
    const agrega = dataProjects.map((x: any) => ({ nodeId: x.id, nodeText: x.name, icon: 'project', image:x?.image || '', description: x.description, createdAt:x.createdAt }));

    setData({
      iconData: [
        {
          nodeId: "01", nodeText: "My Projects", icon: "folder", 
          nodeChild: agrega
        },
        {
          nodeId: "02", nodeText: 'New Folder', icon: 'folder',
          nodeChild: []
        },
      ]
    });
  }, [])


  //const cssClass: string = "template-tree";
  const nodeTemplate = (data: any) => {
    console.log(data)
    return (
      <div>
        <div className="treeviewdiv">
          <div className="textcontent">
            <img
              className="e-image"
              src={"/assets/icons/" + (data.icon === 'folder' ? 'folders' : 'project') + ".png"}
              alt={'folders'}
              style={{ width: '25px', height: '25px', marginRight: '10px' }}
            ></img>
            <span className="treeName">{data.nodeText}</span>

            {data.icon === 'project' &&
            <>
            <div style={{ fontSize:'1.1rem', opacity:'0.6' }}>
              {data.description ? data.description:'-'}
            </div>

            <img className="e-avatar"
              src={data.image ? `${process.env.REACT_APP_BASE_URL}images/projects/${data?.image}`:'/assets/svg/unknown.svg'}
              alt={'folders'}
              style={{ position:'absolute', left:'-15px', top:'0px',  width: '45px', height: '45px' }}
            ></img>


            </>
            }
          </div>

        </div>
      </div>
    )
  };



  return (
    <TreeViewComponent id="treeview" nodeTemplate={nodeTemplate as any} fields={fields} sortOrder='Ascending' style={{ height: '300px', overflow: 'scroll' }} nodeSelecting={(e: any) => {
      console.log(e)
      console.log(data?.iconData[0]?.nodeChild?.find((x: any) => x.nodeId === e.nodeData.id))
      console.log(data?.iconData[0])
      //setSelected(e.nodeData);
      setSelected(data?.iconData[0]?.nodeChild?.find((x: any) => x.nodeId === e.nodeData.id));
      projectSel.current = data?.iconData[0]?.nodeChild?.find((x: any) => x.nodeId === e.nodeData.id);
      //setActualProject( dataProjects.find ( (x:any) => x.id === e.nodeData.id )! as ProjectInterface );
    }} />
  )
}
export default TreeFileProjects;