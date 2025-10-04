import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "../context/AuthContext";

export default function App({
  Component,
  pageProps,
}) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
