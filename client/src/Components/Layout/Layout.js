import { Footer } from "../Footer/Footer";
import Nav from "../Nav/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
