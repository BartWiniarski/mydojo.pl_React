const postSchedule = async (axiosInstanceToken, schedule, onSuccess, onError) => {

    try {
        await axiosInstanceToken.post("/admin/schedules", schedule);
        onSuccess('Nowa jednostka treningowa dodana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Dodwanie nowej jednostki treningowej zakończone niepowodzeniem");
        }
    }
};

export default postSchedule;
