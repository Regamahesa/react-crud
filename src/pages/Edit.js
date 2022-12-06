import axios from 'axios';
import React, {useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'

export default function Edit() {
  const param = useParams();
  const [ judul, setJudul]  = useState("");
  const [ deskripsi, setDeskripsi ] = useState("");
  const [pengarang, setPengarang ] = useState("");
  const [tahunTerbit, setTahunTerbit ] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
    .get("http://localhost:8000/daftarBuku/" + param.id)
    .then((response) => {
      const newBook = response.data;
      setJudul(newBook.judul);
      setDeskripsi(newBook.deskripsi);
      setPengarang(newBook.pengarang);
      setTahunTerbit(newBook.tahunTerbit);
    })
    .catch((error) => {
      alert("Terjadi kesalahan Sir! " + error)
    })
  },[]);

  const submitActionHandler = async (e) => {
    e.preventDefault();

    await axios.put("http://localhost:8000/daftarBuku/" + param.id, {
    judul: judul,
    deskripsi: deskripsi,
    pengarang: pengarang,
    tahunTerbit: tahunTerbit
  })
  .then(() => {
    history.push("/");
  })
  .catch((error) => {
    alert("Terjadi kesalahan " + error)
  })
  }

  return (
    <div className="edit mx-5">
        <div className="container my-5">
            <form onSubmit={submitActionHandler}>
                <div className="name mb-3">
                <Form.Label>
                    <strong>Judul</strong>
                </Form.Label>
                <InputGroup className="d-flex gap-3">
                <Form.Control
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                 />
                </InputGroup>
                </div>

                <div className="place-of-birth mb-3">
                  <Form.Label>
                    <strong>Deskripsi</strong>
                  </Form.Label>
                  <InputGroup className="d-flex gap-3">
                    <Form.Control
                    placeholder="Deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)} />
                  </InputGroup>
                </div>

                <div className="place-of-birth mb-3">
                  <Form.Label>
                    <strong>Pengarang</strong>
                  </Form.Label>
                  <div className="d-flex gap-3">
                  <InputGroup className="d-flex gap-3">
                    <Form.Control
                    placeholder="Pengarang"
                    value={pengarang}
                    onChange={(e) => setPengarang(e.target.value)} />
                  </InputGroup>
                </div>
                </div>
                <div className="place-of-birth mb-3">
                  <Form.Label>
                    <strong>TahunTerbit</strong>
                  </Form.Label>
                  <div className="d-flex gap-3">
                  <InputGroup className="d-flex gap-3">
                    <Form.Control
                    placeholder="TahunTerbit"
                    value={tahunTerbit}
                    onChange={(e) => setTahunTerbit(e.target.value)} />
                  </InputGroup>
                </div>
                </div>
              <div className="d-flex justify-conten-end align-items-center mt-2">
                <button className="buton btn" >
                  Save 
                </button>
              </div>
            </form>
        </div>
        
    </div>
  )
}
