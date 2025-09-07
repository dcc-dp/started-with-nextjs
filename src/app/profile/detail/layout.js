import Counter from "./counter"

export default function layoutDetail({ children }) {
  return (
    <>   
      {/* <header>ini layout detail header</header> */}
      <main>
       <h1> Ini Layout <Counter /></h1>
        {children}
      </main>
      {/* <footer>ini layout detail footer</footer> */}
    </>
  );
}
