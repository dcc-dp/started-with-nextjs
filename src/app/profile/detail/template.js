import Counter from "./counter";

export default function templateDetail ({children}) {
    return (
        <>   
            {/* <header>ini templet detail header</header> */}
            <main>
                {children}
                <h1> Ini Template <Counter /></h1>
            </main>
            {/* <footer>ini templet detail footer</footer> */}
         </>
    );
}