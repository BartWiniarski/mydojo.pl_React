import AdminTestFetch from "../../../components/Admin/AdminTestFetch.jsx"
import { Accordion, AccordionTab } from 'primereact/accordion';

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
                                        <span className="vertical-align-middle">Header I</span>
                                    </div>
                                }
                            >
                                <p className="m-0">
                                    <AdminTestFetch/>
                                </p>
                            </AccordionTab>
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center">
                                        <i className="pi pi-user mr-2"></i>
                                        <span className="vertical-align-middle">Header II</span>
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
                            <AccordionTab
                                header={
                                    <div className="flex align-items-center">
                                        <i className="pi pi-search mr-2"></i>
                                        <span className="vertical-align-middle">Header III</span>
                                        <i className="pi pi-cog ml-2 ml-2"></i>
                                    </div>
                                }
                            >
                                <p className="m-0">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                                    praesentium voluptatum deleniti atque corrupti
                                    quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                                    similique sunt in culpa qui officia deserunt
                                    mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                                    expedita distinctio.
                                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                    minus.
                                </p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
            </>
        );
}

export default AdminDashboard;