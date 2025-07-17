import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default async function Home() {
  let users = [];
  try {
    users = await getUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return (
    <div>
      <head>
        <title>Next.js CRUD Direct MySQL</title>
        <meta
          name="description"
          content="Direct MySQL connection CRUD with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Next.js CRUD MySQL</h1>
        <UserForm />
        <UserList users={users} />
      </main>
    </div>
  );
}

