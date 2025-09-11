import Counter from "../detail/counter";

export default function layoutDetail({children}) {
    return (
        <>   
        <main>
                <h1>ini layout profile </h1>
                <Counter />
                {children}
        </main>
        </>
    );
}