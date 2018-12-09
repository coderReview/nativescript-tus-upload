import * as fs from "tns-core-modules/file-system";

export class UploadTus {
  private store: TUSUploadStore;

  constructor() {
    let URL = NSURL.URLWithString(fs.path.join(fs.knownFolders.documents().path, '/upload'));
    this.store = TUSFileUploadStore.alloc().initWithURL(URL);
  }

  public uploadFile(url: string, path: string, callback: (error?: any) => void) {
    const fileUrl = NSURL.fileURLWithPath(path);
    if (!fileUrl.checkResourceIsReachableAndReturnError()) {
      callback({ error: `file ${path} doesn't exists` });
      return;
    }

    const uploadEndpoint = NSURL.URLWithString(url);

    const session = TUSSession.alloc().initWithEndpointDataStoreAllowsCellularAccess(uploadEndpoint, this.store, true);
    const upload = session.createUploadFromFileHeadersMetadata(fileUrl, NSDictionary.new(), NSDictionary.new());

    if (upload) {
      upload.progressBlock = (bytesWritten, bytesTotal) => {
        console.log(`Progress: ${Math.floor(100 * bytesWritten / bytesTotal)}`);
      };
      upload.resultBlock = (url: NSURL) => {
        callback();
      };
      upload.failureBlock = (error: NSError) => {
        callback({ error: error.localizedDescription });
      };
      upload.resume();
    } else {
      callback({ error: 'couldn\'t create upload object' });
    }
  }
}
