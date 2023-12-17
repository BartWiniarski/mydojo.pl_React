import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../../hooks/useAxiosInstanceToken.jsx";

const MyTrainingGroupsStudent = () => {
    const [response, setResponses] = useState([]);
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {

        const getFetch = async () => {
            try {
                const response = await axiosInstanceToken.get("/student/trainingGroups");
                    setResponses(response.data);
            } catch (error) {
                    console.log(error);
            }
        }
        getFetch();

    }, [axiosInstanceToken]);

    return (
        <article>
            <ul>
                {response.map((group) => (
                    <>
                        <li key={group.id}>
                            <h3>{group.name}</h3>
                            <p>{group.description}</p>
                            <p>Harmonogram zajęć:</p>
                            <ul>
                                {Object.entries(group.schedule).map(([day, time]) => (
                                    <li key={day}>
                                        {day}: {time}
                                    </li>
                                ))}
                            </ul>
                            <br/>
                            <p>Uczniowie:</p>
                            <ul>
                                {group.students.map((studentId) => (
                                    <li key={studentId}>ID: {studentId}</li>
                                ))}
                            </ul>
                            <br/>
                            <p>Trenerzy:</p>
                            <ul>
                                {group.trainers.map((trainerId) => (
                                    <li key={trainerId}>ID: {trainerId}</li>
                                ))}
                            </ul>
                        </li>
                        <hr/>
                    </>
                ))}

            </ul>
        </article>
    );
};
export default MyTrainingGroupsStudent;