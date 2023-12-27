const getTrainingGroups = async (axiosInstanceToken, setAvailableTrainingGroups) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/trainingGroups");
        setAvailableTrainingGroups(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getTrainingGroups;
