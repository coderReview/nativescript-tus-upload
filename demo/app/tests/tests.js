var UploadTus = require("nativescript-tus-upload").UploadTus;
var uploadTus = new UploadTus();

describe("greet function", function() {
    it("exists", function() {
        expect(uploadTus.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(uploadTus.greet()).toEqual("Hello, NS");
    });
});