import {Response} from 'express';
import {UploadedFile} from "express-fileupload";

export const setupHeaders = (res: Response, file?: UploadedFile | undefined) => {
  if (file) {
    res.writeHead(200, {
      'Content-Type': file.mimetype,
      'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
      'Connection': 'close',
    })
  } else {
    res.writeHead(200, {
      'Connection': 'close'
    })
  }
}