/// <reference path="./android-declarations.d.ts"/>

import javalangClass = java.lang.Class;
/// <reference path="./java.lang.Class.d.ts" />
declare module io {
	export module tus {
		export module android {
			export module client {
				export class BuildConfig {
					public static class: javalangClass<io.tus.android.client.BuildConfig>;
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

import javaioFile = java.io.File;
/// <reference path="./java.io.File.d.ts" />
declare module io {
	export module tus {
		export module android {
			export module client {
				export class TusAndroidUpload extends io.tus.java.client.TusUpload {
					public static class: javalangClass<io.tus.android.client.TusAndroidUpload>;
					public constructor();
					public constructor(param0: globalAndroid.net.Uri, param1: globalAndroid.app.Activity);
					public constructor(param0: javaioFile);
				}
			}
		}
	}
}

import javanetURL = java.net.URL;
/// <reference path="./java.net.URL.d.ts" />
declare module io {
	export module tus {
		export module android {
			export module client {
				export class TusPreferencesURLStore extends io.tus.java.client.TusURLStore {
					public static class: javalangClass<io.tus.android.client.TusPreferencesURLStore>;
					public set(param0: string, param1: javanetURL): void;
					public remove(param0: string): void;
					public get(param0: string): javanetURL;
					public constructor(param0: globalAndroid.content.SharedPreferences);
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class FingerprintNotFoundException {
					public static class: javalangClass<io.tus.java.client.FingerprintNotFoundException>;
					public constructor(param0: string);
				}
			}
		}
	}
}

import javanetHttpURLConnection = java.net.HttpURLConnection;
/// <reference path="./java.net.HttpURLConnection.d.ts" />
declare module io {
	export module tus {
		export module java {
			export module client {
				export class ProtocolException {
					public static class: javalangClass<io.tus.java.client.ProtocolException>;
					public getCausingConnection(): javanetHttpURLConnection;
					public constructor(param0: string);
					public constructor(param0: string, param1: javanetHttpURLConnection);
					public shouldRetry(): boolean;
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class ResumingNotEnabledException {
					public static class: javalangClass<io.tus.java.client.ResumingNotEnabledException>;
					public constructor();
				}
			}
		}
	}
}

import javautilMap = java.util.Map;
/// <reference path="./java.util.Map.d.ts" />
declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusClient {
					public static class: javalangClass<io.tus.java.client.TusClient>;
					public static TUS_VERSION: string;
					public getHeaders(): javautilMap<string,string>;
					public resumeUpload(param0: io.tus.java.client.TusUpload): io.tus.java.client.TusUploader;
					public prepareConnection(param0: javanetHttpURLConnection): void;
					public createUpload(param0: io.tus.java.client.TusUpload): io.tus.java.client.TusUploader;
					public disableResuming(): void;
					public getUploadCreationURL(): javanetURL;
					public enableResuming(param0: io.tus.java.client.TusURLStore): void;
					public constructor();
					public resumingEnabled(): boolean;
					public beginOrResumeUploadFromURL(param0: io.tus.java.client.TusUpload, param1: javanetURL): io.tus.java.client.TusUploader;
					public resumeOrCreateUpload(param0: io.tus.java.client.TusUpload): io.tus.java.client.TusUploader;
					public getConnectTimeout(): number;
					public setUploadCreationURL(param0: javanetURL): void;
					public setHeaders(param0: javautilMap<string,string>): void;
					public setConnectTimeout(param0: number): void;
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export abstract class TusExecutor {
					public static class: javalangClass<io.tus.java.client.TusExecutor>;
					public setDelays(param0: native.Array<number>): void;
					public constructor();
					public getDelays(): native.Array<number>;
					public makeAttempt(): void;
					public makeAttempts(): boolean;
				}
			}
		}
	}
}

import javaioInputStream = java.io.InputStream;
/// <reference path="./java.io.InputStream.d.ts" />
declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusInputStream {
					public static class: javalangClass<io.tus.java.client.TusInputStream>;
					public read(param0: native.Array<number>, param1: number): number;
					public seekTo(param0: number): void;
					public constructor(param0: javaioInputStream);
					public close(): void;
					public mark(param0: number): void;
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusURLMemoryStore extends io.tus.java.client.TusURLStore {
					public static class: javalangClass<io.tus.java.client.TusURLMemoryStore>;
					public set(param0: string, param1: javanetURL): void;
					public remove(param0: string): void;
					public get(param0: string): javanetURL;
					public constructor();
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusURLStore {
					public static class: javalangClass<io.tus.java.client.TusURLStore>;
					/**
					 * Constructs a new instance of the io.tus.java.client.TusURLStore interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						set(param0: string, param1: javanetURL): void;
						get(param0: string): javanetURL;
						remove(param0: string): void;
					});
					public constructor();
					public set(param0: string, param1: javanetURL): void;
					public remove(param0: string): void;
					public get(param0: string): javanetURL;
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusUpload {
					public static class: javalangClass<io.tus.java.client.TusUpload>;
					public setSize(param0: number): void;
					public getFingerprint(): string;
					public getEncodedMetadata(): string;
					public constructor();
					public getMetadata(): javautilMap<string,string>;
					public setFingerprint(param0: string): void;
					public getInputStream(): javaioInputStream;
					public setMetadata(param0: javautilMap<string,string>): void;
					public getSize(): number;
					public constructor(param0: javaioFile);
					public setInputStream(param0: javaioInputStream): void;
				}
			}
		}
	}
}

declare module io {
	export module tus {
		export module java {
			export module client {
				export class TusUploader {
					public static class: javalangClass<io.tus.java.client.TusUploader>;
					public constructor(param0: io.tus.java.client.TusClient, param1: javanetURL, param2: io.tus.java.client.TusInputStream, param3: number);
					public uploadChunk(): number;
					public getRequestPayloadSize(): number;
					public getChunkSize(): number;
					public setRequestPayloadSize(param0: number): void;
					public setChunkSize(param0: number): void;
					public uploadChunk(param0: number): number;
					public finish(): void;
					public getOffset(): number;
					public getUploadURL(): javanetURL;
				}
			}
		}
	}
}

//Generics information:

