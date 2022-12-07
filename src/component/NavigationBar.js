import axios from "axios";
import React from 'react'
import "../style/Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
export default function NavigationBar() {
   // useState di panggil dalam function component untuk menambahkan suatu state lokal.
  const [show, setShow] = useState(false);
  const [ judul, setJudul ] = useState("");
  const [ deskripsi, setDeskripsi]  = useState("");
  const [ pengarang, setPengarang ] = useState("");
  const [ tahunTerbit, setTahunTerbit ] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  // method addBUku berfungsi menambahkan data 
  const addBuku = async (e) => {
    e.preventDefault();

    try {
      // Async-await bisa dikatakan sebagai cara mudah menggunakan JavaScript Promise yang agak sulit dipahami.
      await axios.post("http://localhost:8000/daftarBuku", {
        judul: judul,
        deskripsi: deskripsi,
        pengarang: pengarang,
        tahunTerbit: tahunTerbit
      })
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
      window.location.reload();
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid  navbar">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Table</a>
              </li>
              {localStorage.getItem("id") !== null ? (
                <>
                 <li className="nav-item">
                <button className="nav-link" onClick={handleShow} style={{border: "none", backgroundColor:"#009EFF"}}>Tambah BUKU</button>
              </li>
              <li className="nav-item float-right">
                <a className="btn" onClick={logout}>
                  LogOut
                </a>
              </li>
                </>
              ) : (
                <li className="nav-item float-right">
                  <a className="btn" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Buku</Modal.Title>
        </Modal.Header>
        <form onSubmit={addBuku} method="POST">
          <Modal.Body>
            <div className="mb-3">
              <Form.Label>
                <strong>Judul</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control placeholder="Massukkan Judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control placeholder="Massukkan Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Pengarang</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control placeholder="Massukkan Pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)} />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Tahun Terbit</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control type="Date" placeholder="Massukkan Pengarang" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} />
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary">tambah</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}
