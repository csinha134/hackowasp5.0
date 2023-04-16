import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {UploadedFile} from 'express-fileupload';
import fileUpload from 'express-fileupload';
import AuthNft from './utils/authfa';
import {GetTokenResponseSuccess} from './entities/authfa';

import axios, {ResponseType} from 'axios';
import FormData from 'form-data';
import {checkFile} from "./utils/fs";
import {checkParams, cryptFileWithSalt} from "./utils/crypto";
import {setupHeaders} from "./utils/req";
import authMiddleware from "./middlewares/auth.middlewares";
import {allowedOrigins} from "./entities/constants";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const CHAINSAFE_BUCKET_URL = process.env.CHAINSAFE_BUCKET_URL ?? '';
const CHAINSAFE_KEY_SECRET = process.env.CHAINSAFE_KEY_SECRET ?? '';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ?? '';
const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT ?? '';
const ENCRYPTION_ALGO = process.env.ENCRYPTION_ALGO ?? '';
const SELF_API_URL = process.env.SELF_API_URL ?? '';

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const authnft = AuthNft();

app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(fileUpload());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get(`/`, async (
  _: express.Request,
  response: express.Response,
): Promise<void> => {
  // TODO: add a HTML page for fun
  response.send(`Hi there owasp🚀`);
});


app.post(`/token`, async (
  request: express.Request,
  response: express.Response
) => {
  const {nonce, signature, walletPublicKey, walletPublicAddress} =
    request.body;
  const tokenResponse = await authnft.getToken({
    nonce,
    signature,
    walletPublicKey,
    walletPublicAddress,
  });
  if (tokenResponse.code === 200) {
    const data = tokenResponse.data as GetTokenResponseSuccess;
    response
      .cookie('Authorization', data.accessToken, {sameSite: 'none', secure: true, httpOnly: true})
      .send(tokenResponse.data);
    return;
  }
  response.status(tokenResponse.code).send(tokenResponse.data);
});


app.delete(`/token`, async (
  _: express.Request,
  response: express.Response
) => {
  response.cookie('Authorization', 'none', {
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  response.status(200).json({success: true, message: 'User logged out successfully'})
});


app.post('/encrypt', async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end("Please upload correct file");
  }
  if (!checkParams(req.body)) {
    return res.status(400).end("Please provide correct parameters");
  }
  const file: UploadedFile = req.files.file as UploadedFile;
  const encrypted = cryptFileWithSalt(file, false, req.body);
  setupHeaders(res, file);
  res.end(encrypted);
});


app.post('/decrypt', async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end("Please upload correct file");
  }
  if (!checkParams(req.body)) {
    return res.status(400).end("Please provide correct parameters");
  }
  const file: UploadedFile = req.files.file as UploadedFile;
  const decrypted = cryptFileWithSalt(file, true, req.body);
  setupHeaders(res, file);
  res.end(decrypted);
});


app.post('/upload', async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files || !checkFile(req.files)) {
      return res.status(400).end("Please upload correct file");
    }
    const uploadedFile = req.files.file as UploadedFile;
    // res.send()
    let formdata = new FormData();
    formdata.append('key', ENCRYPTION_KEY);
    formdata.append('salt', ENCRYPTION_SALT);
    formdata.append('algo', ENCRYPTION_ALGO);
    formdata.append('file', uploadedFile.data);

    const resp = await axios({
      method: 'post',
      url: `${SELF_API_URL}/encrypt`,
      responseType: 'stream' as ResponseType,
      headers: {
        ...formdata.getHeaders()
      },
      data: formdata
    });

    let formdata2 = new FormData();
    formdata2.append('path', ``);
    formdata2.append('file', resp.data, `encrypted_${uploadedFile.name}`);

    const resp2 = await axios({
      method: 'post',
      url: `${CHAINSAFE_BUCKET_URL}/upload`,
      responseType: 'stream' as ResponseType,
      headers: {
        'Authorization': `Bearer ${CHAINSAFE_KEY_SECRET}`,
        'Content-Type': 'application/json'
      },
      data: formdata2
    });

    resp2.data.pipe(res)
  } catch (error) {
    return res.sendStatus(400);
  }
});

app.post('/download', authMiddleware, async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {filename} = req.body;

    const resp = await axios({
      method: 'post',
      url: `${CHAINSAFE_BUCKET_URL}/download`,
      responseType: 'stream' as ResponseType,
      headers: {
        'Authorization': `Bearer ${CHAINSAFE_KEY_SECRET}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "path": `${filename}`
      })
    });

    let formdata = new FormData();
    formdata.append('key', ENCRYPTION_KEY);
    formdata.append('salt', ENCRYPTION_SALT);
    formdata.append('algo', ENCRYPTION_ALGO);
    formdata.append('file', resp.data);

    const resp2 = await axios({
      method: 'post',
      url: `${SELF_API_URL}/decrypt`,
      responseType: 'stream' as ResponseType,
      headers: {
        ...formdata.getHeaders()
      },
      data: formdata
    })
    resp2.data.pipe(res)
  } catch (error) {
    return res.sendStatus(400);
  }
});

app.post('/list', async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${CHAINSAFE_BUCKET_URL}/ls`,
      headers: {
        'Authorization': `Bearer ${CHAINSAFE_KEY_SECRET}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "path": `/`
      })
    });

    return res.send(resp.data);
  } catch (error) {
    return res.sendStatus(400);
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});