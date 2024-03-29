
//import * as THREE from 'three';
import React, { useRef, useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import './viewer.css'
import { useViewerStore } from '../../stores/viewer/viewer.store';
import $ from 'jquery';
import { useBimProjectsStore, useGlobalStore } from '../../stores';
import { useProjectsTreeStore } from '../../stores/erp/bimprojects/projecttree.store';
//import * as TransformControls from 'three/examples/js/controls/TransformControls.js';

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

/*interface Prps {
    load:boolean;
}*/

export const ViewerSc = () => {

    const setSelectedItems = useViewerStore(store => store.setSelectedItems);
    const { viewerC, actualViewables, modeSVF } = useContext( GlobalContext );
    const selectedTheme = useGlobalStore(store => store.selectedTheme);
    //const [modelURL, setModelURL] = useState('dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x');

    var posX = 0;
    var posY = 0;
    var posZ = 0;

    const token = useGlobalStore(store => store.token);
    const urn = useGlobalStore(store => store.urn);
    const setActualProperties = useBimProjectsStore(store => store.setActualProperties);
    const auxTree:any = React.useRef([]);
    //const setProjectTree = useProjectsTreeStore(store => store.setProjectTree)
    const charged = useProjectsTreeStore(store => store.charged)
    const setCharged = useProjectsTreeStore(store => store.setCharged)    
    //const setViewer = useGlobalStore(store => store.setViewer);

   
       
    async function carga2() {
        var geom = new THREE.SphereGeometry(10, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var sphereMesh = new THREE.Mesh(geom, material);
        sphereMesh.position.set(12, 23, 43);
        //var scene = new THREE.scene(geom, material);
        //var sphereMesh = new THREE.(geom, material);
        //var scene = new THREE.Scene();
        //viewer.impl.scene.add(scene);
        //if (!viewerC.current.overlays.hasScene(scene)) {
            //viewerC.current.overlays.addScene(scene);
            //viewerC.current.impl.scene.add(scene);
        //}
        if (!viewerC.current.overlays.hasScene('custom-scene')) {
            viewerC.current.overlays.addScene('custom-scene');
            //viewer.impl.scene.add('custom-scene');
        }
        //alert('hola');
        //viewerC.current.impl.scene.add(sphereMesh);

        //scene.background = new THREE.Color(0x2a3b4c);
        //alert('carga2');
        viewerC.current.overlays.addMesh(sphereMesh as THREE.Object3D, 'custom-scene');
        
        //viewerC.current.refresh();
        //var urn = getParameterByName('urn');
        //alert('esta es la funcion');
        //seleccionados='c884ae1b-61e7-4f9d-0001-719e20b22d0b-006f9464';
        //var cadena = '5c069bcb-62a6-44a8-a199-48eb6d184f17-000546cc';
        //var cadena = '5c069bcb-62a6-44a8-a199-48eb6d184f17-000546cc';
        /*if (viewer)
            highlightRevit(seleccionados);*/
        /*var geom = new THREE.SphereGeometry(1, 2, 2);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var sphereMesh = new THREE.Mesh(geom, material);
        //var scene = new THREE.scene(geom, material);
        var scene = new THREE.Scene();
        scene.add(sphereMesh);
        //viewerC.current?.overlays.addMesh(sphereMesh, scene.toString());
        //viewerC.current?.impl.scene.add(scene);
        sphereMesh.position.set(1, 2, 3);

        var geometry = new THREE.BoxGeometry(1,2,3);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube); 

        if (!viewerC.current?.overlays.hasScene(scene)) {
            viewerC.current?.overlays.addScene(scene);
            //viewerC.current.impl.scene.add(scene);
        }

        viewerC.current?.refresh();

        if (!viewerC.current.overlays.hasScene('custom-scene')) {
            viewerC.current.overlays.addScene('custom-scene');
        }

        viewerC.current.overlays.addMesh(cube, 'custom-scene');*/

        /*var geometry = new THREE.BoxGeometry(1,2,3);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var mesh = new THREE.Mesh(geometry, material);

        
        var ext = viewerC.current.getExtension('Autodesk.Viewing.SceneBuilder');

        var modelBuilder = await ext.addNewModel({
            conserveMemory: false,
            modelNameOverride: 'My Model Name'
        });
        var purple = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 0, 1)
        });
        modelBuilder.addMaterial('purple', purple);    
        //var box = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(10, 10, 10));
        let id = modelBuilder.addGeometry(geometry);
        var transform1 = new THREE.Matrix4().compose(
            new THREE.Vector3(-15, 0, 0),
            new THREE.Quaternion(0, 0, 0, 1),
            new THREE.Vector3(1, 1, 1)
        );
        modelBuilder.addFragment(1, 'purple', transform1);        
        var red = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 0, 0)
        });
        //let torus = new THREE.BufferGeometry().fromGeometry(new THREE.TorusGeometry(10, 2, 32, 32) as any);
        
        const transform = new THREE.Matrix4().compose(
            new THREE.Vector3(19, 0, 0),
            new THREE.Quaternion(0, 0, 0, 1),
            new THREE.Vector3(1, 1, 1)
        );
        //modelBuilder.addFragment(torus, red, transform);

        //let mesh = new THREE.Mesh(torus, purple);
        mesh.matrix = new THREE.Matrix4().compose(
            new THREE.Vector3(0, 12, 12),
            new THREE.Quaternion(0, 0, 0, 1),
            new THREE.Vector3(1, 1, 1)
        );
        mesh.dbId = 100;    // Set the database id for the mesh
        modelBuilder.addMesh(mesh);*/

        //var sphereMesh = new THREE.(geom, material);
        //var scene = new THREE.Scene();
        //viewer.impl.scene.add(scene);
        /*if (!viewer?.overlays.hasScene(scene.toString())) {
            viewer?.overlays.addScene(scene.toString());
            //viewer.impl.scene.add('custom-scene');
        }*/


        /*if (!viewer.overlays.hasScene('custom-scene')) {
            viewer.overlays.addScene('custom-scene');
            //viewer.impl.scene.add('custom-scene');
        }*/
        //alert('hola');
        //viewer.impl.scene.add(sphereMesh);

        //scene.background = new THREE.Color(0x2a3b4c);
        //alert('carga2');
        //alert('mostrado');
        
        onModelLoaded1(viewerC.current);
        //var geom1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        //var material_red = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        /*var material_red = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        //add material red to collection
        viewer.impl.matman().addMaterial('ADN-Material' + 'red', material_red, true);
        var material_green = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
        //add material green to collection
        viewer.impl.matman().addMaterial('ADN-Material' + 'green', material_green, true);
        //get bounding box of the model
        var boundingBox = viewer.model.getBoundingBox();
        var maxpt = boundingBox.max;
        var minpt = boundingBox.min;
        var xdiff = maxpt.x - minpt.x;
        var ydiff = maxpt.y - minpt.y;
        var zdiff = maxpt.z - minpt.z;
        //set a nice radius in the model size
        var niceRadius =
            Math.pow((xdiff * xdiff +

                ydiff * ydiff +

                zdiff * zdiff), 0.5) / 10;
        //createsphere1 and place it at max point of boundingBox
        var sphere_maxpt = new THREE.Mesh(new THREE.SphereGeometry(niceRadius, 2000), material_red);
       //sphere_maxpt.geometry.attributes.position.set(maxpt.x, maxpt.y, maxpt.z);
        sphere_maxpt.position.set(maxpt.x, maxpt.y, maxpt.z);
        //create  sphere2 and place it at
        //min point of boundingBox
        var sphere_minpt =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    niceRadius, 30),
                material_green)
        sphere_minpt.position.set(minpt.x, minpt.y, minpt.z);*/
        //add two spheres to scene
        /*viewer.impl.scene.add(sphere_maxpt);
        viewer.impl.scene.add(sphere_minpt);
        viewer.impl.scene.updateMatrixWorld(true);
        sphere_maxpt.matrixWorld.setPosition(new THREE.Vector3(1, 2, 3));
        sphere_minpt.matrixWorld.setPosition(new THREE.Vector3(10, 10, 10));
        viewer.impl.scene.updateMatrix();
        //update the viewer       
        viewer.impl.invalidate(true);
       const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const mesh = new THREE.Mesh( geometry, material );
        
        if (!viewer.overlays.hasScene('custom-scene')) {
            viewer.overlays.addScene('custom-scene');
        }

        viewer.overlays.addMesh(mesh, 'custom-scene');

        const geometry1 = new THREE.BoxGeometry(20, 20, 20, 20, 20, 20); 
        const material2 = new THREE.MeshBasicMaterial({ wireframe: true }); 
        const cube1 = new THREE.Mesh(geometry1, material2); 
        viewer.overlays.addMesh(cube1, 'custom-scene');*/
        //alert('llego');
        //viewer.refresh();
        /*var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a3b4c);

        //add camera
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight
        );

        //renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //add geometry
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        camera.position.z = 5;
        
        
        //animation
        var animate = function(){
            requestAnimationFrame(animate);

            //cube.rotateX(0.01);
            //cube.rotateY(0.01);
            cube.rotation.y += 0.01;
            
            renderer.render(scene, camera);

        }

        //animate();
        viewer.overlays.addMesh(cube, scene);*/

        //viewer.loadExtension("Botones");
        //viewer.loadExtension("MenuContextual");
        //viewer.loadExtension("NestedViewerExtension", { filter: ["2d","3d"], crossSelection: true });


        /*$('#LateralToolbar.ControlGroup').css({
            'top':'200px',
            'background-color':'red'
        });*/

        // CrearPanel('');

    }


    /*function highlightRevit(idsRevit:any) {
        if (viewerC.current && viewerC.current.model)
            viewerC.current.model.getExternalIdMapping( (mapping:any) => {
                configureElementByUniqueIdAndMapping(idsRevit, mapping);
            } , ()=>{});
    }
    
    function configureElementByUniqueIdAndMapping(idsRevit:any, mapping:any) {
        var elementsDbId = [];
        var idsRevitArray = idsRevit.split(',');
        for (var uniqueId in idsRevitArray) {
            const elementDbId = mapping[idsRevitArray[uniqueId]];
            if (elementDbId) {
                elementsDbId.push(elementDbId);
            }
        }
        viewerC.current?.isolate(elementsDbId);
        viewerC.current?.fitToView(elementsDbId);
    }*/

    // @urn the model to show
    // @viewablesId which viewables to show, applies to BIM 360 Plans folder
    function launchViewer(urn:string, viewableId = '') {
        console.log('RENDERIZANDO EL VIEWER  ***********************');
        console.log(token);
        var options = {
            env: 'AutodeskProduction',
            accessToken: token.access_token
        };        
        var documentId = 'urn:' + urn;   
        Autodesk.Viewing.Initializer(options, () => {
            const config = {
                extensions: ['Autodesk.VisualClusters', 'Autodesk.DocumentBrowser', 'MenuContextual']
            };
        if (viewerC.current) viewerC.current=null;
        viewerC.current = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer')!);
        if (modeSVF.current){
            viewerC.current?.start(urn);
            //Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
        }else{
            viewerC.current?.start();
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        }
        
        viewerC.current!.autocam.shotParams.destinationPercent! = 3;
        viewerC.current!.autocam.shotParams.duration = 3;
        
        setTimeout(() => {
            const options1:any = {tintColor: {r: 0, g: 1, b: 0},gizmoOffsetRight:10};
            viewerC.current?.loadExtension('Autodesk.Section',options1);
            viewerC.current?.loadExtension('Autodesk.VisualClusters');
            viewerC.current?.loadExtension('Autodesk.DocumentBrowser');
            viewerC.current?.loadExtension('Autodesk.Viewing.SceneBuilder');
            viewerC.current?.loadExtension('MenuContextual');
            viewerC.current?.loadExtension('Autodesk.DataVisualization');
            viewerC.current?.loadExtension("Autodesk.AEC.LevelsExtension");
            viewerC.current?.navigation?.setReverseZoomDirection(true);
            if (selectedTheme==='material3-dark'){
                viewerC.current?.setTheme('dark-theme');
                viewerC.current?.setLightPreset(18);    
            }else{
                viewerC.current?.setTheme('light-theme');
                viewerC.current?.setLightPreset(0);
            }
            setTimeout(() => {
                carga2();                
                if (modeSVF.current)setCharged(!charged);
            }, 4000);
        }, 2000);
    });        
        
        function onDocumentLoadSuccess(doc:any) {
            var viewables1 = doc.getRoot().search({'type':'geometry'});
            console.log('vistas del modelo', viewables1);
            var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
            actualViewables.current=[viewables1];
            if (!viewerC.current) return;
            console.log('antes binded',viewerC.current);
            viewerC.current.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionBinded);
            /*viewerC.current.addEventListener(Autodesk.Viewing.AGGREGATE_ISOLATION_CHANGED_EVENT, (e:any)=>{
                console.log('isolation changed',e)
                console.log('mode select',modeSelect.current)
            });*/
            viewerC.current.addEventListener(Autodesk.Viewing.SHOW_EVENT, (e:any)=>{console.log('show changed',e)});
            viewerC.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e:any)=>{
                console.log('*****Cambindo vista',e)
                setCharged(!charged);
                /*const ObteinData = (async ()=>{
                    auxTree.current=[];
                    viewerC.current?.getObjectTree(function (objTree:any) {
                      //console.log(objTree);
                      objTree.enumNodeChildren(
                          objTree.getRootId(),
                          function (dbId:any) {
                              var objSelected = dbId;
                              
                              viewerC.current.getProperties(objSelected, (props:any) => {
                                //console.log(props);
                                var it = viewerC.current.model.getData().instanceTree;
                                let hijos = props.properties.filter((data:any)=>data.displayName==='child').map((data:any)=>{
                                  var nodeFinalName = it.getNodeName(data.displayValue)
                                  //if (nodeFinalName==='') return;
                                  //if (nodeFinalName?.includes('ANALY')) return;
                                  return ({
                                    id:data.displayValue,
                                    name:nodeFinalName,
                                    type:'family',
                                    expanded:false,
                                    children:[]
                                  })
                                });
                                //console.log('hijos', hijos);
                                auxTree.current=[...auxTree.current,{id:props.dbId,name:props.name, type:'category' , expanded:false, children:[]}]
                              })
                          })
                      })      
                      setTimeout(() => {
                        var it = viewerC.current.model.getData().instanceTree;
                        for (let i=0;i<auxTree.current.length;i++)
                          for (let j=0;j<auxTree.current[i].children.length;j++){
                            let prophijos:any=[];
                            const ObteinProps1=(props1:any) => {
                              //console.log(props1)  
                              prophijos = props1.properties.filter((data1:any)=>data1.displayName==='child').map((data1:any)=>{
                                var nodeFinalName1 = it.getNodeName(data1.displayValue)                  
                                //if (nodeFinalName1==='') return;
                                //if (nodeFinalName1?.includes('ANALY')) return;
                                return ({
                                  id:data1.displayValue,
                                  name:nodeFinalName1,
                                  type:'type',
                                  expanded:false,
                                  children:[]
                                })
                              });
                              auxTree.current[i].children[j].children=prophijos;
                            }
                            viewerC.current.getProperties(auxTree.current[i].children[j].id, ObteinProps1);
                          }
              
                        setTimeout(() => {
                          var it = viewerC.current.model.getData().instanceTree;
                          for (let i=0;i<auxTree.current.length;i++)
                            for (let j=0;j<auxTree.current[i].children.length;j++)
                              for (let k=0;k<auxTree.current[i].children[j].children.length;k++){  
                              let prophijos:any=[];
                              const ObteinProps1=(props1:any) => {
                                prophijos = props1.properties.filter((data1:any)=>data1.displayName==='child').map((data1:any)=>{
                                  var nodeFinalName1 = it.getNodeName(data1.displayValue)
                                  //if (nodeFinalName1==='') return;
                                  //if (nodeFinalName1?.includes('ANALY')) return;  
                                  return ({
                                    id:data1.displayValue,
                                    name:nodeFinalName1,
                                    type:'element',
                                    expanded:false,
                                    children:[]
                                  })
                                });
                                //console.log(prophijos)
                                auxTree.current[i].children[j].children[k].children=prophijos;
                              }
                              viewerC.current.getProperties(auxTree.current[i].children[j].children[k].id, ObteinProps1);
                            }
                            setTimeout(() => {
                              setProjectTree(auxTree.current);
                            }, 1300);
                        }, 1300);
                      }, 1300);
                  })();*/
                
                /*
                
                var instanceTree = e.model.getData().instanceTree;
                var rootId = instanceTree.getRootId();
                //var rootId = instanceTree.getNodeName(2839);
                var indexinNames = instanceTree.nodeAccess.dbIdToIndex[2839];
                var indexinStrings = instanceTree.nodeAccess.names[indexinNames];
                
                console.log('id of topology', indexinNames);
                console.log('ids of topology', indexinStrings);
                var alldbId:any = [];
                if (!rootId) {
                    return alldbId;
                }
                var queue:any = [];
                queue.push(rootId);
                while (queue.length > 0) {
                    var node = queue.shift();
                    alldbId.push(node);
                    instanceTree.enumNodeChildren(node, function(childrenIds:any) {
                        queue.push(childrenIds);
                        viewerC.current.getProperties(childrenIds, (props:any) => {
                            //console.log(props);
                        });
                    });
                }
                console.log('Alll',alldbId);
                */
            });

            viewerC.current.loadDocumentNode(doc, viewables).then( (i:any) => {
                console.log('estas son las vistas', i);
                //elementos = [];
                /*
                    viewerC.current.getObjectTree(function (objTree:any) {
                    console.log(objTree);
                    objTree.enumNodeChildren(
                        objTree.getRootId(),
                        function (dbId:any) {
                            console.log(dbId);
                            //var DBids = viewer.getSelection();                            
                            var objSelected = dbId;
                            viewerC.current.getProperties(objSelected, (props:any) => {console.log(props);})
                        })
                    })
                */
                }, true);
            };

                /*var instanceTree = viewerC.current.model.getData().instanceTree;
                function getAlldbIds (rootId:any) {
                    var alldbId:any = [];
                    if (!rootId) {
                        return alldbId;
                    }
                    var queue = [];
                    queue.push(rootId);
                    while (queue.length > 0) {
                        var node = queue.shift();
                        alldbId.push(node);
                        instanceTree.enumNodeChildren(node, function(childrenIds:any) {
                            queue.push(childrenIds);
                        });
                    }
                    return alldbId;
                }
                var rootId = instanceTree.getRootId();
                const ll = getAlldbIds(rootId);
                console.log('all dbids', ll)*/
                //viewerC.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);
                /*const material = new THREE.LineBasicMaterial({color: 0xffff00, linewidth: 2});
                const geometry = new THREE.Geometry();
                geometry.vertices.push(
                    new Vector3(-10, 0, 0),
                    new Vector3(0, 10, 0),
                    new Vector3(10, 0, 0)
                );
                const line = new THREE.Line(geometry, material);
                viewerC.current.impl.createOverlayScene('pointclouds');
                viewerC.current.impl.addOverlay('pointclouds', line);
                viewerC.current.addEventListener(
                    Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, (args:any) => {
                        //and can't add in this place
                        const material = new THREE.LineBasicMaterial({color: 0xffff00, linewidth: 2});
                        const geometry = new THREE.Geometry();
                        geometry.vertices.push(
                            new THREE.Vector3(-10, 0, 0),
                            new THREE.Vector3(0, 10, 0),
                            new THREE.Vector3(10, 0, 0)
                        );
                        const line = new THREE.Line(geometry, material);
                        viewerC.current.impl.createOverlayScene('pointclouds');
                        viewerC.current.impl.addOverlay('pointclouds', line);
                    })*/

            /*setTimeout(() => {
                PonerProps(15);
            }, 500);*/
            //viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);
            //viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, PonerProps);
            // onModelLoaded1(viewer);
            setTimeout(() => {
                init22();    
            }, 1500);
            
            /*viewer.hideModel(doc);
            viewer.showModel(doc);
            if (viewer.areAllVisible())
            alert('se cargo bien')
            else
            alert('no se cargo')*/
            //alert();
            //viewer.setBackgroundColor(red, green, blue, red2, green2, blue2)
            //viewer?.setBackgroundColor(0, 0, 0, 0, 0, 0);
            /*$(".property-name aggregate-name").on( "click", function() {
                alert($( this ).text());
            })*/

        }


        function verseleccionado() {
            //let viewerImpl = viewer!.impl;

            /*this.activate = (name) => {
                this.active = true;
            };
    
            this.deactivate = (name) => {
                this.clearMarkedObject(this.markedFragments);
                this.active = false;
            };*/

            //this.handleSingleClick = (event, button) => {
            //if (button === 0) {
            //const res = [];
            //const vpVec = viewerImpl.clientToViewport(event.canvasX, event.canvasY);
            /* const dbId = viewerImpl
                 .renderer()
                 .idAtPixel(vpVec.x, vpVec.y, res, [viewerImpl.renderer().getOverlayIdTarget()]);
 
             if (true) {
                 let test = viewerImpl.hitTestViewport(vpVec, false);
                 console.log(test);
             }*/

            // "dbId == -1" when nothing is clicked.
            // }
        }


        async function onSelectionBinded(event:any) {
            //alert('hola');
            //var currSelection = viewerC.current!.getSelection();
            //var domElem = document.getElementById('MySelectionValue');
            //console.log(event)
            //console.log(currSelection)
            /*let vector = new THREE.Vector3();
            event.object.getWorldPosition(vector);
            console.log(vector);*/

            //domElem.innerText = currSelection.length /*+ " " + vector.x + "," + vector.y + "," + vector.z*/;
            console.log('Este es el evento de cambiar ', event);
            //verseleccionado();
            //alert(event.clientX);
            /*var uniqueIds = [];
            var DBids = viewer.getSelection();
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewer.getSelection()[n];
                n = n + 1;
                console.log('Este es el objeto seleccionado',objSelected);
            }*/
            //console.log('Estas son las props');
            var uniqueIds = [];
            var DBids = viewerC.current!.getSelection();            
            // Use the model's getPropertySet to get the PropertySet instance for the specified dbIds
            //const propSet = viewerC.current!.model.getPropertySet(DBids);
               // iterate, aggregate, etc
               //console.log('selection', DBids);
               //console.log('properties', propSet);
            /*const obtener = ((props:any)=>{
                console.log('estas son las propiedades', props);
                //return (props);
                //data.push(props)
                data.push({Name:`${props.dbId}-${props.name}`, dbId:props.dbId})
            })
            viewerC.current!.getProperties(objSelected, obtener);*/
            //setSeleccionaE1(DBids);
            /*const obj={
    DataA:[{Name:'Nombre2', dbId:'0101'},{Name:'Nombre3', dbId:'0105'}],
    DataB:[{},{}]
}*/
            
           /* let array:any=[];
            const obtener = (props:any, array:any) => {
                //await array.push(props);
                //array = [...array, props];
                //console.log('Este e el array',  array);    
                console.log('Este e el array',  array);    
                setSelectedItems({ DataModel:array, DataList:[] });
            }*/
            
            

            var n = 0;
            const data:any = [];

            if (DBids.length===1){
                const obtener = ((props:any)=>{
                    console.log('estas son las propiedades', props);
                    setActualProperties(props.properties);
                    data.push({Name:`${props.dbId}-${props.name}`, dbId:props.dbId})
                })
                viewerC.current!.getProperties(DBids[0], obtener);
            }
            else{

                const obtener2 = ((props:any)=>{
                    console.log('estas son las propiedades', props);
                    //setActualProperties(props.properties);
                    //return (props);
                    //data.push(props)
                    
                })
                
                viewerC.current.model.getPropertySet(DBids, obtener2);

                //viewerC.current!.getBulkProperties(dbIds, onSuccessCallback, onErrorCallback)


                for (var uniqueId of DBids) {
                    var objSelected = viewerC.current!.getSelection()[n];
                    n = n + 1;
                    //const el = proyects.DataElementos?.find(x=>x.Id===objSelected);
                    //console.log('elementoss', proyects?.DataElementos);
                    //console.log('elemento', el);
                    //const elems=[];
                    
                    /*viewerC.current!.getProperties(objSelected, (props:any) => {
                        uniqueIds.push(props.externalId);
                        if (n == DBids.length) {
                            //callbackObj.showMessage(uniqueIds);
                            //callbackObj.returnex(uniqueIds);
                            //alert(uniqueIds);
                            console.log(props);
                            //9c9538fd-af40-4b3d-bd89-f8e4acac1fd8-000525ae
                        }
                    })*/
                    /*viewerC.current!.getProperties(objSelected, (props:any)=>{
                        //array = [...array, {Name:`${props.dbId}-${props.name}`, dbId:props.dbId}];
                        array.push({Name:`${props.dbId}-${props.name}`, dbId:props.dbId})
                        obtener([{Name:`${props.dbId}-${props.name}`, dbId:props.dbId}],array );
                    });*/
                    
                    const obtener = ((props:any)=>{
                        //console.log('estas son las propiedades', props);


                        //setActualProperties(props.properties);
                        //return (props);
                        //data.push(props)
                        data.push({Name:`${props.dbId}-${props.name}`, dbId:props.dbId})
                    })
                    
                    viewerC.current!.getProperties(objSelected, obtener);
                }

            }
            
            setTimeout(async() => {
                //console.log('estas son las propiedades', await data);
                setSelectedItems({ DataModel:await data, DataList:[] });
                
            }, 600);


            let viewerImpl = viewerC.current!.impl;

            /*this.activate = (name:any) => {
                this.active = true;
            };
    
            this.deactivate = (name) => {
                this.clearMarkedObject(this.markedFragments);
                this.active = false;
            };*/

            //this.handleSingleClick = (event, button) => {
            //if (button === 0) {
            const res:any = [];
            const vpVec = viewerImpl.clientToViewport(event.canvasX, event.canvasY);
             const dbId = viewerImpl
                 .renderer()
                 .idAtPixel(vpVec.x, vpVec.y, res, [viewerImpl.renderer().getOverlayIdTarget()]);

                 /*var geom = new THREE.SphereGeometry(2, 2, 2);
                 var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                 var sphereMesh = new THREE.Mesh(geom, material);
                 sphereMesh.position.set(vpVec.x, vpVec.y, res);
                 if (!viewerC.current.overlays.hasScene('custom-scene1')) {
                     viewerC.current.overlays.addScene('custom-scene1');
                     //viewer.impl.scene.add('custom-scene');
                 }
                 viewerC.current.overlays.addMesh(sphereMesh as THREE.Object3D, 'custom-scene1');
                 console.log(vpVec.x, vpVec.y, res);*/

             if (true) {
                 let test = viewerImpl.hitTestViewport(vpVec, false);
                 console.log(test);
             }
             //"dbId == -1" when nothing is clicked.
            //}
        }

        function onDocumentLoadFailure(viewerErrorCode:any) {
            console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);            
        }

        /*function addIds(DBids:any, uniqueIds:any, callback:any) {
            var n = 0;
            for (var uniqueId of DBids) {
                var objSelected = viewerC.current!.getSelection()[uniqueId];
                viewerC.current!.getProperties(objSelected, (props:any) => {
                    uniqueIds.push(props.externalId);
                    n = n++;
                    if (n == DBids.length) {
                        callback(null, uniqueIds)
                    }
                });
            }
        }*/

        

        /**
         * Handles `Autodesk.Viewing.GEOMETRY_LOADED_EVENT` event that is sent when a model has been completely loaded in the viewer.
         *
         * @param {Autodesk.Viewing.GuiViewer3D} viewerC.current The viewer in which the model is loaded.
         */
        async function onModelLoaded1(viewer:any) {
            const dataVizExt = viewer.getExtension("Autodesk.DataVisualization");
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
            viewableData.spriteSize = 20;
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
            /**
             * Called when a user clicks on a Sprite Viewable
             * @param {Event} event 
             */
            function onItemClick(event:any) {
                //alert('click');
                //alert(devices[event.dbId - 1].position.x);
                //alert(event.dbId);
            }
            /**
             *  Called when a user hovers over a Sprite Viewable 
             * @param {Event} event 
             */
            function onItemHovering(event:any) {
                //alert();
                console.log("Show tooltip here", event);
                console.log("Show tooltip here", event.originalEvent);
                //alert(event.point);
                //alert(viewer.model.getUpVector());
                 //const currAppState = appStateRef.current;
                div.style.display = 'none';
                posX = event.originalEvent.normalizedX;
                posY = event.originalEvent.normalizedY;
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

                //alert('show');
            }
            const DataVizCore = Autodesk.DataVisualization.Core;
            viewerC.current.addEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
            viewerC.current.addEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);
        }

        function init22() {
            //delegate the mouse click event
            $(viewerC.current?.container).bind("click", onMouseClick);
            //viewerC.current?.container.addEventListener("onclick", onMouseClick);
            //viewerC.current?.addEventListener("onclick", onMouseClick);
            //$(viewerC.current?.container).bind("dblclick", onMouseClick);
            //delegate the event of CAMERA_CHANGE_EVENT
            viewerC.current!.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function (rt:any) {
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
                    var screenpoint = viewerC.current!.worldToClient(new THREE.Vector3(
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
        }

        function onMouseClick(event:any) {
            console.log('diste click');
            if (ponerdato){
                var screenPoint = {
                    x: event.clientX,
                    y: event.clientY
                };
                //get the selected 3D position of the object
                //viewer canvas might have offset from the webpage.
                let viewer_pos = viewerC.current.container.getBoundingClientRect();
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

        //generate a random id for each pushpin markup

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

                 var geom = new THREE.SphereGeometry(2, 2, 2);
                 var material = new THREE.MeshLambertMaterial({ color: 0x3D6979  });
                 var sphereMesh = new THREE.Mesh(geom, material);
                 sphereMesh.position.set(pushpinModelPt.x, pushpinModelPt.y, pushpinModelPt.z);
                 if (!viewerC.current.overlays.hasScene('custom-scene1')) {
                     viewerC.current.overlays.addScene('custom-scene1');
                     //viewer.impl.scene.add('custom-scene');
                 }
                 viewerC.current.overlays.addMesh(sphereMesh as THREE.Object3D, 'custom-scene1');
            onModelLoaded1(viewerC.current);
        }

       


        



        class MenuContextual extends Autodesk.Viewing.Extension {
            constructor(viewer:any, options:any) {
                super(viewer, options);
                this.onCreacionContextualMenuItem = this.onCreacionContextualMenuItem.bind(this);
            }

            get menuId() {
                return 'ItemMenuContextual';
            }

            onCreacionContextualMenuItem(menu:any, status:any) {
                if (status.hasSelected) {
                    if (viewerC.current!.getSelection().length > 0) {
                        menu.push(
                            {
                                title: 'Mi opcion 1',
                                target: () => {
                                    //CargarPartidas();
                                }
                            },
                            {
                            title: 'Mi Opcion 2 ',
                            target:[
                            /*{
                                title: 'Añadir una comentario',
                                target: () => {
                                    //BuscarNombreImagen(function callback(miNameImagen) {
                                    //if (!miNameImagen.includes('<')) {
                                    //CrearPanel(miNameImagen);
                                    //CrearPanel('doc1.pdf');
                                    //carga2();
                                    //}
                                    //});
                                }

                            },*/
                            {
                                title: 'Mi option 3',
                                target: () => {
                                        alert('option 3')
                                    }
                                
                            },
                            {
                                title: 'Mi option 4',
                                target: () => {
                                }
                            },
                            {
                                title: 'Mi option 5',
                                target: () => {
                                   
                                }
                            },
                            
                    ]});
                    }//cierro if getSelection()=1    

                } else {
                    menu.push(
                        {
                            title: 'Mi option 6',
                            target: () => {
                            }
                        }
                        
                    );
                }
            }

            load() {
                // Creación menu contextual item
                this.viewer.registerContextMenuCallback(
                    this.menuId,
                    this.onCreacionContextualMenuItem
                );
                return true;
            }

            unload() {
                // Borrado de todas los items
                this.viewer.unregisterContextMenuCallback(this.menuId);
                return true;
            }
        }
        Autodesk.Viewing.theExtensionManager.registerExtension('MenuContextual', MenuContextual);
    

    const cargar = async () => {
        if (viewerC.current) {
            //viewer.uninitialize();
            //viewer.finish();
            //viewer=null;
        }
        //launchViewer('dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmlPbG9fOEJSU2JDODh6ZmxaaUpxVXc/dmVyc2lvbj0x');
        launchViewer(urn);
        //alert(urn);
    }

    useEffect(() => {
        /*if (proyects.Urn === '') {
            if (viewer) {
                //viewer.uninitialize();
                viewer.finish();
                //viewer = null;
                return;
            }
            //return;
        }*/

        /*if (proyects.Urn) {
            setModelURL(proyects.Urn);
            //alert(modelURL);
            //alert(proyects.Urn);
            cargar();
        }*/
        alert('vamnos allamar a cargar')
        cargar();
        /*return ()=> {
            if (viewer) {
                //viewer.uninitialize();
                viewer.finish();
                viewer=null;
            }
           //if (window.NOP_VIEWER) window.NOP_VIEWER.finish() //terminate Viewer when unmounting
        }*/
    }, [urn])

    
    

    return (
        <>
            <div style={{ display:'flex', background:'red' }}>
            <div className="" id="forgeViewer" style={{height: "100%", width: '100%',background: 'white',overflow:'hidden',zIndex:0,position:'absolute'}}>

            </div>
            </div>
        </>
    )
}



