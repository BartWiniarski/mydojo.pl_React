import TestFetchAdmin from "../../../components/Admin/TestFetchAdmin.jsx"
import myDojoStatusAdmin from "../../../components/Admin/myDojoStatusAdmin.jsx";
import {Accordion, AccordionTab} from 'primereact/accordion';
import MyDojoStatusAdmin from "../../../components/Admin/myDojoStatusAdmin.jsx";

function AdminDashboard() {

    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/tree_with_spring_2.png" className="img-fluid shadow-img d-block mx-auto mt-5"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="text-center">Panel administratora</h1>

                <div className="card">
                    <Accordion activeIndex={0}>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-calendar mr-2"></i>
                                    <span className="vertical-align-middle">Moje dojo</span>
                                </div>
                            }
                        >
                            <MyDojoStatusAdmin/>
                        </AccordionTab>
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-user mr-2"></i>
                                    <span className="vertical-align-middle">Test Fetch</span>
                                </div>
                            }
                        >
                            <p className="m-0">
                                <TestFetchAdmin/>
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
                                TBD
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;