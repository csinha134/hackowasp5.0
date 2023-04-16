import {Navbar, Button, Link, Text, useTheme} from "@nextui-org/react";
import {connectWallet, disconnectWallet, getAccount, signPayload} from "../utils/wallet";
import {getAccessToken, removeAccessToken} from "../utils/access_token";

export default function Nav(props: any) {
  const {account, setAccount, setContentUri, setError, setAccessToken, onGetContent} = props
  const {isDark} = useTheme();

  const onConnectWallet = async () => {
    console.log("on connect")
    await connectWallet();
    console.log('no');
    const account = await getAccount();
    console.log('Accooutn', account);
    setAccount(JSON.stringify(account));
    setContentUri('');
    const signature = await signPayload();
    const {accessToken, error} = await getAccessToken({
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

  const publicAddr = getPublicAddressFromAccount()

  function StatusButton() {
    if (publicAddr && publicAddr !== '') {
      return (
        <>
          <Navbar.Item>
            <Button auto flat disabled>
              {`Connected to ${publicAddr}`}
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto flat onPress={ondisconnectWallet}>
              Disconnect
            </Button>
          </Navbar.Item>
        </>
      )
    }

    return (
      <Navbar.Item>
        <Button auto flat onPress={onConnectWallet}>
          {' '}
          Connect Wallet{' '}
        </Button>
      </Navbar.Item>
    );
  }



  return (
    <Navbar isBordered={isDark} variant="sticky" style={{width: '100%'}}>
      <Navbar.Brand>
        <svg
          className=""
          fill="none"
          height="36"
          viewBox="0 0 32 32"
          width="36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <StatusButton />
      </Navbar.Content>
    </Navbar>
  );
}
