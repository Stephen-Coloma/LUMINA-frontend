import dicomParser from 'dicom-parser';

const dicomToImage = async (file: File): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);

        // Assuming the PixelData element tag is 'x7FE00010' - this is the standard tag
        const pixelDataElement = dataSet.elements['x7fe00010'];

        const pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2);

        if (!pixelDataElement || !pixelData) {
        throw new Error('Could not retrieve PixelData from DICOM.');
        }

        const width = dataSet.uint16('x00280010'); // Rows
        const height = dataSet.uint16('x00280011'); // Columns

        if (!pixelData || typeof width !== 'number' || typeof height !== 'number') {
        throw new Error('Could not retrieve pixel data, width, or height from DICOM.');
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
        throw new Error('Could not get 2D rendering context for canvas.');
        }
        canvas.width = width;
        canvas.height = height;

        const imageData = context.createImageData(width, height);
        const data = imageData.data;

        for (let i = 0; i < pixelData.length; i++) {
        const value = pixelData[i];
        data[i * 4] = value;     // R
        data[i * 4 + 1] = value; // G
        data[i * 4 + 2] = value; // B
        data[i * 4 + 3] = 255;   // A
        }

        context.putImageData(imageData, 0, 0);

        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('Error converting DICOM to image:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
};

export default dicomToImage;