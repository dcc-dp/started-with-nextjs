import UserForm from "./components/UserForm";

export default function Home() {
  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>NEXT.js CRUD</h1>
      <UserForm />
    </main>
  );
}