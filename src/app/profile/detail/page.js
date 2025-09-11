import Link from "next/link";

export default function detail () {
    return (
        <>
        <h1>ini halaman detail</h1>
        <Link href="/profile/detail/edit">ke edit</Link>
        </>
    );
}