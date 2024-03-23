import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL } from "../../src/libs/config/settings.js";
import WidgetPotonganChoice from "../Potongan/WidgetPotonganChoice.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import useChangeListener from "../../src/libs/hooks/useChangeListener.jsx";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
// import WidgetJabatanChoice from "../karyawan/WidgetJabatanChoice.jsx";
import WidgetKaryawanChoice from "../karyawan/WidgetKaryawanChoice.jsx";

const WidgetPenggajianCreateModal = ({ callback }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [penggajian, setPenggajian] = useState({
    karyawanref: "",
    periodeGajiBulan: "",
  });

  const [karyawan, setKaryawan] = useState({
    nik: "",
    nama: "",
    alamat: "",
    no_Telepon: "",
    bank: "",
    no_rekening: "",
  });

  const [potongans, daftarPotongans] = useState([]);

  const onCallbackPotonganChoice = (potongan) => {
    const potonganExist = potongans.find((obj) => obj._id === potongan._id);

    if (potonganExist) {
      return;
    }

    daftarPotongans([...potongans, potongan]);
  };

  const [karyawans, setdaftarKaryawans] = useState([]);

  const onCallbackKaryawanChoice = (selectedKaryawan) => {
    setKaryawan(selectedKaryawan);
    setPenggajian((prevPenggajian) => ({
      ...prevPenggajian,
      karyawanref: selectedKaryawan._id,
    }));
  };

  const onPenggajianCreate = () => {
    const url = `${BASE_URL}/penggajian/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };
    const payload = {
      ...penggajian,
      karyawan,
    };

    http.privateHTTP
      .post(url, payload, config)
      .then((response) => {
        message.success(response);
        callback();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  };

  const onItemRemove = (potongan) => {
    const temps = potongans.filter((value) => value._id !== potongan._id);
    daftarPotongans(temps);
  };

  const onItemRemovee = (karyawan) => {
    const temps = karyawans.filter((value) => value._id !== karyawan._id);
    setdaftarKaryawans(temps);
  };

  return (
    <>
      <Button onClick={handleShow}>Penggajian</Button>

      <Modal
        show={show}
        onHide={handleClose}
        size={"xl"}
        backdrop={"static"}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Penggajian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <WidgetKaryawanChoice callback={onCallbackKaryawanChoice} />
            </Col>
            <Col md={6}>
              <Table striped={true} bordered={true} responsive={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NIK</th>
                    <th>Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{karyawan._id}</td>
                    <td>{karyawan.nik}</td>
                    <td>{karyawan.nama}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Form.Group className={"mb-3"}>
            <Form.Label>Periode</Form.Label>
            <Form.Control
              placeholder={"Masukkan Periode Gaji"}
              className={"bg-body-tertiary"}
              value={penggajian.periodeGajiBulan}
              name={"periodeGajiBulan"}
              onChange={(e) =>
                changeListener.onChangeText(e, penggajian, setPenggajian)
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onPenggajianCreate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WidgetPenggajianCreateModal.propTypes = {
  callback: PropTypes.func,
};

export default WidgetPenggajianCreateModal;
