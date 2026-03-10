/**
 * This function takes the original image and the crop coordinates
 * and returns a new Blob (the cropped image).
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob | null> {
    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("Canvas context not available");
            return null;
        }

        // Set canvas size to the desired crop size
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // Draw the cropped portion of the image onto the canvas
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        // Return as a Blob
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Canvas is empty"));
                        return;
                    }
                    resolve(blob);
                },
                "image/jpeg",
                0.95 // high quality
            );
        });
    } catch (error) {
        console.error("Error in getCroppedImg:", error);
        return null;
    }
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => {
            console.error("Image load error:", error);
            reject(error);
        });
        // Only set crossOrigin if it's not a data URL
        if (!url.startsWith("data:")) {
            image.setAttribute("crossOrigin", "anonymous");
        }
        image.src = url;
    });
}
