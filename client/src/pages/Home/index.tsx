import Clients from "../../components/Clients";
import Footer from "../../components/Footer";
import Free from "../../components/Free";
import Home from "../../components/Home";
import Like from "../../components/Like";
import Release from "../../components/Release";
import ScrollToTop from "../../components/ScrollToTop";
import Signup from "../../components/Signup";

export default function HomePage() {

  return (
    <div>
      <ScrollToTop />
      <Home />
      <Free />
      <Clients />
      <Release />
      <Like />
      <Signup />
      <Footer />
    </div>
  );
}
