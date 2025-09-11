import Link from "next/link";

export default function edit({children}) {
    return (
        <>
            <h1>ini halaman edit</h1>
            <Link href="/profile/detail">ke detail</Link>
            {children}
        </>
    );
}