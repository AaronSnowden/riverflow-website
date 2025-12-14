// utils file for mostly used functions.
export const getImageUrl = (item) => {
    if (!item || !item.image) return null;
    let imageUrl;
    if (item.image_url) {
        imageUrl = item.image_url;
    } else {
        const baseUrl =
            `${import.meta.env.VITE_API_URL}/storage` ||
            "http://localhost:8000/storage";
        imageUrl = `${baseUrl}/${item.image.replace(/^\//, "")}`;
    }

    return imageUrl;
};
