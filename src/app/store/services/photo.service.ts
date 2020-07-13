import {
    Plugins, CameraResultType, Capacitor, FilesystemDirectory,
    CameraPhoto, CameraSource
} from '@capacitor/core';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    public photos: Photo[] = [];
    private PHOTO_STORAGE: string = "photos";

    public async addNewToGallery(number) {
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        // Save the picture and add it to photo collection
        const savedImageFile = await this.savePicture(capturedPhoto);
        console.log('saved ', savedImageFile);
        const { base64, ...savedImageFileWithoutBase64 } = savedImageFile;
        Storage.set({
            key: number,
            value: JSON.stringify(savedImageFileWithoutBase64)
        });
    }

    public loadSaved(number) {
        // Retrieve cached photo array data
        return Storage.get({ key: number }).then((res: any) => {
            console.log('value ', res.value);
            const extractPhoto = JSON.parse(res.value);
            console.log('extracted ', extractPhoto);
            // Read each saved photo's data from the Filesystem
            Filesystem.readFile({
                path: extractPhoto.filepath,
                directory: FilesystemDirectory.Data
            }).then((readFile) => {
                // Web platform only: Save the photo into the base64 field
                extractPhoto.base64 = `data:image/jpeg;base64,${readFile.data}`;
            });
            return extractPhoto;
        });
    }

    private async savePicture(cameraPhoto: CameraPhoto) {
        // Convert photo to base64 format, required by Filesystem API to save
        const base64Data = await this.readAsBase64(cameraPhoto);

        // Write the file to the data directory
        const fileName = new Date().getTime() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath,
            base64: null
        };
    }

    private async readAsBase64(cameraPhoto: CameraPhoto) {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(cameraPhoto.webPath!);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }

    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

}

interface Photo {
    filepath: string;
    webviewPath: string;
    base64?: string;
}