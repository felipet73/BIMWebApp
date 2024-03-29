import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';
import { useViewerIFCStore } from '../../../../stores';
/**
 * File Manager sample with NodeJs service
 */
const ListIFCRepo = () => {

    const setSelectedModels = useViewerIFCStore(store => store.setSelectedModels)
    const setSelectedModelsIFC = useViewerIFCStore(store => store.setSelectedModelsIFC)
    const setSelectedProperties = useViewerIFCStore(store => store.setSelectedProperties)

    let hostUrl: string = "http://localhost:8090/";
    return(
        <div>
            <div className="control-section" style={{ padding:'0px' }}>
                <FileManagerComponent id="filemanager" navigationPaneSettings={{visible: false}}  ajaxSettings={{url: hostUrl, getImageUrl: hostUrl + 'GetImage', uploadUrl: hostUrl + 'Upload', downloadUrl: hostUrl + 'Download'}} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}} contextMenuSettings={{layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll']}} 
                  menuClick={async (e:any)=>{
                    console.log(e)
                    
                    if (e.fileDetails[0].name.includes('.frag')){

                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                        const urlencoded = new URLSearchParams();
                        //urlencoded.append("downloadInput", "{\"action\":\"download\",\"path\":\"/IFCFiles/More Files/\",\"names\":[\"model1.json\"],\"data\":[{\"dev\":3664944517,\"mode\":33206,\"nlink\":1,\"uid\":0,\"gid\":0,\"rdev\":0,\"blksize\":4096,\"ino\":5066549586190504,\"size\":7427401,\"blocks\":14512,\"atimeMs\":1711324439963.1167,\"mtimeMs\":1711324439963.1167,\"ctimeMs\":1711324439963.1167,\"birthtimeMs\":1711324439879.8691,\"atime\":\"2024-03-24T23:53:59.963Z\",\"mtime\":\"2024-03-24T23:53:59.963Z\",\"ctime\":\"2024-03-24T23:53:59.963Z\",\"birthtime\":\"2024-03-24T23:53:59.880Z\",\"name\":\"model1.json\",\"isFile\":true,\"dateModified\":\"2024-03-24T23:53:59.963Z\",\"dateCreated\":\"2024-03-24T23:53:59.963Z\",\"filterPath\":\"/IFCFiles/More Files/\",\"type\":\".json\",\"permission\":null,\"hasChild\":false,\"_fm_created\":\"March 24, 2024 18:53\",\"_fm_modified\":\"March 24, 2024 18:53\",\"_fm_iconClass\":\"e-fe-unknown e-fe-json\"}]}\n");
                        const fl:any = {"action":"download","path":e.fileDetails[0].filterPath,"names":[e.fileDetails[0].name],"data":[{"dev":e.fileDetails[0].dev,"mode":e.fileDetails[0].mode,"nlink":e.fileDetails[0].nlink,"uid":e.fileDetails[0].uid,"gid":e.fileDetails[0].gid,"rdev":e.fileDetails[0].rdev,"blksize":e.fileDetails[0].blksize,"ino":e.fileDetails[0].ino,"size":e.fileDetails[0].size,"blocks":e.fileDetails[0].blocks,"atimeMs":e.fileDetails[0].atimeMs,"mtimeMs":e.fileDetails[0].mtimeMs,"ctimeMs":e.fileDetails[0].ctimeMs,"birthtimeMs":e.fileDetails[0].birthtimeMs,"atime":e.fileDetails[0].atime,"mtime":e.fileDetails[0].mtime,"ctime":e.fileDetails[0].ctime,"birthtime":e.fileDetails[0].birthtime,"name":e.fileDetails[0].name,"isFile":e.fileDetails[0].isFile,"dateModified":e.fileDetails[0].dateModified,"dateCreated":e.fileDetails[0].dateCreated,"filterPath":e.fileDetails[0].filterPath,"type":e.fileDetails[0].type,"permission":e.fileDetails[0].permission,"hasChild":e.fileDetails[0].hasChild,"_fm_created":e.fileDetails[0]._fm_created,"_fm_modified":e.fileDetails[0]._fm_modified,"_fm_iconClass":e.fileDetails[0]._fm_iconClass}]}
    
                        urlencoded.append("downloadInput", JSON.stringify(fl));
                        const requestOptions:any = {
                            method: "POST",
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: "follow"
                        };
    
                        const file = await fetch("http://localhost:8090/Download", requestOptions);
                        const data = await file.arrayBuffer();
                        setSelectedModels(data);
    
                    }



                    if (e.fileDetails[0].name.includes('.json')){
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                        const urlencoded = new URLSearchParams();
                        //urlencoded.append("downloadInput", "{\"action\":\"download\",\"path\":\"/IFCFiles/More Files/\",\"names\":[\"model1.json\"],\"data\":[{\"dev\":3664944517,\"mode\":33206,\"nlink\":1,\"uid\":0,\"gid\":0,\"rdev\":0,\"blksize\":4096,\"ino\":5066549586190504,\"size\":7427401,\"blocks\":14512,\"atimeMs\":1711324439963.1167,\"mtimeMs\":1711324439963.1167,\"ctimeMs\":1711324439963.1167,\"birthtimeMs\":1711324439879.8691,\"atime\":\"2024-03-24T23:53:59.963Z\",\"mtime\":\"2024-03-24T23:53:59.963Z\",\"ctime\":\"2024-03-24T23:53:59.963Z\",\"birthtime\":\"2024-03-24T23:53:59.880Z\",\"name\":\"model1.json\",\"isFile\":true,\"dateModified\":\"2024-03-24T23:53:59.963Z\",\"dateCreated\":\"2024-03-24T23:53:59.963Z\",\"filterPath\":\"/IFCFiles/More Files/\",\"type\":\".json\",\"permission\":null,\"hasChild\":false,\"_fm_created\":\"March 24, 2024 18:53\",\"_fm_modified\":\"March 24, 2024 18:53\",\"_fm_iconClass\":\"e-fe-unknown e-fe-json\"}]}\n");
                        const fl:any = {"action":"download","path":e.fileDetails[0].filterPath,"names":[e.fileDetails[0].name],"data":[{"dev":e.fileDetails[0].dev,"mode":e.fileDetails[0].mode,"nlink":e.fileDetails[0].nlink,"uid":e.fileDetails[0].uid,"gid":e.fileDetails[0].gid,"rdev":e.fileDetails[0].rdev,"blksize":e.fileDetails[0].blksize,"ino":e.fileDetails[0].ino,"size":e.fileDetails[0].size,"blocks":e.fileDetails[0].blocks,"atimeMs":e.fileDetails[0].atimeMs,"mtimeMs":e.fileDetails[0].mtimeMs,"ctimeMs":e.fileDetails[0].ctimeMs,"birthtimeMs":e.fileDetails[0].birthtimeMs,"atime":e.fileDetails[0].atime,"mtime":e.fileDetails[0].mtime,"ctime":e.fileDetails[0].ctime,"birthtime":e.fileDetails[0].birthtime,"name":e.fileDetails[0].name,"isFile":e.fileDetails[0].isFile,"dateModified":e.fileDetails[0].dateModified,"dateCreated":e.fileDetails[0].dateCreated,"filterPath":e.fileDetails[0].filterPath,"type":e.fileDetails[0].type,"permission":e.fileDetails[0].permission,"hasChild":e.fileDetails[0].hasChild,"_fm_created":e.fileDetails[0]._fm_created,"_fm_modified":e.fileDetails[0]._fm_modified,"_fm_iconClass":e.fileDetails[0]._fm_iconClass}]}
    
                        urlencoded.append("downloadInput", JSON.stringify(fl));
                        const requestOptions:any = {
                            method: "POST",
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: "follow"
                        };
    
                        const file = await fetch("http://localhost:8090/Download", requestOptions);
                        //const data = await file.arrayBuffer();
                        setSelectedProperties(await file.json());

                    }

                    if (e.fileDetails[0].name.includes('.ifc')){

                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                        const urlencoded = new URLSearchParams();
                        //urlencoded.append("downloadInput", "{\"action\":\"download\",\"path\":\"/IFCFiles/More Files/\",\"names\":[\"model1.json\"],\"data\":[{\"dev\":3664944517,\"mode\":33206,\"nlink\":1,\"uid\":0,\"gid\":0,\"rdev\":0,\"blksize\":4096,\"ino\":5066549586190504,\"size\":7427401,\"blocks\":14512,\"atimeMs\":1711324439963.1167,\"mtimeMs\":1711324439963.1167,\"ctimeMs\":1711324439963.1167,\"birthtimeMs\":1711324439879.8691,\"atime\":\"2024-03-24T23:53:59.963Z\",\"mtime\":\"2024-03-24T23:53:59.963Z\",\"ctime\":\"2024-03-24T23:53:59.963Z\",\"birthtime\":\"2024-03-24T23:53:59.880Z\",\"name\":\"model1.json\",\"isFile\":true,\"dateModified\":\"2024-03-24T23:53:59.963Z\",\"dateCreated\":\"2024-03-24T23:53:59.963Z\",\"filterPath\":\"/IFCFiles/More Files/\",\"type\":\".json\",\"permission\":null,\"hasChild\":false,\"_fm_created\":\"March 24, 2024 18:53\",\"_fm_modified\":\"March 24, 2024 18:53\",\"_fm_iconClass\":\"e-fe-unknown e-fe-json\"}]}\n");
                        const fl:any = {"action":"download","path":e.fileDetails[0].filterPath,"names":[e.fileDetails[0].name],"data":[{"dev":e.fileDetails[0].dev,"mode":e.fileDetails[0].mode,"nlink":e.fileDetails[0].nlink,"uid":e.fileDetails[0].uid,"gid":e.fileDetails[0].gid,"rdev":e.fileDetails[0].rdev,"blksize":e.fileDetails[0].blksize,"ino":e.fileDetails[0].ino,"size":e.fileDetails[0].size,"blocks":e.fileDetails[0].blocks,"atimeMs":e.fileDetails[0].atimeMs,"mtimeMs":e.fileDetails[0].mtimeMs,"ctimeMs":e.fileDetails[0].ctimeMs,"birthtimeMs":e.fileDetails[0].birthtimeMs,"atime":e.fileDetails[0].atime,"mtime":e.fileDetails[0].mtime,"ctime":e.fileDetails[0].ctime,"birthtime":e.fileDetails[0].birthtime,"name":e.fileDetails[0].name,"isFile":e.fileDetails[0].isFile,"dateModified":e.fileDetails[0].dateModified,"dateCreated":e.fileDetails[0].dateCreated,"filterPath":e.fileDetails[0].filterPath,"type":e.fileDetails[0].type,"permission":e.fileDetails[0].permission,"hasChild":e.fileDetails[0].hasChild,"_fm_created":e.fileDetails[0]._fm_created,"_fm_modified":e.fileDetails[0]._fm_modified,"_fm_iconClass":e.fileDetails[0]._fm_iconClass}]}
    
                        urlencoded.append("downloadInput", JSON.stringify(fl));
                        const requestOptions:any = {
                            method: "POST",
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: "follow"
                        };
    
                        const file = await fetch("http://localhost:8090/Download", requestOptions);
                        const data = await file.arrayBuffer();
                        setSelectedModelsIFC(data);
    
                    }                    


                    //const fl1:any = {"action":"download","path":e.fileDetails[0].filterPath,"names":[e.fileDetails[0].name],"data":[{"dev":e.fileDetails[0].dev,"mode":e.fileDetails[0].mode,"nlink":e.fileDetails[0].nlink,"uid":e.fileDetails[0].uid,"gid":e.fileDetails[0].gid,"rdev":e.fileDetails[0].rdev,"blksize":e.fileDetails[0].blksize,"ino":e.fileDetails[0].ino,"size":e.fileDetails[0].size,"blocks":e.fileDetails[0].blocks,"atimeMs":e.fileDetails[0].atimeMs,"mtimeMs":e.fileDetails[0].mtimeMs,"ctimeMs":e.fileDetails[0].ctimeMs,"birthtimeMs":e.fileDetails[0].birthtimeMs,"atime":e.fileDetails[0].atime,"mtime":e.fileDetails[0].mtime,"ctime":e.fileDetails[0].ctime,"birthtime":e.fileDetails[0].birthtime,"name":e.fileDetails[0].name,"isFile":e.fileDetails[0].isFile,"dateModified":e.fileDetails[0].dateModified,"dateCreated":e.fileDetails[0].dateCreated,"filterPath":e.fileDetails[0].filterPath,"type":e.fileDetails[0].type,"permission":e.fileDetails[0].permission,"hasChild":e.fileDetails[0].hasChild,"_fm_created":e.fileDetails[0]._fm_created,"_fm_modified":e.fileDetails[0]._fm_modified,"_fm_iconClass":e.fileDetails[0]._fm_iconClass}]}

                    //setSelectedProperties()


                    /*fetch("http://localhost:8090/Download", requestOptions)
                    .then((response) => {
                        setSelectedModels(response.arrayBuffer);
                        response.text()
                    })
                    .then((result) => {
                        //setSelectedModels(result.arrayBuffer);
                        console.log(result)
                    })
                    .catch((error) => console.error(error));*/

                  }} 
                  //fileOpen={async(e:any)=>{console.log(e);}}
                  >
                    <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                </FileManagerComponent>
            </div>
        </div>
    );
}
export default ListIFCRepo;