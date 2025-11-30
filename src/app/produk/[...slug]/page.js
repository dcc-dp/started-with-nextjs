export default function slug({params}) {
    return(
        <>
        <h1>detail produk</h1>
        <p>harga : {params.slug[0]}</p>
        <p>nama barang : {params.slug[1]}</p>
        <p>jenis barang : {params.slug[2]}</p>

        </>
    )
}