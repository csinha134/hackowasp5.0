export interface GetFa2TokenResponse {
  id: number;
  account: {
    address: string;
  };
  token: {
    id: number;
    contract: {
      address: string;
    };
    tokenId: string;
    standard: string;
  };
  balance: string;
  transfersCount: number;
  firstLevel: number;
  firstTime: string;
  lastLevel: number;
  lastTime: string;
}

export interface GetTokenRequest {
  nonce: string;
  signature: string;
  walletPublicKey: string;
  walletPublicAddress: string;
}

export interface GetTokenResponse {
  data: GetTokenResponseSuccess | GetTokenResponseFailure;
  code: number;
}

export interface GetTokenResponseSuccess {
  accessToken: string;
  walletPublicKey: string;
  walletPublicAddress: string;
  nftContractAddress: string;
  iat: number;
  exp: number;
}

export interface GetTokenResponseFailure {
  errorCode: string;
  errorMessage?: string;
  errorUri?: string;
}

export interface JwtAccessTokenPayload {
  walletPublicKey: string;
  nftContractAddress: string;
}