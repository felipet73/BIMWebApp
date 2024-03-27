
import { create } from 'zustand'


interface optionModel {
    optionModel:string;
    setOptionModel: (optionModel:string) => void;
    optionModelTipo:string;
    setOptionModelTipo: (optionModelTipo:string) => void;

}

export const useOptionModelStore = create<optionModel>()((set) => ({
    optionModel:'Gantt',
    setOptionModel: (optionModel:string) => set({ optionModel:optionModel }),
    optionModelTipo:'Autodesk',
    setOptionModelTipo: (optionModelTipo:string) => set({ optionModelTipo:optionModelTipo })

}))