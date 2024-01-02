import {Accordion, AccordionTab} from "primereact/accordion";
import MyTrainingGroupsStudent from "../../../components/Student/MyTrainingGroupsStudent.jsx";

function StudentDashboard() {
    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/tree_with_spring_1.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="text-center">Panel ucznia</h1>

                <div className="card">
                    <Accordion activeIndex={0}>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-calendar mr-2"></i>
                                    <span className="vertical-align-middle">Moje grupy treningowe</span>
                                </div>
                            }
                        >
                            <div className="m-0">
                                <MyTrainingGroupsStudent/>
                            </div>
                        </AccordionTab>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-search mr-2"></i>
                                    <span className="vertical-align-middle">TBD</span>
                                    <i className="pi pi-cog ml-2 ml-2"></i>
                                </div>
                            }
                        >
                            <div className="m-0">
                                TBD
                            </div>
                        </AccordionTab>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-search mr-2"></i>
                                    <span className="vertical-align-middle">TBD</span>
                                    <i className="pi pi-cog ml-2 ml-2"></i>
                                </div>
                            }
                        >
                            <div className="m-0">
                                TBD
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;