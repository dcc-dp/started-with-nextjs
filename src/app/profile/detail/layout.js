import Counter from "./counter"

export default function layoutDetail({ children }) {
  return (
    <>   
      {/* <header>ini layout detail header</header> */}
      <main>
        {children}
       <h1> Ini Layout <Counter /></h1>
      </main>
      {/* <footer>ini layout detail footer</footer> */}
    </>
  );
}
