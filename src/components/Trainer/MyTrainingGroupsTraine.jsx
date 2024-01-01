import React, {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../hooks/useAxiosInstanceToken.jsx";
import getTrainersTrainingGroups from "../../axios/training groups/getTrainerTrainingGroups.jsx";


const MyTrainingGroupsTraine = () => {
    const [response, setResponses] = useState([]);
    const [error, setError] = useState(null);
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        getTrainersTrainingGroups(axiosInstanceToken, setResponses, setError);
    }, []);

    const daysOfWeekMap = {
        MONDAY: 'Poniedziałek',
        TUESDAY: 'Wtorek',
        WEDNESDAY: 'Środa',
        THURSDAY: 'Czwartek',
        FRIDAY: 'Piątek',
        SATURDAY: 'Sobota',
        SUNDAY: 'Niedziela'
    };

    const formatSchedule = (schedule) => {
        return schedule.split(" ").map(word => {
            return daysOfWeekMap[word] || word;
        }).join(" ");
    };

    if (error === "User is not assigned to any Training Group") {
        return <div>Brak przypisanej grupy treningowej</div>;
    } else if (error === "Wystąpił nieznany błąd") {
        return <div>Nieznany błąd pobierania grupy treningowej</div>;
    }

    return (
        <article>
            <ul>
                <hr/>
                {response.map((group) => (
                    <li key={group.id}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <p>Harmonogram zajęć:</p>
                        <ul>
                            {group.schedules.length !== 0 ? (
                                group.schedules.map((schedule, index) => (
                                    <li key={index}>{formatSchedule(schedule)}</li>
                                ))
                            ) : (
                                <li>"Brak harmonogramów"</li>
                            )}
                        </ul>
                        <br/>
                        <p>Trenerzy:</p>
                        <ul>
                            {group.trainers.length !== 0 ? (
                                group.trainers.map((trainer, index) => (
                                    <li key={index}> {trainer} </li>
                                ))
                            ) : (
                                <li>"Brak trenerów"</li>
                            )}
                        </ul>
                        <hr/>
                    </li>
                ))}
            </ul>
        </article>
    );
};
export default MyTrainingGroupsTraine;
