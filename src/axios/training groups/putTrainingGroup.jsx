const putTrainingGroup= async (axiosInstanceToken, trainingGroup, onSuccess, onError) => {

    try {
        await axiosInstanceToken.put(`/admin/trainingGroups/${trainingGroup.id}`, trainingGroup);
        onSuccess('Grupa treningowa zaktualizowana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Aktualizacja grupy treningowej zakończona niepowodzeniem");
        }
    }
};

export default putTrainingGroup;
