export interface UploadTusOptions {
  path: string;
  url: string;
  headers: any;
}

export declare class UploadTus {
  constructor();
  public uploadFile(options: UploadTusOptions, callback: (response: any) => void);
}
