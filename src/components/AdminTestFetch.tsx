import {useState, useEffect} from "react";
import axiosInstance from "../axios/axios.tsx";
import useRefreshToken from "../hooks/useRefreshToken.tsx";

const AdminTestFetch = () => {
    const [responses, setResponses] = useState();
    const refresh = useRefreshToken();

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();
    //
    //     const getFetch = async () => {
    //         try {
    //             const response = await axiosInstance.get("/admin/test",
    //                 {signal: controller.signal});
    //             console.log(response.data)
    //             isMounted && setResponses(response.data);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getFetch();
    //
    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    //
    // }, []);

    return (
        <article>
            <h2>Test Żesłą - ADMIN FETCH</h2>
            {responses?.length
                ? (
                    <ul>
                        {responses.map((response, i) =>
                            <li key={i}>
                                {response?.role}
                                {response?.time}
                                {response?.loremIpsum}
                            </li>)}
                    </ul>
                ) : <p>no data fetched</p>
            }
            <button onClick={()=>refresh()}>REFRESH</button>
            <br/>
        </article>
    );
}
export default AdminTestFetch;