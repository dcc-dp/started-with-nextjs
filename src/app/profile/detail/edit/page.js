import Link from "next/link";

export default function edit ({children}) {
    return (
        <>
        <h3>ini edit page</h3>
        <Link href="/profile/detail" className="button">Detail</Link>
        </>
    );
}