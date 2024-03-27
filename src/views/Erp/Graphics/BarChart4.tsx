import { EmitType } from '@syncfusion/ej2-base';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, BubbleSeries, Tooltip, IPointRenderEventArgs, ILoadedEventArgs, ChartTheme, DataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bubbleFabricColors, bubbleMaterialDarkColors, bubbleMaterialColors, bubbleBootstrap5DarkColors, bubbleBootstrapColors, bubbleHighContrastColors, bubbleFluentDarkColors, bubbleFluentColors, bubbleTailwindDarkColors, bubbleTailwindColors, pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors, bubbleMaterial3Colors, pointMaterial3Colors, bubbleMaterial3DarkColors, pointMaterial3DarkColors } from './theme-color';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = document.location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = bubbleFabricColors[args.point.index % 10];
        args.border.color = pointFabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material-dark') {
        args.fill = bubbleMaterialDarkColors[args.point.index % 10];
        args.border.color = pointMaterialDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = bubbleMaterialColors[args.point.index % 10];
        args.border.color = pointMaterialColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = bubbleBootstrap5DarkColors[args.point.index % 10];
        args.border.color = pointBootstrap5DarkColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap5') {
        args.fill = bubbleBootstrap5Colors[args.point.index % 10];
        args.border.color = pointBootstrap5Colors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap4') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'bootstrap-dark') {
        args.fill = bubbleBootstrapColors[args.point.index % 10];
        args.border.color = pointBootstrapColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = bubbleHighContrastColors[args.point.index % 10];
        args.border.color = pointHighContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = bubbleFluentDarkColors[args.point.index % 10];
        args.border.color = pointFluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = bubbleFluentColors[args.point.index % 10];
        args.border.color = pointFluentColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind-dark') {
        args.fill = bubbleTailwindDarkColors[args.point.index % 10];
        args.border.color = pointTailwindDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'tailwind') {
        args.fill = bubbleTailwindColors[args.point.index % 10];
        args.border.color = pointTailwindColors[args.point.index % 10];
    } else if (selectedTheme === 'material3') {
        args.fill = bubbleMaterial3Colors[args.point.index % 10];
        args.border.color = pointMaterial3Colors[args.point.index % 10];
    } else if (selectedTheme === 'material3-dark') {
        args.fill = bubbleMaterial3DarkColors[args.point.index % 10];
        args.border.color = pointMaterial3DarkColors[args.point.index % 10];
    }
};
export let data: any[] = [
    { x: 92.2, y: 7.8, size: 1.347, toolTipMappingName: 'China', text:'China' },
    { x: 74, y: 6.5, size: 1.241, toolTipMappingName: 'India', text:'India' },
    { x: 90.4, y: 6.0, size: 0.238, toolTipMappingName: 'Indonesia', text: Browser.isDevice ? 'ID' : 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, toolTipMappingName: 'United States' , text:'US'},
    { x: 88.6, y: 1.3, size: 0.197, toolTipMappingName: 'Brazil' , text: Browser.isDevice ? 'BR' : 'Brazil'},
    { x: 99, y: 0.7, size: 0.0818, toolTipMappingName: 'Germany' , text: Browser.isDevice ? 'DE' : 'Germany'},
    { x: 72, y: 2.0, size: 0.0826, toolTipMappingName: 'Egypt' , text: Browser.isDevice ? 'EG' : 'Egypt'},
    { x: 99.6, y: 3.4, size: 0.143, toolTipMappingName: 'Russia' , text: Browser.isDevice ? 'RUS' : 'Russia' },
    { x: 96.5, y: 0.2, size: 0.128, toolTipMappingName: 'Japan' , text: Browser.isDevice ? 'JP' : 'Japan'},
    { x: 86.1, y: 4.0, size: 0.115, toolTipMappingName: 'MeLiteracy Ion' , text:'MLI'},
    { x: 92.6, y: 5.2, size: 0.096, toolTipMappingName: 'Philippines' , text:'PH'},
    { x: 61.3, y: 1.45, size: 0.162, toolTipMappingName: 'Nigeria' , text:'Nigeria'},
    { x: 82.2, y: 3.97, size: 0.7, toolTipMappingName: 'Hong Kong' , text: Browser.isDevice ? 'HK' : 'Hong Kong'},
    { x: 79.2, y: 4.9, size: 0.162, toolTipMappingName: 'Netherland' , text:'NL'},
    { x: 72.5, y: 4.5, size: 0.7, toolTipMappingName: 'Jordan' , text:'Jordan'},
    { x: 81, y: 2.5, size: 0.21, toolTipMappingName: 'Australia' , text: Browser.isDevice ? 'AU' : 'Australia'},
    { x: 66.8, y: 3.9, size: 0.028, toolTipMappingName: 'Mongolia' , text:'MN'},
    { x: 78.4, y: 2.9, size: 0.231, toolTipMappingName: 'Taiwan' , text: Browser.isDevice ? 'TW' : 'Taiwan'}
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    ellipse[id*=_Trackball_0] {

        strokeWidth: 1 !important;
    }`;

/**
 * Bubble sample
 */
const BarChart4 = () => {

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts4') as Element;
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts4' style={{ textAlign: "center" }} primaryXAxis={{ minimum: 65, maximum: 102, interval: 5, crossesAt: 5 }} load={load.bind(this)} primaryYAxis={{ minimum: 0, maximum: 10, crossesAt: 85, interval: 2.5 }} width={Browser.isDevice ? '100%' : '75%'} title='World Countries Details' pointRender={pointRender} legendSettings={{ visible: false }} loaded={onChartLoad.bind(this)} tooltip={{ enableMarker: false, enable: true, header: "<b>${point.tooltip}</b>", format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>" }}>
                    <Inject services={[BubbleSeries, Tooltip, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} type='Bubble' minRadius={3} maxRadius={8} tooltipMappingName='toolTipMappingName' border={{ width: 2 }} xName='x' yName='y' size='size' marker={{ dataLabel: { visible: true, name: 'text', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>
    )
}
export default BarChart4;