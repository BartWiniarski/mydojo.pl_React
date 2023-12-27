const putSchedule = async (axiosInstanceToken, schedule, onSuccess, onError) => {

    try {
        await axiosInstanceToken.put(`/admin/schedules/${schedule.id}`, schedule);
        onSuccess('Jednostka treningowa zaktualizowana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Aktualizacja jednostki treningowej zakończona niepowodzeniem");
        }
    }
};

export default putSchedule;
