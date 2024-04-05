//import { RefObject, useRef } from 'react';
import { useRef } from 'react';
import { GlobalContext } from './GlobalContext';
import $ from 'jquery';
import { useViewerStore, useBimProjectsStore} from '../stores';

/*export interface GlobalState {
    viewerC:RefObject<Autodesk.Viewing.GuiViewer3D | null>
}*/

//const INITIAL_STATE = {viewerC:{ current:null }}
const INITIAL_STATE1 = {actualViewables:{ current:[] }}
const INITIAL_STATE2 = {viewerCIFC:{ current:null }}
const INITIAL_STATE3 = {modeSVF:{ current:false }}
const INITIAL_STATE4 = {modeSelect:{ current:false }}
const INITIAL_STATE5 = {modeIssues:{ current:'none' }}



interface Props {
    children: JSX.Element | JSX.Element[];
}

export const GlobalProvider = ({children}:Props) => {

    //const viewerC = INITIAL_STATE;
    const actualViewables = INITIAL_STATE1;
    const viewerCIFC = INITIAL_STATE2;
    const modeSVF= INITIAL_STATE3;
    const modeSelect= INITIAL_STATE4;
    //const modeIssues= INITIAL_STATE5;
    const modeIssues = useRef<string>('none');
    //const modeIssues1 = useViewerStore(state => state.modeIssues);
    const setPointsIssue = useBimProjectsStore(store=>store.setPointsIssue);

    const viewerC:any = useRef(null);

    const acting:any = useRef(false);
    const showing:any = useRef(false);
    const last:any = useRef(0);
    const div = useRef<HTMLDivElement | null>(null);

    const issues = useRef<any>([
        {
            position: {
                x: 2.590268290876452,
                y: 1.20446526068116,
                z: 2.355262787057484,
            },
            type: "t1",
            sensorTypes: ["co2", "temperature"],
        },
        {
            position: {
                x: -97.94954550038506,
                y: -50.21776820050724,
                z: 12.444056161946492,
            },
            type: "t2",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 162.61,
                y: 75.54,
                z: -0.61,
            },
            type: "t3",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 48.53,
                y: -48.27,
                z: -19.24,
            },
            type: "t4",
            sensorTypes: ["temperature"],
        },
    
    ]);

    const comments = useRef<any>([
        {
            position: {
                x: 1.590268290876452,
                y: 0.20446526068116,
                z: 0.355262787057484,
            },
            type: "t1",
            sensorTypes: ["co2", "temperature"],
        },
        {
            position: {
                x: -37.94954550038506,
                y: -10.21776820050724,
                z: 12.444056161946492,
            },
            type: "t2",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 30.61,
                y: 25.54,
                z: -10.61,
            },
            type: "t3",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 98.53,
                y: -8.27,
                z: -9.24,
            },
            type: "t4",
            sensorTypes: ["temperature"],
        },
    
    ]);

    const requirements = useRef<any>([
        {
            position: {
                x: 1.590268290876452,
                y: 0.20446526068116,
                z: 0.355262787057484,
            },
            type: "t1",
            sensorTypes: ["co2", "temperature"],
        },
        {
            position: {
                x: -37.94954550038506,
                y: -10.21776820050724,
                z: 12.444056161946492,
            },
            type: "t2",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 30.61,
                y: 25.54,
                z: -10.61,
            },
            type: "t3",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 98.53,
                y: -8.27,
                z: -9.24,
            },
            type: "t4",
            sensorTypes: ["temperature"],
        },
    
    ]);

    const newTask = useRef<any>({
        position: {
            x: 98.53,
            y: -8.27,
            z: -9.24,
        },
        type: "t4",
        sensorTypes: ["temperature"],
    });

    var ponerdato = true;
    

    const onItemHovering =(event:any) => {
        //alert();
        //const div = document.createElement("div");  // <div></div>
        if (!div.current){
            div.current = document.createElement("div");  // <div></div>
            const app = document.getElementById('root'); // <div id="app">App</div>
            const div1 = document.createElement("div1");  // <div></div>
            const div2 = document.createElement('div2'); // <div id="app">App</div>

            //alert(event.point);
            //alert(viewer.model.getUpVector());
             //const currAppState = appStateRef.current;
             div1.style.fontSize = '1rem';

             div.current.appendChild(div1);
             div1.textContent = 'Ejemplo ' + event.dbId;
             div1.style.textAlign = 'center';
             //div.textContent = "Ejemplo "+ event.dbId;                // <div>Ejemplo</div>
             div2.innerHTML = 'Otro dato';
             //div1.classList.add('card');
             //div1.classList.add('card-header');
             div.current.classList.add('element');
 
             div1.classList.add('element');
             div1.style.fontSize = '0.8rem';
             //div1.style.border = '1px 1px 1px 2px rgba(255,255,255,0.95)';
             //div1.style.backgroundColor = 'rgba(1,1,1,0.85)';
             //div1.style.width = '100%';
             //div.appendChild(div2);
             div2.style.fontSize = '0.7rem';
             //div.style.backgroundColor = 'rgba(1,1,1,0.65)';
             //div.style.alignContent = 'center';
             div.current.style.borderRadius = '2px 8px 8px 50px';
             div.current.style.position = 'absolute';
             div.current.style.zIndex = '999';
             div.current.style.fontSize = '2rem';
             div.current.style.width = '180px';
             div.current.style.height = '120px';
  
    
             app!.insertAdjacentElement("beforebegin", div.current);

        }
        //div.current.style.display = 'none';
        var posX = event.originalEvent.normalizedX;
        var posY = event.originalEvent.normalizedY;
        //posZ=event.point.z;
        if (event.dbId) {
            if (showing.current && last.current===event.dbId) {
                //showing.current=false;
                return;
            }
            showing.current=true;
    
            
            last.current=event.dbId;
            console.log("Show tooltip here", event);
            console.log("Show tooltip here", event.originalEvent);
    
            //alert(event.dbId);
            //console.log(devices[event.dbId].position.x);
            //alert(devices[event.dbId-1].position.x);
            //alert(event.originalEvent.clientX);
            //const div = document.createElement("div");
            
            div.current.textContent = "Msj. "+event.dbId;
            var tempX = event.originalEvent.clientX + document.body.scrollLeft;
            var tempY = event.originalEvent.clientY + document.body.scrollTop;
            /*const app = document.createElement("div"); // <div></div>
            app.id = "app"; // <div id="app"></div>
            app.appendChild(div);*/
            //var ClientRect = div.getBoundingClientRect();
            /*var ClientRect = elemento.getBoundingClientRect();
            return { //objeto
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
                }
                */

            //div2.classList.add('card-title');
            //div3.classList.add('card-header');
            //div.style.top = event.originalEvent.pageY;
            //div.style.left = event.originalEvent.pageX;
            //div.style.top = event.originalEvent.pageY+'px';
            div.current.style.top = (event.originalEvent.pageY - 160) + 'px';
            div.current.style.left = (event.originalEvent.pageX - 65) + 'px';
            //div.current.style.backgroundColor = 'rgba(46,46,83,' + ( Math.random() * 0.5 + 0.25 ) + ')';
            div.current.style.backgroundColor = 'rgba(46,46,83,0.9)';
            div.current.style.color = 'rgba(255,255,200,1)';
            //div.style.left = posX+'px';
            div.current.style.display = 'block';
            //div.style.visibility = 'block';
            
            setTimeout(() => {
                div.current!.style.display = 'none';
                showing.current=false;
                last.current=0;
            }, 1800);
            //determina un margen de pixels del div al raton
            //div.insertAdjacentElement("beforebegin", div1);
            //div.insertAdjacentElement("beforebegin", div2);
            /* window.currentMouseX = e.pageX;
             window.currentMouseY = e.pageY;*/
            //La variable IE determina si estamos utilizando IE
            //Si no utilizamos IE capturamos el evento del mouse
            /*var tempX = 0;
            var tempY = 0;
            //if (IE) { //para IE
                tempX = event.clientX + document.body.scrollLeft;
                tempY = event.clientY + document.body.scrollTop;*/
            /*} else { //para netscape
                tempX = event.pageX;
                tempY = event.pageY;
            }
            if (tempX < 0) { tempX = 0; }
            if (tempY < 0) { tempY = 0; }*/
            //modificamos el valor del id "posicion" para indicar la posicion del mouse
            //document.getElementById('posicion').innerHTML = "PosX = " + tempX + " | PosY = " + tempY;
            /*document.getElementById('flotante').style.top = tempY;
            document.getElementById('flotante').style.left = tempX;
            document.getElementById('flotante').style.display = 'block';*/
            /*if (event.hovering && currAppState.dbId2DeviceIdMap) {
                const deviceId = currAppState.dbId2DeviceIdMap[event.dbId];
                const device = currAppState.session.dataStore.getDevice(deviceId);

                if (device) {
                    const position = device.position;
                    const mappedPosition = currAppState.viewer.impl.worldToClient(position);

                    // Accounting for vertical offset of viewer container.
                    const vertificalOffset = event.originalEvent.clientY - event.originalEvent.offsetY;

                    setHoveredDeviceInfo({
                        id: deviceId,
                        xcoord: mappedPosition.x,
                        ycoord: mappedPosition.y + vertificalOffset - SpriteSize / viewer.getWindow().devicePixelRatio,
                    });
                }
            } else {
                if (hoveredDeviceInfoRef.current && hoveredDeviceInfoRef.current.id != null) {
                    setHoveredDeviceInfo({});
                }
            }*/
            /*const positionx = event.originalEvent.clientX;
            const positiony = event.originalEvent.clientY;
             var hitTest = this.viewer.clientToWorld(event.originalEvent.clientX, event.originalEvent.clientY, true);
             if (hitTest) {
                 let x = hitTest.point.x;
                 let y = hitTest.point.y;
                 let z = hitTest.point.z;
             }*/


            /*var screenPoint = {
                x: event.clientX,
                y: event.clientY
            };

            //get the selected 3D position of the object

            //viewer canvas might have offset from the webpage.

            let viewer_pos = viewer.container.getBoundingClientRect();
            var hitTest = viewer.impl.hitTest(screenPoint.x - viewer_pos.x,
                screenPoint.y - viewer_pos.y, true);

            if (hitTest) {
                alert(hitTest.intersectPoint.x+" "+hitTest.intersectPoint.y);
                /*drawPushpin({
                    x: hitTest.intersectPoint.x,
                    y: hitTest.intersectPoint.y,
                    z: hitTest.intersectPoint.z
                });*/
            //}
            //const mappedPosition = viewer.impl.worldToClient(position);
        }
    }

    const onItemClick=(event:any) => {
        //alert('click');
        //alert(devices[event.dbId - 1].position.x);
        if (event.dbId>0){
            acting.current=true;
            console.log('>>>>>>>>>',event.dbId);
            //alert(event.dbId);
            
        }
            
    }    


    const onModelLoaded1 = async(viewer:any) => {
        

        console.log('ModeIsuues is in ...>>',modeIssues.current);

        const dataVizExt = viewer.getExtension("Autodesk.DataVisualization");
        dataVizExt.removeAllViewables();
        const DATAVIZEXTN = Autodesk.DataVisualization?.Core;

        if (!DATAVIZEXTN) { return; }
        var styleMap:any;
        const SensorStyleDefinitions = {
            co2: {
                url: `uno.svg`,
                color: 0xffffff,
            },
            temperature: {
                url: `uno.svg`,
                color: 0xffffff,
            },
            default: {
                url: `uno.svg`,
                color: 0xffffff,
            },
        };

        // Create model-to-style map from style definitions.
        /*Object.entries(SensorStyleDefinitions).forEach(([type, styleDef]) => {

            styleMap['default'] = new DATAVIZEXTN.ViewableStyle(
                DATAVIZEXTN?.ViewableType.SPRITE,
                new THREE.Color(0xffffff) ,
                `uno.svg`
            );
        });*/

        /*styleMap['default'] = new DATAVIZEXTN.ViewableStyle(
            DATAVIZEXTN?.ViewableType.SPRITE,
            new THREE.Color(0xffffff) ,
            `uno.svg`
        );*/

        //div.current = document.createElement("div");  // <div></div>
        
        /*const app = document.getElementById('root'); // <div id="app">App</div>
        const div1 = document.createElement("div1");  // <div></div>
        const div2 = document.createElement('div2'); // <div id="app">App</div>
        const div3 = document.createElement("div3");  // <div></div>
        const div4 = document.createElement('div4'); // <div id="app">App</div>*/
        
        const viewableData = new DATAVIZEXTN.ViewableData();
        /*await viewableData.finish();
        dataVizExt.addViewables(viewableData);
        dataVizExt.removeAllViewables();*/
        
        let startId = 1;
        if (modeIssues.current==='Issues'){
            viewableData.spriteSize = 40;
            issues.current.filter((x:any)=>x.type==='t1').forEach((device:any) => {
                //let style = styleMap[device?.type] || styleMap["default"];
                let style:any;
                //if (device.type==='t1'){
                    //style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
                //}
    
                //if (device.type==='t2'){
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/issue.svg`);
                //}
                /*if (device.type==='t3'){
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/Ayuda.svg`);
                }
                if (device.type==='t4'){
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/aye.svg`);
                }
                if (device.type==='t5'){
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/check.svg`);
                }*/
    
                //let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            issues.current.filter((x:any)=>x.type==='t2').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/issue.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            issues.current.filter((x:any)=>x.type==='t3').forEach((device:any) => {
                //let style1 = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/Ayuda.svg`);
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/gps_pin.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
            issues.current.filter((x:any)=>x.type==='t4').forEach((device:any) => {
                //let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/gps_pin.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });

            if (newTask.current){                
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xFC0440),`/assets/svg/gps_pin.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(newTask.current.position.x, newTask.current.position.y, newTask.current.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            }
    
        }
        if (modeIssues.current==='Comments'){
            viewableData.spriteSize = 20;
            comments.current.filter((x:any)=>x.type==='t1').forEach((device:any) => {
                let style:any;
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xFFF2),`/assets/svg/message.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            comments.current.filter((x:any)=>x.type==='t2').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0x23F9),`/assets/svg/message.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            comments.current.filter((x:any)=>x.type==='t3').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0x1EF3F9),`/assets/svg/message.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
            comments.current.filter((x:any)=>x.type==='t4').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0x8BB58A  ),`/assets/svg/message.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });

            if (newTask.current){                
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xFC0440),`/assets/svg/message.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(newTask.current.position.x, newTask.current.position.y, newTask.current.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            }

        }

        if (modeIssues.current==='Requirements'){
            viewableData.spriteSize = 40;
            requirements.current.filter((x:any)=>x.type==='t1').forEach((device:any) => {
                let style:any;
                    style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/ask.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            requirements.current.filter((x:any)=>x.type==='t2').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0x195716),`/assets/svg/ask.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
    
            requirements.current.filter((x:any)=>x.type==='t3').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/eco_nature.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
            requirements.current.filter((x:any)=>x.type==='t4').forEach((device:any) => {
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/eco_nature.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            });
            if (newTask.current){                
                let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xFC0440),`/assets/svg/eco_nature.svg`);
                const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(newTask.current.position.x, newTask.current.position.y, newTask.current.position.z), style, startId)!;
                viewableData.addViewable(viewable);
                startId++;
            }

        }


        await viewableData.finish();
        if (!dataVizExt) return;
        dataVizExt.addViewables(viewableData);

/*
        const viewableData1 = new DATAVIZEXTN.ViewableData();
        viewableData1.spriteSize = 30;
        //let startId = 5;
        devices1.filter(x=>x.type==='t1').forEach((device) => {
            //let style = styleMap[device?.type] || styleMap["default"];
            let style:any;
            //if (device.type==='t1'){
                //style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
            //}

            //if (device.type==='t2'){
                style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/eco_nuevo.svg`);
            //}
            

            //let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
            const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
            viewableData1.addViewable(viewable);
            startId++;
        });

        devices1.filter(x=>x.type==='t2').forEach((device) => {
            let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/eco_nuevo.svg`);
            const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
            viewableData1.addViewable(viewable);
            startId++;
        });

        devices1.filter(x=>x.type==='t3').forEach((device) => {
            //let style1 = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/Ayuda.svg`);
            let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/config.svg`);
            const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
            viewableData1.addViewable(viewable);
            startId++;
        });
        devices1.filter(x=>x.type==='t4').forEach((device) => {
            //let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
            let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`/assets/svg/config.svg`);
            const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
            viewableData1.addViewable(viewable);
            startId++;
        });


        await viewableData1.finish();
        if (!dataVizExt) return;
        dataVizExt.addViewables(viewableData1);*/



        /*setTimeout(() => {
            dataVizExt.removeAllViewables();
        }, 3000);*/
        /**
         * Called when a user clicks on a Sprite Viewable
         * @param {Event} event 
         */
        
        /**
         *  Called when a user hovers over a Sprite Viewable 
         * @param {Event} event 
         */
        /*
        function onItemHovering(event:any) {
            console.log("Show tooltip here", event);
            console.log("Show tooltip here", event.originalEvent);
            div.style.display = 'none';
            posX = event.originalEvent.normalizedX;
            posY = event.originalEvent.normalizedY;
            if (event.dbId) {
                const div = document.createElement("div");
                div1.style.fontSize = '1rem';
                div.textContent = "Msj.";
                var tempX = event.originalEvent.clientX + document.body.scrollLeft;
                var tempY = event.originalEvent.clientY + document.body.scrollTop;
                div.appendChild(div1);
                div1.textContent = 'Ejemplo ' + event.dbId;
                div1.style.textAlign = 'center';
                //div.textContent = "Ejemplo "+ event.dbId;                // <div>Ejemplo</div>
                div2.innerHTML = 'Otro dato';
                //div1.classList.add('card');
                //div1.classList.add('card-header');
                div.classList.add('element');
                div1.classList.add('element');
                //div2.classList.add('card-title');
                //div3.classList.add('card-header');
                div1.style.fontSize = '0.8rem';
                //div1.style.border = '1px 1px 1px 2px rgba(255,255,255,0.95)';
                //div1.style.backgroundColor = 'rgba(1,1,1,0.85)';
                //div1.style.width = '100%';
                //div.appendChild(div2);
                div2.style.fontSize = '0.7rem';
                //div.style.backgroundColor = 'rgba(1,1,1,0.65)';
                //div.style.alignContent = 'center';
                div.style.borderRadius = '10px';
                div.style.position = 'absolute';
                div.style.zIndex = '999';
                div.style.fontSize = '1.7rem';
                div.style.width = '100px';
                div.style.height = '70px';
                //div.style.top = event.originalEvent.pageY;
                //div.style.left = event.originalEvent.pageX;
                //div.style.top = event.originalEvent.pageY+'px';
                div.style.top = (event.originalEvent.pageY - 80) + 'px';
                div.style.left = (event.originalEvent.pageX - 65) + 'px';
                div.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
                div.style.display = 'block';
                app!.insertAdjacentElement("beforebegin", div);
                setTimeout(() => {
                    div.style.display = 'none';    
                }, 1800);
            }

            //alert('show');
        }*/

       /* const DataVizCore = Autodesk.DataVisualization.Core;
        viewerC.current.removeEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
        viewerC.current.addEventListener(DataVizCore.MOUSE_CLICK, onItemClick);*/
        //viewerC.current.addEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);
        
    }


    
        

       

    const onMouseClick= (event:any)=> {
        if (acting.current){
            acting.current=false;
            return;
        }
        console.log('diste click');
        if (ponerdato){
            var screenPoint = {
                x: event.clientX,
                y: event.clientY
            };
            let viewer_pos = viewerC.current!.container.getBoundingClientRect();
            var hitTest = viewerC.current.impl.hitTest(screenPoint.x - viewer_pos.x,
                screenPoint.y - viewer_pos.y, true);
            
            let v_pos = viewerC.current.impl.clientToViewport(screenPoint.x - viewer_pos.x,
                screenPoint.y - viewer_pos.y);
                console.log('v_pos', v_pos);
            let test = viewerC.current.impl.hitTestViewport(v_pos, false);
                console.log('v_pos', test);
                /*const res:any = [];
                const vpVec = viewerC.current.impl.clientToViewport(event.canvasX, event.canvasY);
                 const dbId = viewerC.current.impl
                     .renderer()
                     .idAtPixel(vpVec.x, vpVec.y, res, [viewerC.current.impl.renderer().getOverlayIdTarget()]);
    
    
                 if (true) {
                     let test = viewerC.current.impl.hitTestViewport(vpVec, false);
                     console.log(test);
                 }*/


            if (hitTest) {
                drawPushpin({
                    x: hitTest.intersectPoint.x,
                    y: hitTest.intersectPoint.y,
                    z: hitTest.intersectPoint.z
                });
                removeEv(viewerC.current);    
            }else{
                drawPushpin({
                    x: v_pos.x,
                    y: v_pos.y,
                    z: v_pos.z
                });
                removeEv(viewerC.current);    
            }
        }
        
    }    
    function drawPushpin(pushpinModelPt:any) {
        //convert 3D position to 2D screen coordination
        var screenpoint = viewerC.current!.worldToClient(
            new THREE.Vector3(pushpinModelPt.x,
                pushpinModelPt.y,
                pushpinModelPt.z));
        //build the div container
        //alert(pushpinModelPt.x + ' ' + pushpinModelPt.y);
        newTask.current=
            {
                position: {
                    x: pushpinModelPt.x,
                    y: pushpinModelPt.y,
                    z: pushpinModelPt.z,
                },
                type: "t1",
                sensorTypes: ["co2", "temperature"],
            };
            console.log('point',newTask.current.position)
            const arreglo= viewerC.current.getViewArrayFromCamera();
            console.log('camera',arreglo)
        setPointsIssue({ point:newTask.current.position, camera:arreglo });
        /*if (modeIssues.current==='Issues')
        issues.current.push(
            {
                position: {
                    x: pushpinModelPt.x,
                    y: pushpinModelPt.y,
                    z: pushpinModelPt.z,
                },
                type: "t1",
                sensorTypes: ["co2", "temperature"],
            });
        if (modeIssues.current==='Comments')
            comments.current.push(
                {
                    position: {
                        x: pushpinModelPt.x,
                        y: pushpinModelPt.y,
                        z: pushpinModelPt.z,
                    },
                    type: "t1",
                    sensorTypes: ["co2", "temperature"],
                });
                if (modeIssues.current==='Requirements')
                requirements.current.push(
                    {
                        position: {
                            x: pushpinModelPt.x,
                            y: pushpinModelPt.y,
                            z: pushpinModelPt.z,
                        },
                        type: "t1",
                        sensorTypes: ["co2", "temperature"],
                    });*/
            
             /*var geom = new THREE.SphereGeometry(2, 2, 2);
             var material = new THREE.MeshLambertMaterial({ color: 0x3D6979  });
             var sphereMesh = new THREE.Mesh(geom, material);
             sphereMesh.position.set(pushpinModelPt.x, pushpinModelPt.y, pushpinModelPt.z);
             if (!viewerC.current.overlays.hasScene('custom-scene1')) {
                viewerC.current.overlays.addScene('custom-scene1');
                 //viewer.impl.scene.add('custom-scene');
             }
             viewerC.current.overlays.addMesh(sphereMesh as THREE.Object3D, 'custom-scene1');*/
        onModelLoaded1(viewerC.current);
    }    

    const init22 = (viewer:any) => {
        
        //$(viewer?.container).bind("click", onMouseClick);
        
        //viewer!.addEventListener('click', onMouseClick);

        viewer!.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function (rt:any) {
            //find out all pushpin markups
            var $eles = $("div[id^='mymk']");
            var DOMeles = $eles.get();
            for (var index in DOMeles) {
                //get each DOM element
                var DOMEle = DOMeles[index];
                var divEle = $('#' + DOMEle.id);
                //get out the 3D coordination
                var val = divEle.data('3DData');
                var pushpinModelPt = JSON.parse(val);
                //get the updated screen point
                var screenpoint = viewer!.worldToClient(new THREE.Vector3(
                    pushpinModelPt.x,
                    pushpinModelPt.y,
                    pushpinModelPt.z));
                //update the SVG position.
                divEle.css({
                    'left': screenpoint.x - pushpinModelPt.radius * 2,
                    'top': screenpoint.y - pushpinModelPt.radius
                });
            }
        });
        //generate a random id for each pushpin markup
    }

    const addEv = (viewer:any) => {
        //viewer!.removeEventListener('click', onMouseClick);
        //$('#myimage').unbind('click');
        $(viewer?.container).bind("click", onMouseClick);
    }

    const removeEv = (viewer:any) => {
        //viewer!.removeEventListener('click', onMouseClick);
        //$('#myimage').unbind('click');
        $(viewer?.container).unbind("click", onMouseClick);
    }
    
    return(
        <GlobalContext.Provider value={{
            viewerC, actualViewables, viewerCIFC, modeSVF, modeSelect, modeIssues,
            onItemHovering, onModelLoaded1, init22, removeEv, onItemClick, addEv,
            issues, comments, requirements, newTask
        }}>
            {children}
        </GlobalContext.Provider>
    );
}