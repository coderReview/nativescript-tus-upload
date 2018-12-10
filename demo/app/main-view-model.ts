import { Observable } from 'tns-core-modules/data/observable';
import { UploadTus } from 'nativescript-tus-upload';
import * as fs from 'tns-core-modules/file-system';

export class HelloWorldModel extends Observable {
  public message: string;
  private uploadTus: UploadTus;

  constructor() {
    super();

    const folder = fs.knownFolders.documents().getFolder('temp');
    const file = folder.getFile('temp.txt');
    file.writeTextSync('A TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\n');

    const url = 'https://tus-tmp-pvms.herokuapp.com/';

    console.log('WILL UPLOAD');
    this.uploadTus = new UploadTus();
    this.uploadTus.uploadFile({
      path: file.path,
      url: url,
      headers: { 'Authorization': 'Bearer TEST' }
    }, (response: any) => {
      if (response.error) {
        console.error(response.error);
        return;
      }
      console.log(`DID UPLOAD ${JSON.stringify(response, null, 2)}`);
    });
  }
}
