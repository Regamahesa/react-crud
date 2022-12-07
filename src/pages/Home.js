import axios from 'axios';
import Swal from 'sweetalert2';
import React, {useEffect ,useState } from 'react'

export default function Home() {
    const [buku, setBuku] = useState([]);

    // Fungsi getAll untuk melihat semua data 
    const getAll = () => {
        axios.get("http://localhost:8000/daftarBuku")
        .then((res) => {
            setBuku(res.data);
        }).catch((error) => {
            alert("terjadi kesalahan " + error)
        })
    }

     //Fungsi useEffect  menambahkan kemampuan untuk melakukan “efek samping” dari sebuah function component.
    useEffect(() => {
        getAll();
    }, [])

    // fungsi deletBuku adalah untuk mengahapus data sesuai idnya 
    const deleteBuku =async (id) => {
         // Async-await bisa dikatakan sebagai cara mudah menggunakan JavaScript Promise yang agak sulit dipahami.
        await axios.delete("http://localhost:8000/daftarBuku/" + id)
        .then(() =>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  window.location.reload();
                }
              })
        });
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
      {localStorage.getItem("id") !== null ? <th>Action</th> :<></>}
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
               {localStorage.getItem("id") !== null ?  <td>
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
                </td> : <></> }
            </tr>
        ))}
    </tbody>
</table>
    </div>
  )
}
