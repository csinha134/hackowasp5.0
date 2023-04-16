import {Navbar, Button, Link, Text, useTheme} from "@nextui-org/react";

export type TNav = {
  publicAddr: string
  onConnectWallet: () => void
  ondisconnectWallet: () => void
}

export default function Nav(props: TNav) {
  const {publicAddr, onConnectWallet, ondisconnectWallet} = props
  const {isDark} = useTheme();

  function StatusButton() {
    if (publicAddr && publicAddr !== '') {
      return (
        <>
          <Navbar.Item>
            <Button auto flat as={Link} href="#" disabled>
              {`Connected to ${publicAddr}`}
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto flat as={Link} href="#" onPress={ondisconnectWallet}>
              Disconnect
            </Button>
          </Navbar.Item>
        </>
      )
    }

    return (
      <Navbar.Item>
        <Button auto flat as={Link} href="#" onPress={onConnectWallet}>
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
