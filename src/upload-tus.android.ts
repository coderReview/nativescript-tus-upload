
declare const io: any;

export class UploadTus extends io.tus.java.client.TusExecutor {
  private callback: (error?: any) => void;

  private url: string;

  private path: string;

  constructor() {
    super();
  }

  public uploadFile(url: string, path: string, callback: (error?: any) => void) {
    this.url = url;
    this.path = path;
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
    worker.postMessage({ path: this.path, baseUrl: this.url });

    worker.onmessage = (msg: any) => {
      if (msg.data.progress) {
        console.log(`Progress: ${msg.data.progress}%`);
      } else if (msg.data.error) {
        console.error(msg.data.error);
        this.callback({ error: msg.data.error });
      } else {
        this.callback();
      }
    };
    worker.onerror = (error) => {
      console.error(error);
      this.callback({ error: error });
    };
  }
}
