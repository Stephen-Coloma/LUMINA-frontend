import JSZip from 'jszip';

export const generateZip = (ctFiles: File[], petFiles: File[]): Promise<Blob>  => {
    const zip = new JSZip();
    const ctFolder = zip.folder("CT");
    const petFolder = zip.folder("PET");

    // add eacc dicomm to zip
    ctFiles.forEach((file)=>{
        ctFolder?.file(file.name, file)
    });

    petFiles.forEach((file)=>{
        petFolder?.file(file.name, file)
    });

    const zipBlob = zip.generateAsync({type:"blob"});

    return zipBlob;
}