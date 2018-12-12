import * as fs from "tns-core-modules/file-system";

export interface UploadTusOptions {
  path: string;
  url: string;
  headers: any;
}

export class UploadTus {
  private store: TUSUploadStore;

  constructor() {
    let URL = NSURL.URLWithString(fs.path.join(fs.knownFolders.documents().path, '/upload'));
    this.store = TUSFileUploadStore.alloc().initWithURL(URL);
  }

  public uploadFile(options: UploadTusOptions, callback: (response: any) => void) {
    const fileUrl = NSURL.fileURLWithPath(options.path);
    if (!fileUrl.checkResourceIsReachableAndReturnError()) {
      callback({ error: `file ${options.path} doesn't exists` });
      return;
    }

    const uploadEndpoint = NSURL.URLWithString(options.url);

    const session = TUSSession.alloc().initWithEndpointDataStoreAllowsCellularAccess(uploadEndpoint, this.store, true);
    const upload = session.createUploadFromFileHeadersMetadata(fileUrl, this.toDictionary(options.headers),
        NSMutableDictionary.new<string, string>());

    if (upload) {
      upload.progressBlock = (bytesWritten, bytesTotal) => {
        callback({ progress: Math.floor(100 * bytesWritten / bytesTotal) });
      };
      upload.resultBlock = (url: NSURL) => {
        const replaceUrl = options.url.endsWith('/') ? '/' : '';
        callback({ url: url.absoluteString.replace(options.url, replaceUrl), relativeUrl: url.relativeString });
      };
      upload.failureBlock = (error: NSError) => {
        callback({ error: error.localizedDescription });
      };
      upload.resume();
    } else {
      callback({ error: 'couldn\'t create upload object' });
    }
  }

  private toDictionary(obj): NSDictionary<string, string> {
    let node = NSMutableDictionary.new<string, string>();
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (obj[property] != null) {
          switch (typeof obj[property]) {
            case 'string':
              node.setObjectForKey(String(obj[property]), property);
              break;
          }
        }
      }
    }
    return node;
  }
}
