
import { create } from 'zustand'


interface ItemInterface{
    Name: string;
    dbId: string;
}

export interface selectedItemsInterface{
    DataModel:ItemInterface[] | [];
    DataList:ItemInterface[] | [];
}

interface ViewerState {
    selectedItems:selectedItemsInterface;
    setSelectedItems: (selectedItems:selectedItemsInterface) => void;
    modeDetails:string;
    setModeDetails: (modeDetails:string) => void;
    modeDetailsIssues:string;
    setModeDetailsIssues: (modeDetailsIssues:string) => void;
    modeDetailsProducts:string;
    setModeDetailsProducts: (modeDetailsProducts:string) => void;


    modeIssues:any;
    setModeIssues: (modeIssues:any) => void;

}
/*const obj={
    DataA:[{Name:'Nombre2', dbId:'0101'},{Name:'Nombre3', dbId:'0105'}],
    DataB:[{},{}]
}*/

export const useViewerStore = create<ViewerState>()((set) => ({
    selectedItems:{
        DataModel:[],
        DataList:[]
    },
    setSelectedItems: (selectedItems:selectedItemsInterface) => set({ selectedItems:selectedItems }),
    modeDetails:'ProjectViews',
    setModeDetails: (modeDetails:string) => set({modeDetails:modeDetails}),
    modeDetailsIssues:'ProjectIssues',
    setModeDetailsIssues: (modeDetailsIssues:string) => set({modeDetailsIssues:modeDetailsIssues}),
    modeDetailsProducts:'ProjectSuppliers',
    setModeDetailsProducts: (modeDetailsProducts:string) => set({modeDetailsProducts:modeDetailsProducts}),

    modeIssues:{
        issues:false,
        comments:false,
        requirements:false
    },
    setModeIssues: (modeIssues:any) => set({modeIssues:modeIssues}),

}))