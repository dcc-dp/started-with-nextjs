import Link from "next/link";

export default function edit ({children}) {
    return (
        <>
        <Link href="/profile/detail">pindah ke detail profile</Link>
        <h3>ini edit</h3>
        </>
    );
}