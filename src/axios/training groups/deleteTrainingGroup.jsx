const deleteTrainingGroup = async (axiosInstanceToken, trainingGroup, onSuccess, onError) => {

    try {
        await axiosInstanceToken.delete(`/admin/trainingGroups/${trainingGroup.id}`);
        onSuccess("Grupa treningowa usunięta");
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Usuwanie grupy treningowej zakończone niepowodzeniem");
        }
    }
};

export default deleteTrainingGroup;
