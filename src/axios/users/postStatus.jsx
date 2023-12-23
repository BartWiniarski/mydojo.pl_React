const postStatus = async (axiosInstanceToken, user, onSuccess) => {
    try {
        const response =
            await axiosInstanceToken.post(`/admin/users/status/${user.id}`);
            onSuccess()
    } catch (error) {
        console.log(error);
    }
};

export default postStatus;
