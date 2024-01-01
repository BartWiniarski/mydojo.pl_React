const getStudentsTrainingGroups = async (axiosInstanceToken, setStudentsTrainingGroups, setError) => {

    try {
        const response =
            await axiosInstanceToken.get("/student/trainingGroups");
        setStudentsTrainingGroups(response.data);
    } catch (error) {
        console.log(error);
        setError(error.response ? error.response.data.message : 'Wystąpił nieznany błąd');
    }
};

export default getStudentsTrainingGroups;
