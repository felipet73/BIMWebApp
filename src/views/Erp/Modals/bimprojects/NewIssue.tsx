import * as React from 'react';
import { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';


import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, DragEventArgs } from '@syncfusion/ej2-react-schedule';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';

import { UploaderComponent, FilesDirective, UploadedFilesDirective, RemovingEventArgs } from '@syncfusion/ej2-react-inputs';
import { Uploader, SelectedEventArgs, FileInfo } from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';

import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';

import { EmitType, detach, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';

import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject as Inject1, Image, Link, HtmlEditor, Count, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, IToolbarItems } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, FileManager, FileManagerSettingsModel, QuickToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';


import { NodeSelection} from '@syncfusion/ej2-react-richtexteditor';
//import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { getComponent } from '@syncfusion/ej2-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
//import './image-editor-integration.css';



//import './tools.css';

import './components-dialog.css';
import TreeDocumentsIssue from '../../../layouts/Applications/trees/TreeDocumentsIssue';
import { GlobalContext } from '../../../../context/GlobalContext';
import { useBimProjectsStore } from '../../../../stores';
//import { scheduleData, gridData } from './data';




const FormDetails = ()=>{

    const { viewerC, onItemHovering, onModelLoaded1, init22, removeEv, onItemClick, addEv, modeIssues } = React.useContext( GlobalContext );
    const actualIssue = useBimProjectsStore(store=>store.actualIssue);
    const setActualIssue = useBimProjectsStore(store=>store.setActualIssue);

    let formObject = useRef<FormValidator>(null);
    const temp: string = 'empList';
    // define the JSON of employees data
    const employeesData: { [key: string]: Object }[] = [
        { Name: "Issues", Designation: "Type..." },
        { Name: "Comments", Designation: "2" },
        { Name: "Requirements", Designation: "HR" },
    ];
    // maps the appropriate column to fields property
    const fields: object = { text: 'Name', value: 'Name' };
    const [tSelected, setTSelected] = React.useState('Issues');
    //set the value to header template
    const headerTemplateCmb = () => {
        return (
            <div className="header"> <span>Img</span> <span className="columnHeader">Mark type</span></div>
        );
    }
    //set the value to item template
    const itemTemplateCmb = (data: any) => {
        return (
            <div><img className="empImage" src={"/assets/svg/" + data.Name + ".svg"} alt="employee" />
                <div className="ename"> {data.Name} </div><div className="job"> {data.Designation} </div></div>
        );
    }

    const onSubmitClick = (): void => {
        if (formObject.current!.validate()) {
            formObject.current!.element.reset();
        }
    }




    //const temp1: string = 'empList';
    // define the JSON of data
    const userData: { [key: string]: Object }[] = [
        { "Name": "Andrew Fuller", "Eimg": "7", "Job": "Team Lead", "Country": "England" },
        { "Name": "Anne Dodsworth", "Eimg": "1", "Job": "Developer", "Country": "USA" },
        { "Name": "Janet Leverling", "Eimg": "3", "Job": "HR", "Country": "USA" },
        { "Name": "Laura Callahan", "Eimg": "2", "Job": "Product Manager", "Country": "USA" },
        { "Name": "Margaret Peacock", "Eimg": "6", "Job": "Developer", "Country": "USA" },
        { "Name": "Michael Suyama", "Eimg": "9", "Job": "Team Lead", "Country": "USA" },
        { "Name": "Nancy Davolio", "Eimg": "4", "Job": "Product Manager", "Country": "USA" },
        { "Name": "Robert King", "Eimg": "8", "Job": "Developer ", "Country": "England" },
        { "Name": "Steven Buchanan", "Eimg": "10", "Job": "CEO", "Country": "England" }
    ];
    // maps the appropriate column to fields property
    const fields1: object = { text: 'Name', value: 'Eimg' };
    //set the value to header template
    const headerTemplateUs = useCallback(() => {
        return (
            <div className="header">
                <span>Photo</span>
                <span className="columnHeader">Employee Info</span>
            </div>
        );
    }, []);
    //set the value to item template
    const itemTemplateUs = useCallback((data: any) => {
        return (
            <div>
                <img className="empImage" src={"src/combo-box/Employees/" + data.Eimg + ".png"} alt="employee" />
                <div className="ms-ename">{data.Name}</div>
                <div className="ms-job">{data.Job}</div>
            </div>
        );
    }, []);
    //set the value to value template
    const valueTemplateUs = useCallback((data: any) => {
        return (
            <div>
                <img className="valueTemp" src={"src/combo-box/Employees/" + data.Eimg + ".png"} alt="employee" />
                <div className="nameTemp">{data.Name}</div>
            </div>
        );
    }, []);

    useEffect(() => {
        if (modeIssues.current==='none'){
            setTSelected('Issues')
        }
        if (modeIssues.current==='Issues'){
            setTSelected('Issues')
        }
        if (modeIssues.current==='Comments'){
            setTSelected('Comments')
        }
        if (modeIssues.current==='Requirements'){
            setTSelected('Requirements')
        }
    }, [modeIssues.current])

    useEffect(() => {
        if (modeIssues.current==='none')modeIssues.current='Issues';
        console.log('tselecteeed', tSelected);
        const ff = async ()=>{
            console.log('ejecutando');
            const DataVizCore = Autodesk.DataVisualization.Core;
            removeEv(viewerC.current);
            await onModelLoaded1(viewerC.current);
            init22(viewerC.current);
            viewerC.current.removeEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);
            viewerC.current.addEventListener(DataVizCore.MOUSE_HOVERING, onItemHovering);
            viewerC.current.removeEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
            viewerC.current.addEventListener(DataVizCore.MOUSE_CLICK, onItemClick);
        }
        ff();
    }, [tSelected])

    return (
        <div id="formComponents" style={{ margin: '30px 45px 5px 45px' }}>
            <img style={{ position: 'absolute', height: '60px', width: '60px', marginLeft: '30px', marginTop: '-10px' }} className="empImage" src={"/assets/svg/" + tSelected + ".svg"} alt="employee" />
            <h4 className="form-title" style={{ margin: '0px 110px 5px 110px' }}>Adding New <ComboBoxComponent id="employees" dataSource={employeesData} fields={fields} placeholder="Select mark type" value={tSelected} itemTemplate={itemTemplateCmb} headerTemplate={headerTemplateCmb} onChange={(e: any) => {
                console.log(e);
                if (!e.value || e.value === ''){
                    setTSelected('Issues')
                    modeIssues.current='Issues';
                }
                else
                    setTSelected(e.value)
                modeIssues.current=e.value;
            }} popupHeight="270px" /></h4>

            <div className="validation_wrapper">
                <form id="formId" className="form-horizontal">
                    <div className="form-group">
                        <div className="e-float-input">
                            <input type="text" id="user" name="user" data-msg-containerid="userError" />
                            <span className="e-float-line" />
                            <label className="e-float-text e-label-top" htmlFor="name">Name</label>
                        </div>
                        <div className="e-float-input">
                            <textarea id="Address" name="Address"></textarea>
                            <span className="e-float-line" />
                            <label className="e-float-text e-label-top" htmlFor="mobile">Description</label>
                        </div>
                        <div id="userError" />
                    </div>
                    <div className="form-group" >
                    <div id='multitemp' className='control-pane'>
                        <div className='control-section'>
                            <div id='multitemplate' className="control-styles">
                                <h4>Users</h4>
                                <MultiSelectComponent id="multiTemplate" dataSource={userData} fields={fields} mode="Box" placeholder="Select employee" itemTemplate={itemTemplateUs} valueTemplate={valueTemplateUs} headerTemplate={headerTemplateUs} />
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', marginTop:'10px' }}>
                        <h4 className="form-title" style={{ margin: '0px 10px 5px 10px' }}>Type <ComboBoxComponent id="employees" dataSource={employeesData} fields={fields} placeholder="Select mark type" value={tSelected} itemTemplate={itemTemplateCmb} headerTemplate={headerTemplateCmb} onChange={(e: any) => {
                            console.log(e);
                            if (!e.value || e.value === '')
                                setTSelected('Issue')
                            else
                                setTSelected(e.value)
                        }} popupHeight="270px" /></h4>
                        <h4 className="form-title" style={{ margin: '0px 10px 5px 30px' }}>Status <ComboBoxComponent id="employees" dataSource={employeesData} fields={fields} placeholder="Select mark type" value={tSelected} itemTemplate={itemTemplateCmb} headerTemplate={headerTemplateCmb} onChange={(e: any) => {
                            console.log(e);
                            if (!e.value || e.value === '')
                                setTSelected('Issue')
                            else
                                setTSelected(e.value)
                        }} popupHeight="270px" /></h4>


                    </div>

                    <div className="form-group" style={{ display: 'flex' }}>
                        <div className="e-float-input">
                            <DatePickerComponent placeholder="Date" id="dob" name="dob" data-msg-containerid="dobError" />
                            <span className="e-float-line" />
                        </div>
                        <div className="e-float-input" style={{ marginLeft: '15px' }}>
                            <DatePickerComponent placeholder="Stimated Date Finish" id="dob" name="dob" data-msg-containerid="dobError" />
                            <span className="e-float-line" />
                        </div>
                        <div id="dobError" />
                    </div>
                    <div className="form-group" >
                        <div className="e-float-input">
                            <input type="text" id="city" disabled name="city" data-msg-containerid="cityError" value={ (actualIssue?.point) ? JSON.stringify(actualIssue?.point) : 'none' } />
                            <span className="e-float-line" />
                            <label className="e-float-text e-label-top" htmlFor="city">Point</label>
                        </div>
                        <div className="e-float-input">
                            <input type="text" id="city" disabled name="city" data-msg-containerid="cityError"  value={ (actualIssue?.camera) ? JSON.stringify(actualIssue?.camera) : 'none' } />
                            <span className="e-float-line" />
                            <label className="e-float-text e-label-top" htmlFor="city">Camera</label>
                        </div>

                        <div id="cityError" />
                    </div>
                    

                    <div className="row" style={{ marginTop:'10px' }}>
                        <div className="submitRow">
                            <div style={{ float: 'left' }}>
                                <button id="resetbtn" className="samplebtn e-control e-btn e-reset-btn" type="reset" data-ripple="true">Clear</button>
                            </div>
                            <div style={{ display: 'inline-block', marginLeft:'15px' }}>
                                <button id="submit-btn" className="samplebtn e-control e-btn e-primary e-submit-btn" onClick={onSubmitClick} type="submit" data-ripple="true">Save</button>
                            </div>

                            <div style={{ float: 'right' }}>
                                <button id="resetbtn" className="samplebtn e-control e-btn e-reset-btn" type="reset" data-ripple="true" onClick={()=>{
                                    addEv(viewerC.current)
                                }}>{'Set Mark Point >>'}</button>
                            </div>

                        </div>
                    </div>
                </form>
                <br />
                <br />
            </div>
        </div>

    )
}





const DocumentEditor=() => {
    let rteObj: any;
    const hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    // Rich Text Editor items list
    const items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
        
    ];
    const fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        }
    }
    const quickToolbarSettings: QuickToolbarSettingsModel = {
        table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles'],
        image: [
            'Replace',
            'Align',
            'Caption',
            'Remove',
            '-',
            'InsertLink',
            'OpenImageLink',
            'EditImageLink',
            'RemoveImageLink',
            'Display',
            'AltText',
            {
              tooltipText: 'Image Editor',
              template:
                '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span>',
            },
          ],        
        showOnRightClick: true,
    }
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: [...items, { text: "Take Picture", tooltipText: "Take picture from Model", id: "option" } as IToolbarItems]
        
    };
    let textArea: HTMLTextAreaElement;
    let myCodeMirror:any;
    function mirrorConversion(e?: any): void {
        const textArea = rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        let id: string = (rteObj as any).getID() + 'mirror-view';
        let mirrorView: HTMLElement = rteObj.element.querySelector('#' + id) as HTMLElement;
        let charCount: HTMLElement = rteObj.element.querySelector('.e-rte-character-count') as HTMLElement;
        if (e.targetItem === 'Preview') {
            textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            textArea.innerHTML = myCodeMirror?.getValue();
            charCount.style.display = 'block';
        } else {
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                textArea.parentNode?.appendChild(mirrorView);
            } else {
                mirrorView.innerHTML = '';
            }
            textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            renderCodeMirror(mirrorView, (rteObj as any).value);
            charCount.style.display = 'none';
        }
    }
    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        myCodeMirror = CodeMirror!.default(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,

        });
    }
    function handleFullScreen(e: any): void {
        let sbCntEle: HTMLElement|null = document.querySelector('.sb-content.e-view');
        let sbHdrEle: HTMLElement|null = document.querySelector('.sb-header.e-view');
        let leftBar: HTMLElement|null;
        let transformElement: HTMLElement|null;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        } else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle!, sbHdrEle!], ['hide-header']);
            }
            addClass([leftBar!], ['e-close']);
            removeClass([leftBar!], ['e-open']);
            if (!Browser.isDevice) { transformElement!.style.marginLeft = '0px'; }
            transformElement!.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle!, sbHdrEle!], ['hide-header']);
            }
            removeClass([leftBar!], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar!], ['e-open']);
                transformElement!.style.marginLeft = leftBar!.offsetWidth + 'px';
            }
            transformElement!.style.transform = 'translateX(0px)';
        }
    }
    function actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            (rteObj.sourceCodeModule.getPanel() as HTMLTextAreaElement).style.display = 'none';
            mirrorConversion(e);
        } else {
            setTimeout(() => { (rteObj as any).toolbarModule.refreshToolbarOverflow(); }, 1000);
        }
    }




    //var rteObj;
    const dlgButtons = [
      {
        buttonModel: { content: 'Save', isPrimary: true },
        click: onInsert.bind(this),
      },
      { buttonModel: { content: 'Cancel' }, click: onCancel },
    ];
    const toolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
      'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
      'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
      'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
      'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur' ];
    const selection = new NodeSelection();
    const header = 'Image Editor';
    var dialogObj:any;
    var imageEditorObj:any;
    //var rteObj:any;
    var range:any;
    var saveSelection:any;
    //var dataURL;
    var isLoaded = false;
    var imageELement:any;
    function onInsert() {
      if (rteObj.formatter.getUndoRedoStack().length === 0) {
        rteObj.formatter.saveData();
      }
      saveSelection.restore();
      var canvas: any = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      const imgData = imageEditorObj.getImageData();
      canvas.height = imgData.height;
      canvas.width = imgData.width;
      ctx.putImageData(imgData, 0, 0);
      isLoaded = true;
      rteObj.executeCommand('editImage', {
        url: canvas.toDataURL(),
        width: { width: canvas.width },
        height: { height: canvas.height },
        selection: saveSelection,
        cssClass: imageELement.getAttribute('class').replace('e-rte-image', ''),
      });
      rteObj.formatter.saveData();
      rteObj.formatter.enableUndo(rteObj);
      dispose();
      dialogObj.hide();
      imageELement.crossOrigin = null;
    }
  
    function onCancel() {
      dispose();
      dialogObj.hide();
      isLoaded = true;
      imageELement.crossOrigin = null;
    }
    function dispose() {
      const imageEditorInstance = getComponent(document.getElementById('image-editor')!, 'image-editor') as ImageEditor;
      if (imageEditorInstance !== null && imageEditorInstance !== undefined) {
        imageEditorInstance.destroy();
      }
    }
    function onClose() {
      dispose();
      dialogObj.hide();
      isLoaded = true;
      imageELement.crossOrigin = null;
    }
    function onToolbarClick(args:any) {
    try {
        if (args.item.tooltipText === 'Image Editor') {
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.show();
            rteObj.quickToolbarModule.imageQTBar.hidePopup();
        }
            
    } catch (error) {
        
    }

    }
    function OnBeforeOpen() {
      dispose();
      isLoaded = false;
      var selectNodes =
        rteObj.formatter.editorManager.nodeSelection.getNodeCollection(range);
      if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
        imageELement = selectNodes[0];
        imageELement.crossOrigin = 'anonymous';
        var canvas: any = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = imageELement.offsetHeight;
        canvas.width = imageELement.offsetWidth;
        var imageELe = imageELement;
        var isLoded = isLoaded;
        imageELement.onload = function () {
          ctx.drawImage(imageELe, 0, 0, canvas.width, canvas.height);
          let dataURL = canvas.toDataURL();
          if (!isLoded) {
            imageEditorObj = new ImageEditor({
              height: '450px',
              created: function () {
                imageEditorObj.open(dataURL!);
              },
            });
            imageEditorObj.appendTo('#image-editor');
            isLoded = true;
          }
        };
      }
    }
    /*const quickToolbarSettings = {
      image: [
        'Replace',
        'Align',
        'Caption',
        'Remove',
        '-',
        'InsertLink',
        'OpenImageLink',
        'EditImageLink',
        'RemoveImageLink',
        'Display',
        'AltText',
        {
          tooltipText: 'Image Editor',
          template:
            '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span>',
        },
      ],
    };*/



    const contentText = `<p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p><p><b>Key features:</b></p><ul><li><p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p></li><li><p>Capable of handling markdown editing.</p></li><li><p>Contains a modular library to load the necessary functionality ondemand.</p></li><li><p>Provides a fully customizable toolbar.</p></li></ul><p>4545454545454</p><p><img src="http://localhost:3001/api/images/projects/9ed12d41-1cfd-4c1b-91bf-6dd3eebfa744.png" class="e-rte-image e-imginline" alt="1705930090327" width="auto" height="auto" style="min-width: 0px; max-width: 649px; min-height: 0px;"> </p><p>5966666666</p><p><br></p><p>125</p><p>63</p><p><br></p><ul><li><p>Provides HTML view to edit the source directly for developers.</p></li><li><p>Supports third-party library integration.</p></li><li><p>Allows preview of modified content before saving it.</p></li><li><p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p></li><li><p>Contains undo/redo manager.</p></li><li><p>Creates bulleted and numbered lists.</p></li></ul>`;




    return (
        <div className='control-pane'>
            <div className='control-section' id="rte">
                <div className='rte-control-section' >
                    <RichTextEditorComponent id="rteImageEditor" ref={(richtexteditor) => { rteObj = richtexteditor as RichTextEditorComponent }}
                        showCharCount={true} actionBegin={handleFullScreen.bind(this)}
                        actionComplete={actionCompleteHandler.bind(this)} toolbarSettings={toolbarSettings}
                        fileManagerSettings={fileManagerSettings} quickToolbarSettings={quickToolbarSettings} enableTabKey={true}
                        toolbarClick={onToolbarClick}
                        value={contentText}

                        >
                            

                            {/* <p>The Rich Text Editor is a WYSIWYG ("what you see is what you get") editor useful to create and edit content, and return the valid <a href='https://ej2.syncfusion.com/home/' target='_blank'>HTML markup</a> or <a href='https://ej2.syncfusion.com/home/' target='_blank'>markdown</a> of the content</p><p><b>Toolbar</b></p><ol><li> <p>The Toolbar contains commands to align the text, insert a link, insert an image, insert list, undo/redo operations, HTML view, etc </p></li><li><p>The Toolbar is fully customizable </p></li></ol><p><b>Links</b></p><ol><li><p>You can insert a hyperlink with its corresponding dialog </p></li><li><p>Attach a hyperlink to the displayed text. </p></li><li><p>Customize the quick toolbar based on the hyperlink </p> </li></ol><p><b>Image.</b></p><ol><li><p>Allows you to insert images from an online source as well as the local computer </p> </li><li><p>You can upload an image</p></li><li><p>Provides an option to customize the quick toolbar for an image </p></li></ol><p><img alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" style={{ width: '300px' }} /></p> */}
                        <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, FileManager, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup]} />
                    </RichTextEditorComponent>
                    <DialogComponent
                id="ImageEditorDialog"
                ref={(scope) => {
                dialogObj = scope;
                }}
                buttons={dlgButtons}
                beforeOpen={OnBeforeOpen}
                header={header}
                visible={false}
                showCloseIcon={true}
                width="800px"
                height="550px"
                isModal={true}
                close={onClose}
            >
                <div className="dialogContent">
                <ImageEditorComponent
                    id="image-editor"
                    height="400px"
                    ref={(scope) => {
                    imageEditorObj = scope;
                    }}
                    toolbar={toolbar}
                />
                </div>
            </DialogComponent>

                </div>
            </div>

        </div>
    );
}






interface Props {
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewIssue = ({ status, setStatus }: Props) => {
    let buttons: ButtonPropsModel[];
    let animationSettings: AnimationSettingsModel;
    let dialogInstance = useRef<DialogComponent>(null);
    //let formObject = useRef<FormValidator>(null);
    let buttonEle: HTMLButtonElement | null;


    const { viewerC, onItemHovering, onModelLoaded1, init22, removeEv, onItemClick, addEv, modeIssues } = React.useContext( GlobalContext );
    //const actualIssue = useBimProjectsStore(store=>store.actualIssue);
    const setActualIssue = useBimProjectsStore(store=>store.setActualIssue);


    let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
        buttonEle = element;
    };
    buttons = [
        {
            click: () => {
                dialogInstance.current!.hide();
            },
            buttonModel: {
                content: 'OK',
                isPrimary: true,
            },
        },
        {
            click: () => {
                dialogInstance.current!.hide();
            },
            buttonModel: {
                content: 'CANCEL',
            },
        },
    ];
    animationSettings = { effect: 'None' };

    /*const onSubmitClick = (): void => {
        if (formObject.current!.validate()) {
            formObject.current!.element.reset();
        }
    }*/


    const data1: any[] = [
        { x: new Date(2005, 0, 1), y: 21 },
        { x: new Date(2006, 0, 1), y: 24 },
        { x: new Date(2007, 0, 1), y: 36 },
        { x: new Date(2008, 0, 1), y: 38 },
        { x: new Date(2009, 0, 1), y: 54 },
        { x: new Date(2010, 0, 1), y: 57 },
        { x: new Date(2011, 0, 1), y: 70 },
    ];
    const data2: any[] = [
        { x: new Date(2005, 0, 1), y: 28 },
        { x: new Date(2006, 0, 1), y: 44 },
        { x: new Date(2007, 0, 1), y: 48 },
        { x: new Date(2008, 0, 1), y: 50 },
        { x: new Date(2009, 0, 1), y: 66 },
        { x: new Date(2010, 0, 1), y: 78 },
        { x: new Date(2011, 0, 1), y: 84 },
    ];
    const onDragStart = (args: DragEventArgs): void => {
        args.navigation!.enable = true;
    }
    const headerText: any = [
        { text: 'Issue Details' },
        { text: 'Issue Document' },
        { text: 'Asociated Tasks' },
        { text: 'Documents' },
        { text: 'Actions' },
        { text: 'Chart' },
    ];

    const content0 = () => {
        return (
            <GridComponent dataSource={[]} allowPaging={true} pageSettings={{ pageSize: 5, pageSizes: true }}>
                <ColumnsDirective>
                    <ColumnDirective field="OrderID" headerText="Order ID" width="120" textAlign="Right" />
                    <ColumnDirective field="CustomerName" headerText="Customer Name" width="150" />
                    <ColumnDirective field="OrderDate" headerText="Order Date" width="130" format="yMd" textAlign="Right" />
                    <ColumnDirective field="Freight" headerText="Freight" width="120" format="C2" textAlign="Right" />
                    <ColumnDirective field="ShippedDate" headerText="Shipped Date" width="130" format="yMd" textAlign="Right" />
                    <ColumnDirective field="ShipCountry" headerText="Ship Country" width="150" />
                </ColumnsDirective>
                <Inject services={[Page]} />
            </GridComponent>
        );
    }
    const content1 = () => {
        return (
            <ScheduleComponent height="300px" selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: [] }} dragStart={onDragStart}>
                <ViewsDirective>
                    <ViewDirective option="Day" />
                    <ViewDirective option="Week" />
                    <ViewDirective option="WorkWeek" />
                    <ViewDirective option="Month" />
                    <ViewDirective option="Agenda" />
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
        );
    }
    const content2 = () => {
        return (
            <ChartComponent id="DialogChart" primaryXAxis={{ valueType: 'DateTime', labelFormat: 'y', intervalType: 'Years', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, }} load={load} primaryYAxis={{ labelFormat: '{value}%', rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '60%'} title="Inflation - Consumer Price" loaded={onChartLoad}>
                <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={data1} xName="x" yName="y" name="Germany" width={2} marker={{ visible: true, width: 10, height: 10 }} type="Line"></SeriesDirective>
                    <SeriesDirective dataSource={data2} xName="x" yName="y" name="England" width={2} marker={{ visible: true, width: 10, height: 10 }} type="Line"></SeriesDirective>
                </SeriesCollectionDirective>
            </ChartComponent>
        );
    }

    const contentText = `<p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p><p><b>Key features:</b></p><ul><li><p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p></li><li><p>Capable of handling markdown editing.</p></li><li><p>Contains a modular library to load the necessary functionality ondemand.</p></li><li><p>Provides a fully customizable toolbar.</p></li></ul><p>4545454545454</p><p><img src="http://localhost:3001/api/images/projects/9ed12d41-1cfd-4c1b-91bf-6dd3eebfa744.png" class="e-rte-image e-imginline" alt="1705930090327" width="auto" height="auto" style="min-width: 0px; max-width: 649px; min-height: 0px;"> </p><p>5966666666</p><p><br></p><p>125</p><p>63</p><p><br></p><ul><li><p>Provides HTML view to edit the source directly for developers.</p></li><li><p>Supports third-party library integration.</p></li><li><p>Allows preview of modified content before saving it.</p></li><li><p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p></li><li><p>Contains undo/redo manager.</p></li><li><p>Creates bulleted and numbered lists.</p></li></ul>`;


    const content3 = () => {
        return (
            <RichTextEditorComponent id="defaultRTE" change={(e)=>{
                console.log(e)
            }} value={contentText}>
                {/* <p>
                    The rich text editor component is WYSIWYG ("what you see is what you
                    get") editor that provides the best user experience to create and
                    update the content. Users can format their content using standard
                    toolbar commands.
                </p>
                <p>
                    <b>Key features:</b>
                </p>
                <ul>
                    <li>
                        <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                    </li>
                    <li>
                        <p>Capable of handling markdown editing.</p>
                    </li>
                    <li>
                        <p>Contains a modular library to load the necessary functionality ondemand.</p>
                    </li>
                    <li>
                        <p>Provides a fully customizable toolbar.</p>
                    </li>
                    <li>
                        <p>Provides HTML view to edit the source directly for developers.</p>
                    </li>
                    <li>
                        <p>Supports third-party library integration.</p>
                    </li>
                    <li>
                        <p>Allows preview of modified content before saving it.</p>
                    </li>
                    <li>
                        <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                    </li>
                    <li>
                        <p>Contains undo/redo manager.</p>
                    </li>
                    <li>
                        <p>Creates bulleted and numbered lists.</p>
                    </li>
                </ul> */}
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
        );
    }




    


    





    let uploadObj = useRef<UploaderComponent>(null);
    let dropElement: HTMLElement;
    let asyncSettings: object;
    let dropContainerRef: any;
    let dropContainerEle: HTMLElement | null;
    dropContainerEle = null;
    dropContainerRef = (element: any) => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };

    const rendereComplete = (): void => {
        dropElement = dropContainerEle as HTMLElement;
        uploadObj.current!.dropArea = dropElement;
        uploadObj.current!.dataBind();
        uploadObj.current!.element.setAttribute('name', 'UploadFiles');
    }
    const onRemoveFile = (args: RemovingEventArgs): void => {
        args.postRawFile = false;
    }
    const clearButtonClick = (): void => {
        uploadObj.current!.clearAll();
    }

    const content5 = () => {
        return (
            <div className='control-pane' ref={dropContainerRef}>
                <div className='control-section uploadpreview'>
                    <div className='col-lg-5'>
                        <div className='validation_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} asyncSettings={asyncSettings} removing={onRemoveFile.bind(this)}>
                                <FilesDirective>
                                    <UploadedFilesDirective name="Nature" size={25000} type=".png"></UploadedFilesDirective>
                                    <UploadedFilesDirective name="TypeScript succinctly" size={12000} type=".pdf"></UploadedFilesDirective>
                                    <UploadedFilesDirective name="ASP.NET" size={17000} type=".docx"></UploadedFilesDirective>
                                </FilesDirective>
                            </UploaderComponent>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div className='validation_wrapper'>
                            <TreeDocumentsIssue />
                        </div>
                    </div>

                </div>
            </div>

        )
    }







    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    }

    const onChartLoad = (): void => {
        let chart: Element | any = document.getElementById('DialogChart');
        chart.setAttribute('title', '');
    }
    /* const buttonClick = (): void => {
       dialogInstance.current!.show();
     }*/
    const dialogClose = (): void => {
        setStatus(false);
        //buttonEle!.style.display = 'block';
    }
    const dialogOpen = (): void => {
        //buttonEle!.style.display = 'none';
    }

    return (

        <DialogComponent id="defaultDialo" allowDragging={true} enableResize={true} showCloseIcon={true} ref={dialogInstance} animationSettings={animationSettings} visible={status} width={'700px'} target={'#root'} header="AddIng Mew Issue !!" buttons={buttons} open={dialogOpen} close={dialogClose} style={{ opacity: '0.98' }}>
            <TabComponent id="tab-wizard">
                <TabItemsDirective>
                    <TabItemDirective header={headerText[0]} content={FormDetails} />
                    <TabItemDirective header={headerText[1]} content={DocumentEditor} />
                    <TabItemDirective header={headerText[2]} content={content1} />
                    <TabItemDirective header={headerText[3]} content={content5} />
                    <TabItemDirective header={headerText[4]} content={content0} />
                    <TabItemDirective header={headerText[5]} content={content2} />
                </TabItemsDirective>
            </TabComponent>
        </DialogComponent>


    );
}
export default NewIssue;