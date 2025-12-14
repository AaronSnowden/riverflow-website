// AXIOS Config file
import axios from "axios";

const uploadClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

// file upload util function
export const uploadApi = {
    uploadFile(file, onProgress) {
        const formData = new FormData();
        formData.append("file", file);

        return uploadClient
            .post("/api/upload", formData, {
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        onProgress(percentCompleted);
                    }
                },
            })
            .then((response) => response.data);
    },
};
