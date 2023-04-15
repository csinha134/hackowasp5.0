import * as crypto from "crypto";
import {UploadedFile} from "express-fileupload";

export type AlgoList = {
  [key: string]: {
    keyLength: number,
    ivLength: number,
  }
}

export const algoList: AlgoList = {
  'des': {
    keyLength: 8,
    ivLength: 8,
  }
}

export type Params = {
  algo: string;
  key: string;
  salt: string;
};

export type CryptFileFunction = (
  file: UploadedFile,
  decrypt: boolean,
  body: Params
) => Buffer;

export const cryptFileWithSalt: CryptFileFunction = (
  file,
  decrypt = false,
  {
    algo = "aes-256-ctr",
    key = crypto.randomBytes(16).toString("hex"),
    salt = crypto.randomBytes(8).toString("hex"),
  }
): Buffer => {
  if (!decrypt) {
    const cipher = crypto.createCipheriv(algo, key, salt);
    const crypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return crypted;
  } else {
    const cipher = crypto.createDecipheriv(algo, key, salt);
    const decrypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return decrypted;
  }
};

export const checkParams = ({algo, key, salt}: Params): boolean => {
  if (!algo || !key || !salt) {
    return false;
  }
  const chosenAlgo = algoList[algo]
  if (!chosenAlgo || key.length !== chosenAlgo.keyLength || salt.length !== chosenAlgo.ivLength) {
    return false
  }
  else return true;
};