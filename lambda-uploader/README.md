# AWS Lambda file uploader.

## Description
This lambda function is used to upload files to aws S3 service. You can control the file size limit and also the file type of the file that the user can upload.

##### File type allowed for upload are 
png, PNG, jpeg, JPEG, jpg, JPG, pdf, JSON, json, xlsx, docx, csv.
you can change it in `upload-file-validation.conf.ts`

##### File size allowed to upload is 5 MB.
you can change it in ```upload-file-validation.conf.ts```

### Request and Response example

##### Request:
An example of request payload:
```
{
  "body": {
    "base64String": "any base 64 string",
    "location": "location"
  }
}
```

##### Response:
An example of Response body:

```
{
  "resp": {
    "message": "File uploaded successfully.",
    "path": "https://invoicing-tool.s3.amazonaws.com/public-uploads/commons/20180823115408-fd7a67577c4377.jpg"
  }
}
```

### Package Dependencies

Following are the dependencies for this project and are included in package.json

```
  "dependencies": {
    "aws-sdk": "^2.282.1",
    "file-type": "^8.1.0",
    "moment": "^2.22.2",
    "sha1": "^1.1.1"
  },
  "devDependencies": {
    "@types/file-type": "^5.2.1",
    "@types/jasmine": "^2.8.8",
    "@types/node": "^10.5.1",
    "@types/sha1": "^1.1.1",
    "mocha": "^5.2.0",
    "nodemon": "^1.17.5",
    "typescript": "^3.0.1"
  }
```

### Installing

Simple instalation should spin up the project in no time.

Run this command
```
npm install
```

### Deployment
1. `CTRL + SHIFT + B => tsc:build`
2. Convert the `dist` folder and `node_modules` in `.zip` and upload it to lambda function
3. Put `dist/upload.upload` as your Handler.

## Authors
- **Gopal Singh Rathore**

## Acknowledgments
- Hat tip to anyone whose code was used
