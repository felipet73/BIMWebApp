import { useEffect, useRef } from 'react';
import { StepperComponent, StepsDirective, StepDirective, StepperOrientation, StepperChangedEventArgs } from '@syncfusion/ej2-react-navigations';
import './issues.css';

const IssueDetail = () => {


    const stepperObj = useRef<StepperComponent>(null);

    let stepperContentEle: Element;
    let stepperOptionsEle: Element;

    let stepperContentRef = (element: any) => { stepperContentEle = element; };
    let stepperOptionsRef = (element: any) => { stepperOptionsEle = element; };

    const updateBack = () => {
        stepperObj.current!.previousStep();
        updateContent(stepperObj.current!.activeStep);
    };

    const updateNext = () => {
        stepperObj.current!.nextStep();
        updateContent(stepperObj.current!.activeStep);
    };

    const toggleNavigationButtons = (activeStep: number) => {
        (stepperOptionsEle.querySelector('#previousStep') as HTMLElement).style.display = (activeStep !== 0) ? 'block' : 'none';
        (stepperOptionsEle.querySelector('#nextStep') as HTMLElement).style.display = (activeStep !== 3) ? 'block' : 'none';
    }

    const updateContent = (args: number): void => {
        switch (args) {
            case 0:
                stepperContentEle.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>`;
                break;
            case 1:
                stepperContentEle.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>
                <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>
                </ul>`;
                break;
            case 2:
                stepperContentEle.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>`;
                break;
            case 3:
                stepperContentEle.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>
                The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>`;
                break;
            default:
                break;
        }
        toggleNavigationButtons(args);
    }

    const updateLinear = (args: any) => {
        stepperObj.current!.linear = (/true/).test(args.currentTarget.value) ? true : false;
        stepperObj.current!.reset();
        updateContent(stepperObj.current!.activeStep);
    };

    useEffect(() => {
        const elem = document.querySelector(".ajusta");
        elem?.classList.remove("ajusta");
        console.log('elem', elem);
        if (elem){
            const hijo = elem?.firstChild as HTMLDivElement;
            hijo!.setAttribute('style', 'height: 100%');    
        }
            
        }, []);



    return (
        <div className='control-pane' style={{ width:'100%', height:'100%'}}>
            <div className='control-section' style={{ width:'100%', height:'90%'}}>
                <div className="linear-stepper-control" style={{ width:'100%'}}>
                    <StepperComponent ref={stepperObj} linear={false} stepChanged={(args: StepperChangedEventArgs) => updateContent(args.activeStep)} style={{ width:'100%', height:'88px', overflow:'hidden', padding:'2px' }}>
                        <StepsDirective>
                            <StepDirective iconCss={'sf-icon-form'} label={'Project Setup'} />
                            <StepDirective iconCss={'sf-icon-tasksheet'} label={'Task Planning'} />
                            <StepDirective iconCss={'sf-icon-progress'} label={'Progress Tracking'} />
                            <StepDirective iconCss={'sf-icon-submit'} label={'Project Completion'} />
                        </StepsDirective>
                    </StepperComponent>
                </div>
                <div id="linear-stepper-content" ref={stepperContentRef} >
                    <b>Description:</b> <br /><br /> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>
                </div>
                <div className="linear-stepper-options" style={{ display: "inline-flex" }} ref={stepperOptionsRef}>
                    <button id="previousStep" style={{ marginRight: "15px", display: "none" }} onClick={updateBack} className="e-btn">Back</button>
                    <button id="nextStep" style={{display: "block"}} onClick={updateNext} className="e-btn">Next</button>
                </div>
            </div>
        </div>
    );
}
export default IssueDetail;