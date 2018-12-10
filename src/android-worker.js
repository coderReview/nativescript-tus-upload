
if (global['TNS_WEBPACK']) {
  if (global.android) {
    // without this JavaProxy is missing and we can't import vendor below
    global.require('~/../internal/ts_helpers.js');
  }
  global.require('~/vendor');
} else {
  require('globals');
}
const utils = require('tns-core-modules/utils/utils');
const application = require('tns-core-modules/application');

global.onmessage = function (msg) {
  application.on(application.uncaughtErrorEvent, function (args) {
    if (args.android) {
      // For Android applications, args.android is an NativeScriptError.
      console.log("NativeScriptError: " + args.android);
    } else if (args.ios) {
      // For iOS applications, args.ios is NativeScriptError.
      console.log("NativeScriptError: " + args.ios);
    }
  });

  try {
    const file = new java.io.File(msg.data.path);
    if (!file.exists) {
      global.postMessage({ error: `file ${msg.data.path} doesn't exist` });
      return;
    }

    const upload = new io.tus.java.client.TusUpload(file);
    const pref = utils.ad.getApplicationContext().getSharedPreferences('tus', 0);
    const client = new io.tus.java.client.TusClient();

    client.setUploadCreationURL(new java.net.URL(msg.data.url));
    client.setHeaders(toHashMap(msg.data.headers));
    client.enableResuming(new io.tus.android.client.TusPreferencesURLStore(pref));

    const uploader = client.resumeOrCreateUpload(upload);

    uploader.setChunkSize(32 * 1024);
    do {
      // Calculate the progress using the total size of the uploading file and
      // the current offset.
      let totalBytes = upload.getSize();
      let bytesUploaded = uploader.getOffset();
      let progress = bytesUploaded / totalBytes * 100;

      global.postMessage({ progress: progress });
    } while (uploader.uploadChunk() > -1);

    // Allow the HTTP connection to be closed and cleaned up
    uploader.finish();

    const replaceUrl = msg.data.url.endsWith('/') ? '/' : '';
    global.postMessage({ url: uploader.getUploadURL().toString().replace(msg.data.url, replaceUrl) });
  } catch (ex) {
    global.postMessage({ error: ex.message || ex });
  }
};

function toHashMap(obj) {
  var node = new java.util.HashMap();
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (obj[property] != null) {
        switch (typeof obj[property]) {
          case 'string':
            node.put(property, String(obj[property]));
            break;
        }
      }
    }
  }
  return node;
}
