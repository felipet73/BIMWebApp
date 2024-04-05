
import { create } from 'zustand'

export interface RequirementInterface{
    id:string;
    name:string;    
    descripcion?:string;
    type:string;
    dateCreated:Date;
    point?:number[];  
    camera?:number[];
    images?:string[];
    docs?:string[];
    ids:string[];
    project:string;
    models:string[];
    user:string;
    to?:string[];
    Childs?:RequirementInterface[];
}



export interface CommentInterface{
    id:string;
    name:string;    
    descripcion?:string;
    type:string;
    dateCreated:Date;
    point?:number[];  
    camera?:number[];
    images?:string[];
    docs?:string[];
    ids:string[];
    project:string;
    models:string[];
    user:string;
    to?:string[];
    Childs?:CommentInterface[];
}

export interface IssueInterface{
    id:string;
    name:string;    
    descripcion?:string;
    type:string;
    status:string;
    dateCreated:Date;
    dateFinish:Date;
    point?:any;  
    camera?:any;
    
    document?:string[];
    documents?:string[];
    tasks:string[];
    project:string;
    model:any;
    user:string;
    to?:string[];
    Childs?:any[];
}

export interface listInterface{
    id:string;
    name:string;
    dateCreated:Date;
    descripcion?:string;
    ids:string[];
    project:string;
    models:string[];
    type:string;
    Childs?:listInterface[];
    user:string;
    to?:string[];
}

export interface SelectionInterface{
    id:string;
    name:string;
    dateCreated:Date;
    descripcion?:string;
    ids:string[];
    //image:string;
    project:string;
    models:string[];
    type:string;
    Childs?:SelectionInterface[];
    user:string;
    to?:string[];
}


export interface ViewInterface{
    id:string;
    name:string;
    datecreated:Date;
    description?:string;
    ids:string[];
    image?:string;
    type:string;
    user:any;
    to?:any[];
}

export interface FolderViewInterface{
    id:string;
    name:string;
    datecreated:Date;
    description?:string;
    project:string;
    model:string;
    views?:ViewInterface[];
    user:any;
    to?:any[];
}


export interface ModelInterface{
    id:string;
    name:string;
    dateCreated:Date;
    file:string;
    descripcion?:string;
    image?:string;
    urn:string;
    main?:boolean;
    open?:boolean;
    defaultView?:string;
}

export interface ProjectInterface {
    id:string;
    name:string;
    dateCreated:Date;
    descripcion?:string;
    image?:string;
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
    actualSelections:SelectionInterface[] | null;
    setActualSelections: (selections:any) => void;
    actualLists:listInterface[] | null;
    setActualLists: (lists:any) => void;

    actualIssues:IssueInterface[] | null;
    setActualIssues: (issues:any) => void;

    /*actualComments:CommentInterface[] | null;
    setActualComments: (comments:any) => void;
    actualRequirements:RequirementInterface[] | null;
    setActualRequirements: (requirements:any) => void;*/

    actualIssue:IssueInterface | null;
    setActualIssue: (issue:any) => void;
    setPointsIssue: (points:any) => void;
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
    actualSelections:null,
    setActualSelections: (selections:any) => set({ actualSelections:selections }),
    actualLists:null,
    setActualLists: (lists:any) => set({ actualLists:lists }),
    actualIssues:null,
    setActualIssues: (issues:any) => set({ actualIssues:issues }),
    /*actualComments:null,
    setActualComments: (comments:any) => set({ actualComments:comments }),
    actualRequirements:null,
    setActualRequirements: (requirements:any) => set({ actualRequirements:requirements }),*/

    actualIssue:null,
    setActualIssue: (issue:any) => set({ actualIssue:issue }),
    //setPointsIssue: (points:any) => set( (state:any) => ( state.actualIssue: { ...state.actualIssue, point:points.point, camera:points.camera } ) ),
    setPointsIssue: (points:any) => set( (state:any) => ({ actualIssue: ({...state.actualIssue, point:points.point, camera:points.camera  }) }) ),
}))

