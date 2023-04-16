import { getAccessToken, removeAccessToken } from '../utils/rest';
import {
  connectWallet,
  disconnectWallet,
  getAccount,
  signPayload,
} from '../utils/wallet';

const Navbar = (props) => {
  const {
    account,
    setAccount,
    contentUri,
    setContentUri,
    setError,
    setAccessToken,
    onGetContent,
  } = props;

  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    console.log('Accooutn', account);
    setAccount(JSON.stringify(account));
    setContentUri('');
    const signature = await signPayload();
    const { accessToken, error } = await getAccessToken({
      signature,
      ...account,
    });
    console.log('access ', accessToken, error);
    if (error) {
      setError(error);
    }
    if (accessToken) {
      setAccessToken(accessToken);
      await onGetContent();
    }
  };

  const ondisconnectWallet = async () => {
    await disconnectWallet();
    setAccount('');
    const resp = await removeAccessToken();
    setAccessToken(null);
    setContentUri('');
    console.log(resp);
  };

  const getPublicAddressFromAccount = () => {
    if (account === '') {
      return '';
    }
    const publicAddr = JSON.parse(account)?.walletPublicAddress;
    if (publicAddr) {
      return publicAddr;
    }
    return '';
  };

  return (
    <div className="navbar navbar-dark bg-warning fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Fanstop Demo
        </a>
        <a href="https://github.com/csinha134/hackowasp5.0">
          <img
            src="github-logo-6531.png"
            alt="public-address"
            className="ml-2"
          />
        </a>
        <div className="d-flex">
          {(() => {
            const publicAddr = getPublicAddressFromAccount();
            if (publicAddr && publicAddr !== '') {
              return (
                <button className="btn btn-outline-secondary" disabled>
                  Connected to ${publicAddr}
                </button>
              );
            }
            return (
              <button
                onClick={onConnectWallet}
                className="btn btn-outline-success"
              >
                {' '}
                Connect Wallet{' '}
              </button>
            );
          })()}
          &nbsp;
          {(() => {
            const publicAddr = getPublicAddressFromAccount();
            if (publicAddr && publicAddr !== '') {
              return (
                <button
                  onClick={ondisconnectWallet}
                  className="btn btn-outline-danger"
                >
                  Disconnect
                </button>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
