import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
