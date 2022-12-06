import axios from 'axios';
import React, {useEffect ,useState } from 'react'

export default function Home() {
    const [buku, setBuku] = useState([]);

    const getAll = () => {
        axios.get("http://localhost:8000/daftarBuku")
        .then((res) => {
            setBuku(res.data);
        }).catch((error) => {
            alert("terjadi kesalahan " + error)
        })
    }

    useEffect(() => {
        getAll();
    }, [])

    const deleteBuku =async (id) => {
        await axios.delete("http://localhost:8000/daftarBuku/" + id)
        .then(() =>{
            alert("Sukses Delete")
        });
        window.location.reload();
    }

  return (
    <div className="container my-5">
<table className="table table-bordered">
    <thead>
    <tr>
     <th>No</th>
     <th>Judul</th>
     <th>Deskripsi</th>
    <th>Pengarang</th>
    <th>Tahun Terbit</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
        {buku.map((book, index) => (
            <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.pengarang}</td>
                <td>{book.tahunTerbit}</td>
                <td>
                    <a href={"/edit/" + book.id}>
                    <button     
                     variant="warning       "
                     className="mx-1"
                     style={{ backgroundColor: "green" }} >
                        Edit
                    </button>
                    </a>
                    <button
                    variant="danger"
                    className="mx-1"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteBuku(book.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
    </div>
  )
}