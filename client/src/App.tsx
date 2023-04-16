import './index.css'
import "./sass/index.scss";
import HomePage from './pages/Home'
import Admin from './pages/Admin';
import scrollreveal from "scrollreveal";
import {ROUTES} from './entities/routes';
import Navbar from "./components/NavNew";
import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {revealSelectors, scrollRevealConfig, scrollRevealOptions} from "./entities/scroll-reveal";
import {getAccount} from './utils/wallet';
import {getContent, listContents} from './utils/access_token';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [content, setContent] = useState('');
  const [contentUri, setContentUri] = useState('');
  const [error, setError] = useState<any>(null);
  const [accessToken, setAccessToken] = useState('');
  const [contentsList, setContentList] = useState([]);

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      console.log(account)
      setAccount(JSON.stringify(account));
      setContentList(await listContents());
      console.log(contentsList)
      console.log('get acccount')
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
        setContentUri('');
      } else {
        setContentUri(uri!);
      }
    })();
  }, [content]);

  const onGetContent = async () => {
    try {
      setLoading(true);
      const {uri, error} = await getContent(content);
      if (error) {
        setContentUri('');
      } else {
        setContentUri(uri!);
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

  return (
    <div className="app-container">
      <Navbar
        account={account}
        setAccount={setAccount}
        setContentUri={setContentUri}
        setError={setError}
        setAccessToken={setAccessToken}
        onGetContent={onGetContent}
      />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage content={contentsList} setContent={setContent} accessToken={accessToken} setContentUri={setContentUri} />} />
          <Route path={ROUTES.ADMIN} element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}