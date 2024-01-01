const getTrainersTrainingGroups = async (axiosInstanceToken, setTrainersTrainingGroups, setError) => {

    try {
        const response =
            await axiosInstanceToken.get("/trainer/trainingGroups");
        setTrainersTrainingGroups(response.data);
    } catch (error) {
        console.log(error);
        setError(error.response ? error.response.data.message : 'Wystąpił nieznany błąd');
    }
};

export default getTrainersTrainingGroups;
