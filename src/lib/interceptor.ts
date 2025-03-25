import axios from "axios"

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
    
})


axiosInstance.interceptors.request.use(
    (config) => {
        // Check if the request requires an access token
        if (config.headers?.requiresAuth) {
            const accessToken = localStorage.getItem('access_token');
            // check if  accessToken is present and if it is not expired
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            // Remove the custom flag to avoid sending it to the server
            delete config.headers.requiresAuth;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;