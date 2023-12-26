const getTrainers = async (axiosInstanceToken, setAvailableTrainers) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/trainers");
        setAvailableTrainers(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getTrainers;
