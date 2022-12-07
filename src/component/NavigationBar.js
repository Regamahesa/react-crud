import axios from "axios";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, InputGroup } from "react-bootstrap";
export default function NavigationBar() {
   // useState di panggil dalam function component untuk menambahkan suatu state lokal.
  const [show, setShow] = useState(false);
  const [ judul, setJudul ] = useState("");
  const [ deskripsi, setDeskripsi]  = useState("");
  const [ pengarang, setPengarang ] = useState("");
  const [ tahunTerbit, setTahunTerbit ] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      window.location.reload();
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
              <li class="nav-item">
                <button class="nav-link" onClick={handleShow}>Tambah BUKU</button>
              </li>
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
                <Form.Control placeholder="Massukkan Pengarang" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} />
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
