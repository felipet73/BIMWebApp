import {
    Inject, ChartComponent, StripLine, PeriodSelector, ChartAnnotation,
    CandleSeries, ChartTheme, IChangedEventArgs, ILoadedEventArgs, MomentumIndicator,
    SeriesDirective, IRangeLoadedEventArgs, Crosshair, DateTime, LineSeries, SeriesCollectionDirective,
    Tooltip, RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective,
    AnnotationDirective, AnnotationsDirective, IAxisLabelRenderEventArgs,
    ITooltipRenderEventArgs, IAxisRangeCalculatedEventArgs, IMouseEventArgs, withInBounds, MacdIndicator
} from '@syncfusion/ej2-react-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { SwitchComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { periodData } from './period-data';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";

export let zoomFactor: number;
export let zoomPosition: number;
export let data: any[] = [];
for (let i: number = 2110; i < periodData.length - 20; i++) {
    data.push({
        High: periodData[i].High,
        Low: periodData[i].Low,
        Close: periodData[i].Close,
        Open: periodData[i].Open,
        date: new Date(2010, 6, i)
    });
}

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px;
     }
     #rowStyle{
         width:80%; transform: translateX(13%)
     }
     #text{ 
         transform:translateX(15%);       
         display: flex; font-size: 36px; font-weight: 500;
         align-items: center;
         justify-content: space-between;
         align:left;
     }
     .col-sm-4{
         align : right;
         margin-top: 1%
     }
     #chart_tooltip {
         opacity: 0;
     }
     #switchname{
         font-size: 16px; margin-right: 2%
     }
     .e-switch-wrapper {
         margin-top: 5%;
         width: 15%
     }
     #chart_HorizontalLine, #chart_VerticalLine {
             stroke-dasharray: 2
     }
     @media only screen and (max-width: 300px) {
     #text {
         font-size: 10px
     }
     }
     `;
export function annotationTemplate(props:any): JSX.Element {
    return (<div id="annotation"></div>)
}

function ProjectTimeLine() {

    let chart1: ChartComponent;
    let rangenavigator1: RangeNavigatorComponent;
    let rangenavigator2: RangeNavigatorComponent;
    let chartRendered: boolean;
    let range1Rendered: boolean;
    let range2Rendered: boolean;

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" id="rowStyles">
                    <div className="col-sm-8">
                        <div id="text">
                            Project TimeLine Incidences
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label id="switchname" htmlFor="checked"> View Detail </label>
                        <SwitchComponent id="checked" checked={true}
                            name="Closing Value"
                            value="Closing Value"
                            cssClass="custom-iOS" change={switchChanged}>
                        </SwitchComponent>
                        <label id="switchname" htmlFor="checked">  </label>
                    </div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator'
                        ref={rangenavigator => rangenavigator1 = rangenavigator as RangeNavigatorComponent}
                        style={{ textAlign: "center" }}
                        valueType='DateTime'
                        labelPosition='Outside'
                        width={Browser.isDevice ? '100%' : '80%'}
                        xName='date' yName='Close'
                        disableRangeSelector={true}
                        dataSource={data}
                        periodSelectorSettings={{
                            position: 'Top',
                            periods: [
                                { text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
                                { text: '6M', interval: 6, intervalType: 'Months' }, { text: '1Y', interval: 1, intervalType: 'Years', selected: true },
                                { text: '2Y', interval: 2, intervalType: 'Years' }, { text: 'ALL' }
                            ]
                        }}
                        load={rangeLoad}
                        loaded={rangeLoaded}
                        changed={changed}>
                        <Inject services={[DateTime, PeriodSelector]} />
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <ChartComponent id='chart'
                        ref={chart => chart1 = chart as ChartComponent}
                        style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift',
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            title: 'Incidences',
                            labelFormat: 'n0',
                            opposedPosition: true, lineStyle: { width: 0 },
                        }}
                        height='350'
                        width={Browser.isDevice ? '100%' : '100%'}
                        load={chartLoad}
                        axisLabelRender={labelRender}
                        tooltip={{ enable: true, shared: false }}
                        tooltipRender={renderTooltip}
                        chartMouseMove={mouseMove}
                        axisRangeCalculated={rangeCalculate}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        zoomSettings={{ enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] }}
                        crosshair={{
                            enable: true
                        }}>
                        <Inject services={[CandleSeries, DateTime, Crosshair, LineSeries, ChartAnnotation,
                            StripLine, MomentumIndicator, Tooltip, MacdIndicator]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={data}
                                width={2} type='Candle'
                                xName='date' low='Low'
                                high='High' close='Close' volume='Volume' open='Open'
                                name='Bitcoin' yName='Close'
                                animation={{ enable: false }}
                                bearFillColor='#2ecd71'
                                bullFillColor='#e74c3d'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective
                                content={annotationTemplate}
                                x='15%' y='25%' coordinateUnits='Pixel' region='Chart'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </ChartComponent>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator2'
                        ref={rangenavigator => rangenavigator2 = rangenavigator as RangeNavigatorComponent}
                        style={{ textAlign: "center" }}
                        valueType='DateTime'
                        labelPosition='Outside'
                        width={Browser.isDevice ? '100%' : '100%'}
                        value={[new Date('2017-04-30'), new Date('2018-04-30')]}
                        load={rangeLoad2}
                        changed={changed2}>
                        <Inject services={[DateTime, PeriodSelector, LineSeries]} />
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective
                                dataSource={data}
                                xName='date'
                                yName='Close'
                                type='Line' width={1}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
            </div>
        </div>
    )

    function changed(args: IChangedEventArgs): void {
        if (rangenavigator2 && range2Rendered) {
            rangenavigator2.rangeSlider.setSlider((args.start as Date).getTime(), (args.end as Date).getTime(), false, false);
        }
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = 1;
            chart1.primaryXAxis.zoomPosition = 0;
            let filterData: Object[] = data.filter((data: object) => {
                return (((data as any).date).getTime() >= (args.start as Date).getTime() && ((data as any).date).getTime() <= (args.end as Date).getTime());
            });
            chart1.series[0].dataSource = filterData;
            chart1.refresh();
            chart1.setAnnotationValue(0, '<div id="annotation"></div>');
        } else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    };
    function changed2(args: IChangedEventArgs): void {
        if (rangenavigator1 && range1Rendered) {
            rangenavigator1.periodSelectorModule.datePicker.startDate = args.start as Date;
            rangenavigator1.periodSelectorModule.datePicker.endDate = args.end as Date;
            rangenavigator1.dataBind();
        }
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = 1;
            chart1.primaryXAxis.zoomPosition = 0;
            let filterData: Object[] = data.filter((data: object) => {
                return (((data as any).date).getTime() >= (args.start as Date).getTime() && ((data as any).date).getTime() <= (args.end as Date).getTime());
            });
            chart1.series[0].dataSource = filterData;
            chart1.setAnnotationValue(0, '<div id="annotation"></div>');
            chart1.refresh();
        } else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }

    };
    function switchChanged(args: ChangeEventArgs): void {
        if (chart1 && chartRendered) {
            chart1.series[0].type = !args.checked ? 'Line' : 'Candle';
            chart1.annotations[0].content = '';
            chart1.refresh();
        }
    }
    function rangeLoaded(args: IRangeLoadedEventArgs): void {
        let element: Element = getElement('rangenavigator_Secondary_Element');
        if (!Browser.isDevice) {
            (element as HTMLElement).style.transform = 'translate(13%)';
        }
    }
    function chartLoad(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
        args.chart.tooltip.format = args.chart.series[0].type === 'Candle' ?
            '${point.x}<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
            'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>' :
            '${point.x}<br/>Close : <b>${point.close}</b>';
        chartRendered = true;
    };
    function rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
        range1Rendered = true;
    };
    function rangeLoad2(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
        args.rangeNavigator.dateTimeModule = new DateTime(args.rangeNavigator as any);
        range2Rendered = true;
    };
    function labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.title === 'Price') {
            let value: number = Math.round(Number(args.text)) / 1000;
            args.text = '$' + String(value) + 'k';
        }
    }
    function renderTooltip(args: ITooltipRenderEventArgs): void {
        console.log('tooltip')
        if (args.text!.length > 0) {
            let text: any = args.text!.split('<br/>'); let html: string = '<table><thead>' + text[0] + '</thead>';
            let value: string[];
            for (let i: number = 1; i < text.length; i++) {
                value = text[i].split(':');
                html += '<tr><td style="text-align:left;opacity:0.5">' + value[0] + ':</td><td style="padding-left: 5px;">$' +
                    (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
            }
            html += '</table>';
            chart1.setAnnotationValue(
                0,
                '<div id="annotation" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>');
        }
        args.text = '';
    };
    function mouseMove(args: IMouseEventArgs): void {
        if (!withInBounds(chart1.mouseX, chart1.mouseY, chart1.chartAxisLayoutPanel.seriesClipRect)) {
            removeSecondaryElement();
        }
    };
    function rangeCalculate(args: IAxisRangeCalculatedEventArgs): void {
        if (chart1 && chartRendered) {
            chart1.setAnnotationValue(0, '<div></div>');
        }
    };
}
function removeSecondaryElement() {
    setTimeout(function () {
        if (getElement("annotation")) {
            remove(getElement("annotation"));
        }
    }, 2000);
}
export default ProjectTimeLine;