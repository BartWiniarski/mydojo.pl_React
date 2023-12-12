import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../hooks/useAxiosInstanceToken.tsx";

const AdminTestFetch = () => {
    const [response, setResponses] = useState([]);
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        let isMounted = true;

        const getFetch = async () => {
            try {
                const response = await axiosInstanceToken.get("/admin/test");

                 if (isMounted) {
                    setResponses(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.log(error);
                }
            }
        }
        getFetch();

        return () => {
            isMounted = false;
        }

    }, [axiosInstanceToken]);

    return (
        <article>
            <h2>ADMIN TEST FETCH</h2>
            {response ? (
                <div>
                    <p>Role: {response.role}</p>
                    <p>Time: {response.time}</p>
                    <p>Lorem Ipsum: {response.loremIpsum}</p>
                </div>
            ) : (
                <p>no data fetched</p>
            )}
        </article>
    );
};
export default AdminTestFetch;