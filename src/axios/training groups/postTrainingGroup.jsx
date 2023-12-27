const postTrainingGroup = async (axiosInstanceToken, trainingGroup, onSuccess, onError) => {

    try {
        await axiosInstanceToken.post("/admin/trainingGroups", trainingGroup);
        onSuccess('Nowa grupa treningowa dodana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Dodwanie nowej grupy treningowej zakończone niepowodzeniem");
        }
    }
};

export default postTrainingGroup;
