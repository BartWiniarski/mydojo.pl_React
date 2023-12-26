const getSchedules = async (axiosInstanceToken, setAvailableSchedules) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/schedules");
        setAvailableSchedules(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getSchedules;
