//import { RefObject, useRef } from 'react';
import { useRef } from 'react';
import { GlobalContext } from './GlobalContext';
import $ from 'jquery';

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
    const modeIssues= INITIAL_STATE5;

    const viewerC:any = useRef(null);

    const devices = [
        {
            position: {
                x: 2.590268290876452,
                y: 1.20446526068116,
                z: 2.355262787057484,
            },
            type: "temperature",
            sensorTypes: ["co2", "temperature"],
        },
        {
            position: {
                x: -97.94954550038506,
                y: -50.21776820050724,
                z: 12.444056161946492,
            },
            type: "temperature",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 162.61,
                y: 75.54,
                z: -0.61,
            },
            type: "temperature",
            sensorTypes: ["temperature"],
        },
        {
            position: {
                x: 48.53,
                y: -48.27,
                z: -19.24,
            },
            type: "temperature",
            sensorTypes: ["temperature"],
        },
    
    ];
    
    var ponerdato = true;
    

    const onItemHovering =(event:any) => {
        //alert();
        const div = document.createElement("div");  // <div></div>
        const app = document.getElementById('root'); // <div id="app">App</div>
        const div1 = document.createElement("div1");  // <div></div>
        const div2 = document.createElement('div2'); // <div id="app">App</div>

        console.log("Show tooltip here", event);
        console.log("Show tooltip here", event.originalEvent);
        //alert(event.point);
        //alert(viewer.model.getUpVector());
         //const currAppState = appStateRef.current;
        div.style.display = 'none';
        var posX = event.originalEvent.normalizedX;
        var posY = event.originalEvent.normalizedY;
        //posZ=event.point.z;
        if (event.dbId) {
            //alert(event.dbId);
            //console.log(devices[event.dbId].position.x);
            //alert(devices[event.dbId-1].position.x);
            //alert(event.originalEvent.clientX);
            const div = document.createElement("div");
            div1.style.fontSize = '1rem';
            div.textContent = "Msj.";
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
            //div.style.left = posX+'px';
            div.style.display = 'block';
            //div.style.visibility = 'block';
            app!.insertAdjacentElement("beforebegin", div);
            setTimeout(() => {
                div.style.display = 'none';    
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
        if (event.dbId>0)
            alert(event.dbId);
    }    


    const onModelLoaded1 = async(viewer:any) => {
        
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

        const div = document.createElement("div");  // <div></div>
        const app = document.getElementById('root'); // <div id="app">App</div>
        const div1 = document.createElement("div1");  // <div></div>
        const div2 = document.createElement('div2'); // <div id="app">App</div>
        const div3 = document.createElement("div3");  // <div></div>
        const div4 = document.createElement('div4'); // <div id="app">App</div>
        const viewableData = new DATAVIZEXTN.ViewableData();
        /*await viewableData.finish();
        dataVizExt.addViewables(viewableData);
        dataVizExt.removeAllViewables();*/
        viewableData.spriteSize = 40;
        let startId = 1;
        devices.forEach((device) => {
            //let style = styleMap[device?.type] || styleMap["default"];
            let style = new DATAVIZEXTN.ViewableStyle(DATAVIZEXTN?.ViewableType.SPRITE,new THREE.Color(0xF98716),`uno.svg`);
            const viewable = new DATAVIZEXTN.SpriteViewable(new THREE.Vector3(device.position.x, device.position.y, device.position.z), style, startId)!;
            viewableData.addViewable(viewable);
            startId++;
        });
        await viewableData.finish();
        if (!dataVizExt) return;
        dataVizExt.addViewables(viewableData);
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
        console.log('diste click');
        if (ponerdato){
            var screenPoint = {
                x: event.clientX,
                y: event.clientY
            };
            let viewer_pos = viewerC.current!.container.getBoundingClientRect();
            var hitTest = viewerC.current.impl.hitTest(screenPoint.x - viewer_pos.x,
                screenPoint.y - viewer_pos.y, true);
            
            if (hitTest) {
                drawPushpin({
                    x: hitTest.intersectPoint.x,
                    y: hitTest.intersectPoint.y,
                    z: hitTest.intersectPoint.z
                });
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
        devices.push(
            {
                position: {
                    x: pushpinModelPt.x,
                    y: pushpinModelPt.y,
                    z: pushpinModelPt.z,
                },
                type: "temperature",
                sensorTypes: ["co2", "temperature"],
            });

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
        
        $(viewer?.container).bind("click", onMouseClick);
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
    const removeEv = (viewer:any) => {
        //viewer!.removeEventListener('click', onMouseClick);
        //$('#myimage').unbind('click');
        $(viewer?.container).unbind("click", onMouseClick);
    }
    
    return(
        <GlobalContext.Provider value={{
            viewerC, actualViewables, viewerCIFC, modeSVF, modeSelect, modeIssues,
            onItemHovering, onModelLoaded1, init22, removeEv, onItemClick
        }}>
            {children}
        </GlobalContext.Provider>
    );
}