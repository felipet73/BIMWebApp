
import { create } from 'zustand'


export interface IssueInterface{
    id:string;
    name:string;    
    descripcion:string;
    type:string;
    dateCreated:Date;
    point:number[];  
    camera:number[];
    image:string;
    ids:string[];
    project:string;
    models:string[];
    user:string;
    to:string[];
}


export interface listInterface{
    id:string;
    name:string;
    dateCreated:Date;
    descripcion:string;
    ids:string[];
    project:string;
    models:string[];
}

export interface SelectionInterface{
    id:string;
    name:string;
    dateCreated:Date;
    descripcion:string;
    ids:string[];
    image:string;
    project:string;
    models:string[];
}


export interface ViewInterface{
    id:string;
    name:string;
    dateCreated:Date;
    descripcion:string;
    ids:string[];
    image:string;
    project:string;
    models:string[];
}

export interface ModelInterface{
    id:string;
    name:string;
    dateCreated:Date;
    file:string;
    descripcion:string;
    image:string;
    urn:string;
    main?:boolean;
    open?:boolean;
    defaultView?:string;
}

export interface ProjectInterface {
    id:string;
    name:string;
    dateCreated:Date;
    descripcion:string;
    image:string;
    models:ModelInterface[] | [];
}

interface BimProjectsState {
    projects:ProjectInterface[] | [];
    setProjects: (projects:ProjectInterface[]) => void;
    actualProject:ProjectInterface | null;
    setActualProject: (projects:ProjectInterface) => void;
    viewables:any[];
    setViewables: (viewables:any[]) => void;
    actualProperties:any;
    setActualProperties: (actualProperties:any) => void;
    optionV1: string;
    setOptionV1: (opt:string) => void;
    actualModel:any;
    setActualModel: (model:any) => void;
    actualViews:ViewInterface[] | null;
    setActualViews: (views:any) => void;
}

export const useBimProjectsStore = create<BimProjectsState>()((set) => ({
    projects:[],
    setProjects: (projects:ProjectInterface[]) => set({ projects:projects }),
    actualProject:null,
    setActualProject: (project:ProjectInterface) => set({ actualProject:project }),
    viewables:[],
    setViewables: (viewables:any[])  => set({ viewables:viewables }),
    actualProperties:[],
    setActualProperties: (actualProperties:any[])  => set({ actualProperties:actualProperties }),
    optionV1:'Home',
    setOptionV1:(opt:string) => set({ optionV1:opt }),
    actualModel:{name:'default',
        file:'default',
        urn:'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkhKRDg1b2VSUUxhWExOcGtNRG42eFE/dmVyc2lvbj0x',
        source:'Bim360',
        isProjectModel:false},
    setActualModel: (model:any) => set({ actualModel:model }),
    actualViews:null,
    setActualViews: (views:any) => set({ actualViews:views }),

}))

