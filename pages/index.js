import Head from "next/head";
import Layout from "../components/Layout/Layout"
import Active from "../components/Active";
import Previous from "../components/Previous"

export default function Home() {
  return (
    <>
      <Head>
        <title>Debaucus - Make it work. Make it better.</title>
      </Head>
      <Layout>
        <Active />
        <Previous />
      </Layout>
    </>
  );
}
