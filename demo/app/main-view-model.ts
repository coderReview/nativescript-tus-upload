import { Observable } from 'tns-core-modules/data/observable';
import { UploadTus } from 'nativescript-upload-tus';
import * as fs from 'tns-core-modules/file-system';

export class HelloWorldModel extends Observable {
  public message: string;
  private uploadTus: UploadTus;

  constructor() {
    super();

    const folder = fs.knownFolders.documents().getFolder('temp');
    const file = folder.getFile('temp.txt');
    file.writeTextSync('A TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\n');

    const url = 'https://tus-tmp-pvms.herokuapp.com:443/';

    this.uploadTus = new UploadTus();
    this.uploadTus.uploadFile(url, file.path, (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`DID UPLOAD ${url}`);
    });
  }
}
