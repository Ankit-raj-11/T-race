import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh", padding: "1rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
