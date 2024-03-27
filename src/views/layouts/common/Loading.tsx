import { useRef } from 'react';
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ILoadedEventArgs, ProgressTheme, IProgressValueEventArgs, AnimationModel
} from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';


const SAMPLE_CSS = `
         .control-fluid {
         padding: 0px !important;
         }
    #control-container {
         padding: 0px !important;
     }
    .progress-bar-parent {
        margin-top: 8%;
        text-align: center;
    }
    .progress-container-align {
        text-align: center;
    }
 
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
         margin-top: 3%;
     }
 
     .reload-btn {
         text-align: center;
     }
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
         margin-top: 3%;
     }
     `;

const Loading = () => {
    const fullBackground = useRef<ProgressBarComponent>(null);
    //const outerRadius = useRef<ProgressBarComponent>(null);
    //const onRadius = useRef<ProgressBarComponent>(null);
    //const pie = useRef<ProgressBarComponent>(null);
    const animation: AnimationModel = {
        enable: true,
        duration: 6000,
        delay: 0,
    };
    /*const replayClick = (): void => {
        fullBackground.current!.refresh();
        outerRadius.current!.refresh();
        onRadius.current!.refresh();
        pie.current!.refresh();
    }*/
    const content: string = '<div id="point1" style="left:220px;font-size:20px;font-weight:bold;color:#ffffff;fill:#ffffff"><span>60%</span></div>';
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = document.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.element.id === 'full-background') {
            switch (selectedTheme) {
                case 'material':
                    args.progressBar.trackColor = '#f8c2d4';
                    args.progressBar.progressColor = '#e91e63';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.progressColor = '#0078D6';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.progressColor = '#317ab9';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'tailwind':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;
                case 'highcontrast':
                    args.progressBar.progressColor = '#FFD939';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.progressColor = '#9A9A9A';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'tailwind-dark':
                    args.progressBar.progressColor = '#22D3EE';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.progressColor = '#007bff';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                case 'fluent':
                case 'fluent-dark':
                    args.progressBar.progressColor = '#0D6EFD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'material3':
                    args.progressBar.progressColor = '#6750A4';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'material3-dark':
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
                default:
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
            }
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>

            <ProgressBarComponent id="full-background" ref={fullBackground} type='Circular' width='160px'
                height='160px' cornerRadius='Round' enableRtl={false} radius='100%' innerRadius='190%'
                progressThickness={10} trackThickness={80} value={100}
                animation={animation} load={progressLoad.bind(this)}>
                <Inject services={[ProgressAnnotation]} />
                <ProgressBarAnnotationsDirective>
                    <ProgressBarAnnotationDirective content={content} />
                </ProgressBarAnnotationsDirective>
            </ProgressBarComponent>
        </div>
    )
}
export default Loading;