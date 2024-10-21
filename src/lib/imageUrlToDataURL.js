export default async function imageUrlToDataURL(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching or converting image:', error);
        throw error;
    }
}