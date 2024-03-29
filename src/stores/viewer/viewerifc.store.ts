
import { create } from 'zustand'




interface ViewerIFCState {
    selectedModels:any;
    setSelectedModels: (selectedModels:any) => void;
    selectedModelsIFC:any;
    setSelectedModelsIFC: (selectedModelsIFC:any) => void;
    selectedProperties:any;
    setSelectedProperties: (selectedProperties:any) => void;
    resizing:boolean;
    setResizing: (resizing:any) => void;
}

export const useViewerIFCStore = create<ViewerIFCState>()((set) => ({
    selectedModels:null,
    setSelectedModels: (selectedModels:any) => set({ selectedModels:selectedModels }),
    selectedModelsIFC:null,
    setSelectedModelsIFC: (selectedModelsIFC:any) => set({ selectedModelsIFC:selectedModelsIFC }),
    selectedProperties:null,
    setSelectedProperties: (selectedProperties:any) => set({ selectedProperties:selectedProperties }),
    resizing:false,
    setResizing: (resizing:any) => set({ resizing:resizing }),
}))