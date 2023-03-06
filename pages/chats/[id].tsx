import Layout from "@/components/Layout";
import { useUsersContext } from "@/context/Users";
import Head from "next/head";
import { useRouter } from "next/router";

function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const { users } = useUsersContext();
  const activeUser = users.find((user) => user.login.uuid == id);

  return (
    <>
      <Head>
        <title>Chat with {activeUser?.name.first}</title>
        <meta name="description" content="Messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Layout activeUser={activeUser} />
      </main>
    </>
  );
}

export default Chat;
