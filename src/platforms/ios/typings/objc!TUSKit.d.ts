
declare class TUSAssetData extends TUSData {

	static alloc(): TUSAssetData; // inherited from NSObject

	static new(): TUSAssetData; // inherited from NSObject

	constructor(o: { asset: ALAsset; });

	initWithAsset(asset: ALAsset): this;
}

declare class TUSData extends NSObject implements NSStreamDelegate {

	static alloc(): TUSData; // inherited from NSObject

	static new(): TUSData; // inherited from NSObject

	readonly dataStream: NSInputStream;

	failureBlock: (p1: NSError) => void;

	successBlock: () => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { data: NSData; });

	class(): typeof NSObject;

	close(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithData(data: NSData): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	length(): number;

	open(): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setOffset(offset: number): void;

	stop(): void;

	streamHandleEvent(aStream: NSStream, eventCode: NSStreamEvent): void;
}

declare const enum TUSErrorCode {

	FileDataErrorClosed = 0,

	FileDataErrorCannotOpen = 1,

	ResumableUploadErrorServer = 2
}

declare var TUSErrorDomain: string;

declare class TUSFileData extends TUSData {

	static alloc(): TUSFileData; // inherited from NSObject

	static new(): TUSFileData; // inherited from NSObject

	constructor(o: { fileURL: NSURL; });

	initWithFileURL(url: NSURL): this;
}

declare class TUSFileUploadStore extends TUSUploadStore {

	static alloc(): TUSFileUploadStore; // inherited from NSObject

	static new(): TUSFileUploadStore; // inherited from NSObject

	constructor(o: { URL: NSURL; });

	initWithURL(url: NSURL): this;
}

declare var TUSKitVersionNumber: number;

declare var TUSKitVersionString: interop.Reference<number>;

declare class TUSResumableUpload extends NSObject implements NSCoding {

	static alloc(): TUSResumableUpload; // inherited from NSObject

	static new(): TUSResumableUpload; // inherited from NSObject

	readonly complete: boolean;

	failureBlock: (p1: NSError) => void;

	readonly idle: boolean;

	progressBlock: (p1: number, p2: number) => void;

	resultBlock: (p1: NSURL) => void;

	readonly state: TUSResumableUploadState;

	readonly uploadId: string;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dictionary: NSDictionary<any, any>; delegate: TUSResumableUploadDelegate; });

	constructor(o: { uploadId: string; file: NSURL; delegate: TUSResumableUploadDelegate; uploadHeaders: NSDictionary<string, string>; metadata: NSDictionary<string, string>; });

	cancel(): boolean;

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithDictionaryDelegate(serializedUpload: NSDictionary<any, any>, delegate: TUSResumableUploadDelegate): this;

	initWithUploadIdFileDelegateUploadHeadersMetadata(uploadId: string, fileUrl: NSURL, delegate: TUSResumableUploadDelegate, headers: NSDictionary<string, string>, metadata: NSDictionary<string, string>): this;

	resume(): boolean;

	serialize(): NSDictionary<any, any>;

	stop(): boolean;

	taskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend(task: NSURLSessionTask, bytesSent: number, totalBytesSent: number, totalBytesExpectedToSend: number): void;
}

interface TUSResumableUploadDelegate extends NSObjectProtocol {

	createUploadURL: NSURL;

	session: NSURLSession;

	addTaskForUpload(task: NSURLSessionTask, upload: TUSResumableUpload): void;

	removeTask(task: NSURLSessionTask): void;

	removeUpload(upload: TUSResumableUpload): void;

	saveUpload(upload: TUSResumableUpload): void;
}
declare var TUSResumableUploadDelegate: {

	prototype: TUSResumableUploadDelegate;
};

declare const enum TUSResumableUploadState {

	CreatingFile = 0,

	CheckingFile = 1,

	UploadingFile = 2,

	Complete = 3
}

declare class TUSSession extends NSObject {

	static alloc(): TUSSession; // inherited from NSObject

	static new(): TUSSession; // inherited from NSObject

	allowsCellularAccess: boolean;

	constructor(o: { endpoint: NSURL; dataStore: TUSUploadStore; allowsCellularAccess: boolean; });

	cancelAll(): number;

	createUploadFromFileHeadersMetadata(fileURL: NSURL, headers: NSDictionary<string, string>, metadata: NSDictionary<string, string>): TUSResumableUpload;

	initWithEndpointDataStoreAllowsCellularAccess(endpoint: NSURL, store: TUSUploadStore, allowsCellularAccess: boolean): this;

	restoreAllUploads(): NSArray<TUSResumableUpload>;

	restoreUpload(uploadId: string): TUSResumableUpload;

	resumeAll(): NSArray<TUSResumableUpload>;

	stopAll(): number;
}

declare class TUSUploadStore extends NSObject {

	static alloc(): TUSUploadStore; // inherited from NSObject

	static new(): TUSUploadStore; // inherited from NSObject

	readonly allUploadIdentifiers: NSArray<string>;

	containsUploadWithIdentifier(uploadId: string): boolean;

	generateUploadId(): string;

	loadUploadWithIdentifierDelegate(uploadId: string, delegate: TUSResumableUploadDelegate): TUSResumableUpload;

	removeUploadWithIdentifier(uploadIdentifier: string): boolean;

	saveUpload(upload: TUSResumableUpload): boolean;
}
