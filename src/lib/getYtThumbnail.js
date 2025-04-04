const getYtThumbnail = (embedUrl) => {
    const videoId = embedUrl.split("/embed/")[1]?.split("?")[0]; // Extract video ID
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};
export default getYtThumbnail