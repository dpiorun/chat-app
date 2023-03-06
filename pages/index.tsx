import Head from "next/head";
import Layout from "@/components/Layout";

function Home() {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout />
      </main>
    </>
  );
}

export default Home;
