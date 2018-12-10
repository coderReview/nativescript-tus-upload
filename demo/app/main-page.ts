import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as fs from 'tns-core-modules/file-system';
import { UploadTus } from 'nativescript-tus-upload';
import {HelloWorldModel} from './main-view-model';

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function onTap(args: observable.EventData): void {
  const folder = fs.knownFolders.documents().getFolder('temp');
  const file = folder.getFile('temp.txt');
  file.writeTextSync('A TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\nA TEXT TO WRITE A FILE\n');

  const url = 'https://tus-tmp-pvms.herokuapp.com/';

  const uploadTus = new UploadTus();
  console.log('WILL UPLOAD');
  uploadTus.uploadFile({
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
