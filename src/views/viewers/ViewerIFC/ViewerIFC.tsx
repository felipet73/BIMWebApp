import {useEffect, useContext} from 'react';
//import { downloadZip } from "client-zip";
import { useViewerIFCStore } from '../../../stores';
import { GlobalContext } from '../../../context/GlobalContext';
import { IFCContext } from './context/ifcviewer/IFCContext';
import * as OBC from 'openbim-components';
//import { WEBIFC } from "web-ifc";
//import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"

export const ViewerIFC =()=>{

    const selectedModels = useViewerIFCStore(store => store.selectedModels);
    const selectedModelsIFC = useViewerIFCStore(store => store.selectedModelsIFC);
    const selectedProperties = useViewerIFCStore(store => store.selectedProperties);
    //const { viewerCIFC } = useContext( GlobalContext );
    const { init, fragments, components, mainToolbar, fragmentIfcLoader, scene } = useContext( IFCContext );
    const resizing = useViewerIFCStore(store => store.resizing);
    const setResizing = useViewerIFCStore(store => store.setResizing);
    /*const excludedCats = [
        WEBIFC.IFCTENDONANCHOR,
        WEBIFC.IFCREINFORCINGBAR,
        WEBIFC.IFCREINFORCINGELEMENT,
        ];
        for (const cat of excludedCats) {
        fragmentIfcLoader.settings.excludedCategories.add(cat);
        }*/
    useEffect(()=>{
      const elem = document.querySelector(".ajustaViewer");
      if (elem){
          const hijo = elem?.firstChild as HTMLDivElement;
          hijo!.setAttribute('style', 'height: 100%');    
      }
      let container:HTMLDivElement|null = document.getElementById('ifcCont') as HTMLDivElement;
      init(container);
    },[])

    useEffect(()=>{
      if (resizing && components?.renderer) components.renderer?.resize();
      setResizing(false);
    },[resizing])

    useEffect(()=>{


      if (selectedModels!==null){
        (async()=>{
            if(fragments.groups.length) return;
            const buffer = new Uint8Array(selectedModels);
            
            const group = await fragments.load(buffer);
            console.log(buffer)
            console.log(group)
            fragments.load(buffer); 
            
            
            //components.renderer.resize();
            group.setLocalProperties(selectedProperties);
            console.log(selectedProperties)
            //const highlighter = new OBC.FragmentHighlighter(components, fragments);
            try{
              const classifier = new OBC.FragmentClassifier(components);
              classifier.byStorey(group);
              classifier.byEntity(group);
  
              const modelTree = new OBC.FragmentTree(components);
              await modelTree.init();
              modelTree.update(['storeys', 'entities']);

              const highlighter = new OBC.FragmentHighlighter(components);
              highlighter.setup();  
              highlighter.outlineEnabled = true;
              highlighter.updateHighlight();  
              components.renderer.postproduction.customEffects.outlineEnabled = true;            
              //const postproduction = components.renderer.postproduction; 
              const propsProcessor = new OBC.IfcPropertiesProcessor(components);
              
              
              const propsManager = new OBC.IfcPropertiesManager(components);
              propsProcessor.propertiesManager = propsManager;              
              
              
              propsProcessor.uiElement.get("propertiesWindow").visible = true;
              propsProcessor.process(group);
  
              
              const highlighterEvents = highlighter.events;
              highlighterEvents.select.onClear.add(() => {
              propsProcessor.cleanPropertiesList();
              });
              highlighterEvents.select.onHighlight.add(
                (selection) => {
                  const fragmentID = Object.keys(selection)[0];
                  const expressID = [...selection[fragmentID]][0];
                  console.log(expressID);
                  let group
                  for (const group1 of fragments.groups) {
                  for(const [_key, value] of group1.keyFragments) {
                  if(value === fragmentID) {
                    group = group1;
                  break;
                  }
                  }
                  }
                  if(group) {
                    console.log(group)
                    propsProcessor.renderProperties(fragments.groups[0], expressID);
                  }  
                })

                modelTree.onSelected.add(({ items, visible }) => {
                  if(visible) {
                  highlighter.highlightByID('select', items, true, true);
                  }
                  });
                  modelTree.onHovered.add(({ items, visible }) => {
                  if(visible) {
                  highlighter.highlightByID('hover', items);
                  }
                  });

                components.ui.addToolbar(mainToolbar);
                mainToolbar.addChild(propsProcessor.uiElement.get("main"));  
                //components.ui.addToolbar(mainToolbar);
                mainToolbar.addChild(modelTree.uiElement.get("main"));
                //components.ui.addToolbar(toolbar);
                
                //mainToolbar.addChild(modelTree.uiElement.get("main"));
                //components.ui.addToolbar(toolbar);                
  
            }catch(err)
            {}
            console.log(components)
            
            
            /*
            highlighterEvents.select.onHighlight.add(
            (selection) => {
            const fragmentID = Object.keys(selection)[0];
            const expressID = [...selection[fragmentID]][0];
            let model
            for (const group of fragments.groups) {
            for(const [_key, value] of group.keyFragments) {
            if(value === fragmentID) {
            model = group;
            break;
            }
            }
            }
            if(model) {
            propsProcessor.renderProperties(model, expressID);
            }
            }
            );*/
            //const mainToolbar = new OBC.Toolbar(components);

        })();
    }   

        //let container:any; 
        //let vez=0;
        /*console.log(viewerCIFC.current);
        if (viewerCIFC.current===null || viewerCIFC.current===undefined){
            //container= document.getElementById('ifcCont');
            viewerCIFC.current=container;
            console.log(viewerCIFC.current);
        }else {

            container=viewerCIFC.current;
            vez=1;

        }*/

        


       /* const convertIfcToFragments= async (ifc: File) => {
            //let fragments = new OBC.Fragments(components);
            fragments.ifcLoader.settings.optionalCategories.length = 0;
            fragments.ifcLoader.settings.wasm = {
              path: "../../",
              absolute: false,
            };
            fragments.ifcLoader.settings.webIfc = {
              COORDINATE_TO_ORIGIN: true,
              USE_FAST_BOOLS: true,
            };
            const url = URL.createObjectURL(ifc) as any;
            const model = await fragments.ifcLoader.load(url);
            const file = await serializeFragments(model);
            fragments.dispose();
            (fragments as any) = null;
            return file as File;
          }

          const serializeFragments = async (model: any) => {
            const files = [];
            for (const frag of model.fragments) {
              const file = await frag.export();
              files.push(file.geometry, file.data);
            }
        
            files.push(new File([JSON.stringify(model.properties)], "properties.json"));
            files.push(
              new File(
                [JSON.stringify(model.levelRelationships)],
                "levels-relationship.json"
              )
            );
            files.push(new File([JSON.stringify(model.itemTypes)], "model-types.json"));
            files.push(new File([JSON.stringify(model.allTypes)], "all-types.json"));
            files.push(
              new File(
                [JSON.stringify(model.floorsProperties)],
                "levels-properties.json"
              )
            );
            files.push(
              new File(
                [JSON.stringify(model.coordinationMatrix)],
                "coordination-matrix.json"
              )
            );
            files.push(
              new File(
                [JSON.stringify(model.expressIDFragmentIDMap)],
                "express-fragment-map.json"
              )
            );
        
            return downloadZip(files).blob();
          }*/
        

        
        
        /*const charg1= (async()=>{
        //const fragments = new OBC.FragmentManager(components);
        const file = await fetch("../../../../resources/small.frag");
        const dataBlob = await file.arrayBuffer();
        const buffer = new Uint8Array(dataBlob);
        const model = await fragments.load(buffer);
        const properties = await fetch("../../../../resources/small.json");
        const props = await properties.json();
        model.setLocalProperties(props);

        const propsProcessor = new OBC.IfcPropertiesProcessor(components);
        const propsManager = new OBC.IfcPropertiesManager(components);
        propsProcessor.propertiesManager = propsManager;
        
        propsProcessor.process(model);
        propsManager.onRequestFile.add(async () => {
        const fetched = await fetch("../../../../resources/small.ifc");
        const buffer = await fetched.arrayBuffer()
        const ifc = await propsManager.saveToIfc(model, new Uint8Array(buffer));
        const a = document.createElement("a");
        const url = URL.createObjectURL(new Blob([ifc]));
        a.href = url;
        a.download = model.name;
        a.click();
        URL.revokeObjectURL(url);
        })

        //const highlighter:any = new OBC.FragmentHighlighter(components, fragments);
        const highlighter:any = new OBC.FragmentHighlighter( components);
        highlighter.setup();
        components.renderer.postproduction.customEffects.outlineEnabled = true;
        highlighter.outlinesEnabled = true;
        const highlighterEvents = highlighter.events;
        highlighterEvents.select.onClear.add(() => {
        propsProcessor.cleanPropertiesList();
        });

        highlighterEvents.select.onHighlight.add(
            (selection:any) => {
            const fragmentID = Object.keys(selection)[0];
            const expressID = [...selection[fragmentID] as any][0];
            let model
            for (const group of fragments.groups) {
            for(const [_key, value] of group.keyFragments as any) {
            if(value === fragmentID) {
            model = group;
            break;
            }
            }
            }
            if(model) {
            propsProcessor.renderProperties(model, expressID);
            }
            }
            );

            const mainToolbar = new OBC.Toolbar(components);
            components.ui.addToolbar(mainToolbar);
            mainToolbar.addChild(propsProcessor.uiElement.get("main"));

        })()*/

        //fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
        //fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
        //const toolbar = new OBC.Toolbar(components);
        //components.ui.addToolbar(toolbar);
        
    },[selectedModels])



    useEffect(()=>{


      if (selectedModelsIFC!==null){
        (async()=>{
            if(fragments.groups.length) return;
            const buffer = new Uint8Array(selectedModelsIFC);
            
            //const group = await fragments.load(buffer);
            console.log(buffer)
            //console.log(group)
            //fragments.load(buffer); 
            const model = await fragmentIfcLoader.load(buffer, "example");
            scene.add(model);


            async function exportFragments() {
              //if (!fragments.groups.length) return;
              const group = fragments.groups[0];
              const data = fragments.export(group);
              const blob = new Blob([data]);
              const fragmentFile = new File([blob], 'small.frag');
              const files = [];
              files.push(fragmentFile);
              const properties = group.getLocalProperties();
              if (properties) {
              //files.push(new File([JSON.stringify(properties)], 'small.json'));
              group.setLocalProperties(([JSON.stringify(properties)]));
              }
              //const result = await downloadZip(files).blob();
              //result.name = 'example';
              //download(result);
              }
            
            //components.renderer.resize();
            //group.setLocalProperties(selectedProperties);
            //console.log(selectedProperties)
            //const highlighter = new OBC.FragmentHighlighter(components, fragments);
            try{
              const classifier = new OBC.FragmentClassifier(components);
              classifier.byStorey(model);
              classifier.byEntity(model);
  
              const modelTree = new OBC.FragmentTree(components);
              await modelTree.init();
              modelTree.update(['storeys', 'entities']);

              const highlighter = new OBC.FragmentHighlighter(components);
              highlighter.setup();  
              highlighter.outlineEnabled = true;  
              highlighter.updateHighlight();                
              components.renderer.postproduction.customEffects.outlineEnabled = true;            
              //const postproduction = components.renderer.postproduction; 
              const propsProcessor = new OBC.IfcPropertiesProcessor(components)
              propsProcessor.uiElement.get("propertiesWindow").visible = true;
              propsProcessor.process(model);
  
  
              const highlighterEvents = highlighter.events;
              highlighterEvents.select.onClear.add(() => {
              propsProcessor.cleanPropertiesList();
              });
              highlighterEvents.select.onHighlight.add(
                (selection) => {
                  const fragmentID = Object.keys(selection)[0];
                  const expressID = [...selection[fragmentID]][0];
                  console.log(expressID);
                  let group
                  for (const group1 of fragments.groups) {
                  for(const [_key, value] of group1.keyFragments) {
                  if(value === fragmentID) {
                    group = group1;
                  break;
                  }
                  }
                  }
                  if(group) {
                    console.log(group)
                  propsProcessor.renderProperties(group, expressID);
                  }  
                })

                modelTree.onSelected.add(({ items, visible }) => {
                  if(visible) {
                  highlighter.highlightByID('select', items, true, true);
                  console.log('Items',items)
                  }
                  });
                  modelTree.onHovered.add(({ items, visible }) => {
                  if(visible) {
                  highlighter.highlightByID('hover', items);
                  }
                  });

                
                components.ui.addToolbar(mainToolbar);
                mainToolbar.addChild(propsProcessor.uiElement.get("main"));  
                mainToolbar.addChild(modelTree.uiElement.get("main"));

            }catch(err)
            {}
            console.log(components)
            
            
            

        })();
    }   

       
        
    },[selectedModelsIFC])


    /*async function loadIfcAsFragments() {
        const file = await fetch('../../../resources/small.ifc');
        const data = await file.arrayBuffer();
        const buffer = new Uint8Array(data);
        const model = await fragmentIfcLoader.load(buffer, "example");
        scene.add(model);
        }*/

        /*async function exportFragments() {
            if (!fragments.groups.length) return;
            const group = fragments.groups[0];
            const data = fragments.export(group);
            const blob = new Blob([data]);
            const fragmentFile = new File([blob], 'small.frag');
            const files = [];
            files.push(fragmentFile);
            const properties = group.getLocalProperties();
            if (properties) {
            files.push(new File([JSON.stringify(properties)], 'small.json'));
            }
            const result = await downloadZip(files).blob();
            result.name = 'example';
            download(result);
            }    */
            
           /* function download(file:any) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(file);
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                link.remove();
                }    */
                
               /* function disposeFragments() {
                    fragments.dispose();
                    }                */

    return(
        <div style={{ height:'100%' }} id='ifcCont'>

        </div>
    )
}