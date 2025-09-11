import Counter from "../detail/counter";

export default function templateProfile({children}) {
    return (
        <> 
                <h1>ini template profile </h1>
                <Counter/>
                {children}
        </>
    );
}