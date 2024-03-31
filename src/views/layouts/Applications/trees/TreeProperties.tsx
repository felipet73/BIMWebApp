// GRID WIT PROPERTIES OF THE SELECTED ELEMENT

import { GridComponent, ColumnsDirective, ColumnDirective, Page, Edit, Toolbar, Group, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useBimProjectsStore } from '../../../../stores';
let refresh: Boolean;

/*export const orderDataSource = JSON.parse(purchaseData, (field, value) => {
    let dupValue = value;
    if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
        let arr = dupValue.split(/[^0-9]/);
        let arg = parseInt(arr[4], 10);
        let arg1 = parseInt(arr[5], 10);
        value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), arg, arg1);
    }
    return value;
});*/


function TreeProperties() {
    //const toolbarOptions: any = ['Edit', 'Update', 'Cancel'];
    //const toolbarOptions: any = [];
    const editSettings: any = { allowEditing: true };
    const editparams: any = { params: { popupHeight: '300px' } };
    /*const validationRule: Object = { required: true };
    const orderidRules: Object = { required: true, number: true };
    const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };*/

    const groupOptions: Object = { showGroupedColumn: false, columns: ['displayCategory'] };
    let gridInstance: GridComponent | any;
    const visible = false;
    const animationSettings: Object = { effect: 'None' };
    let alertDialogInstance: DialogComponent | any;

    const actualProperties = useBimProjectsStore(store => store.actualProperties);


    const alertButtons = [{
        click: () => {  
            alertDialogInstance.hide();
        },
        buttonModel: { content: 'OK', isPrimary: true }
    }];
    function dataBound() {
        if (refresh) {
            gridInstance.groupColumn('displayCategory');
            refresh = false;
        }
    }
    function load() {
        //refresh = (this as any).refreshing;
    }
    
    /*function columnDragStart(args:any) {
        if (args.column.field === 'OrderDate') {
            alertDialogInstance.show();
        }
    }*/
    function created() {
        //gridInstance.on('columnDragStart', columnDragStart, this);
        gridInstance.groupSettings.showDropArea = false;
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={actualProperties} allowPaging={false} ref={grid => gridInstance = grid} 
                //toolbar={toolbarOptions} 
                //pageSettings={{ pageCount: 5 }} 
                editSettings={editSettings} 
                allowGrouping={true} groupSettings={groupOptions} allowSorting={true} height="420"
                    dataBound={dataBound} load={load} created={created}
                    showColumnChooser={false}
                    >
                    <ColumnsDirective>
                        <ColumnDirective field='displayName' headerText='Name' width='40' textAlign='Left' 
                        //validationRules={orderidRules} 
                        isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='displayValue' headerText='Value' width='50' textAlign='Right' 
                        //validationRules={validationRule}
                        >

                        </ColumnDirective>
                        <ColumnDirective field='displayCategory' headerText='' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Group, Sort, Edit, Toolbar]} />
                </GridComponent>
                <DialogComponent id="alertDialog" header='Grouping' visible={visible} animationSettings={animationSettings} width='300px' content='Grouping is disabled for this column' ref={alertdialog => alertDialogInstance = alertdialog} target='.control-section' buttons={alertButtons} ></DialogComponent>
            </div>
        </div>
    )
}
export default TreeProperties;