import useAxiosInstanceToken from "../../hooks/useAxiosInstanceToken.jsx";
import {useEffect, useState} from "react";

function MyDojoStatusAdmin(){
    const [response, setResponses] = useState([]);
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {

        const getFetch = async () => {
            try {
                const response = await axiosInstanceToken.get("/admin/dojo/status");
                setResponses(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFetch();

    }, [axiosInstanceToken]);

    return (
        <article>
            <h4>Status dojo:</h4>
            <ul>
                <li id="noStudents">Ilość uczniów: {response.numberOfStudents}</li>
                <li id="noTrainers">Ilość trenerów: {response.numberOfTrainers}</li>
                <li id="noTrainingGroups">Ilość grup treningowych: {response.numberOfTrainingGroups}</li>
            </ul>
        </article>
    );
}

export default MyDojoStatusAdmin;