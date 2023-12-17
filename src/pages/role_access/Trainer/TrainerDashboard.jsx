import {Accordion, AccordionTab} from "primereact/accordion";
import MyTrainingGroupsTrainer from "../../../components/Trainer/MyTrainingGroupsTraine.jsx";

function TrainerDashboard() {
    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/bonsai_3.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="text-center">Panel trenera</h1>

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
                            <p className="m-0">
                                <MyTrainingGroupsTrainer/>
                            </p>
                        </AccordionTab>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-user mr-2"></i>
                                    <span className="vertical-align-middle">Moje plany treningowe</span>
                                </div>
                            }
                        >
                            <p className="m-0">
                                TBD
                            </p>
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
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                                ratione voluptatem sequi nesciunt.
                                Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export default TrainerDashboard;