import {FileArray} from "express-fileupload";


export const checkFile = (files: FileArray | undefined): boolean => {
  if (!files || !files.file) {
    return false;
  } else return true;
};