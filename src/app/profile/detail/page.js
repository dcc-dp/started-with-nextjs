import Link from "next/link";

export default function detail (){
    return (
        <>
        <h3>ini detail page</h3>
        <Link href="/profile/detail/edit">pindah ke edit</Link>
        </>
    );
}