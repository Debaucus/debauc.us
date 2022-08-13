import Head from "next/head";
import Layout from "../components/Layout/Layout"
import Active from "../components/Active";
import Previous from "../components/Previous"
import Top from "../components/Top";

export default function Home() {
  return (
    <>
      <Head>
        <title>Debaucus - Make it work. Make it better.</title>
      </Head>
      <Layout>
        <Top />
        <Active />
        <Previous />
      </Layout>
    </>
  );
}
