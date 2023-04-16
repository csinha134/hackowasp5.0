import './index.css'
import "./sass/index.scss";
import HomePage from './pages/Home'
import Admin from './pages/Admin';
import scrollreveal from "scrollreveal";
import {ROUTES} from './entities/routes';
import Navbar from "./components/Navbar";
import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {revealSelectors, scrollRevealConfig, scrollRevealOptions} from "./entities/scroll-reveal";
import {connectWallet, disconnectWallet, getAccount, signPayload} from './utils/wallet';
import {getAccessToken, getContent, listContents, removeAccessToken} from './utils/access_token';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [content, setContent] = useState("");
  const [contentUri, setContentUri] = useState('');
  const [error, setError] = useState<any>(null);
  const [accessToken, setAccessToken] = useState('');
  const [contentsList, setContentList] = useState([]);

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(JSON.stringify(account));
      setContentList(await listContents());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const {uri, error} = await getContent(content);
      console.log('Getting content', content);
      if (uri) {
        console.log(uri);
      }
      if (error) {
        // alert(error);
        setContentUri('');
      } else {
        setContentUri(uri);
      }
    })();
  }, [content]);

  const onGetContent = async () => {
    try {
      setLoading(true);
      const {uri, error} = await getContent(content);
      if (error) {
        // alert(error);
        setContentUri('');
      } else {
        setContentUri(uri);
      }
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleItemClick = async (item: any) => {
    setContent(item);
    if (!(accessToken && accessToken.length > 0)) {
      setContentUri('');
      alert(
        'Looks like either you are disconnected or connected with a wallet that does not contain a Fanstop NFT!'
      );
    }
  };

  const onConnectWallet = async () => {
    await connectWallet();
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

  async function handleDisconnect() {
    await disconnectWallet();
    setAccount('');
    const resp = await removeAccessToken();
    setAccessToken('');
    setContentUri('');
    console.log(resp);
  }

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

  useEffect(() => {
    const sr = scrollreveal(scrollRevealConfig);
    sr.reveal(revealSelectors, scrollRevealOptions);
  }, []);

  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    (home[0] as HTMLDivElement).style.transform = "none";
    const nav = document.getElementsByTagName("nav");
    nav[0].style.transform = "none";
  }, 1500);

  return (
    <div className="app-container">
      <Navbar publicAddr={getPublicAddressFromAccount()} onConnectWallet={onConnectWallet} ondisconnectWallet={handleDisconnect} />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}