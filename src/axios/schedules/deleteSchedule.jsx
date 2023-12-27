const deleteSchedule = async (axiosInstanceToken, schedule, onSuccess, onError) => {

    try {
        await axiosInstanceToken.delete(`/admin/schedules/${schedule.id}`);
        onSuccess("Jednostka treningowa usunięta");
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Usuwanie jednostki treningowej zakończone niepowodzeniem");
        }
    }
};

export default deleteSchedule;
