
declare const io: any;

export interface UploadTusOptions {
  path: string;
  url: string;
  headers: any;
}

export class UploadTus extends io.tus.java.client.TusExecutor {
  private callback: (error?: any) => void;

  private options: UploadTusOptions;

  constructor() {
    super();
  }

  public uploadFile(options: UploadTusOptions, callback: (response: any) => void) {
    this.options = options;
    this.callback = callback;
    this.makeAttempts();
  }

  protected makeAttempt() {
    let worker;
    if (global["TNS_WEBPACK"]) {
      let WorkerScript = require("nativescript-worker-loader!./android-worker.js");
      worker = new WorkerScript();
    } else {
      worker = new Worker("./android-worker.js");
    }
    worker.postMessage(this.options);

    worker.onmessage = (msg: any) => {
      if (msg.data.progress !== undefined) {
        console.log(`Progress: ${msg.data.progress}%`);
      } else if (msg.data.error !== undefined) {
        console.error(msg.data.error);
        this.callback({ error: msg.data.error });
      } else if (msg.data.url !== undefined) {
        this.callback({ url: msg.data.url });
      }
    };
    worker.onerror = (error) => {
      // console.error(error);
      this.callback({ error: error });
    };
  }
}
