import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageKaryawanCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [karyawan, setKaryawan] = useState({})
  const karyawanChangeListener = useChangeListener();
  const karyawanValidator = useValidator([])

  const onKaryawanCreate = () => {
    karyawanValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(`${BASE_URL}/karyawan/`, karyawan, config).then((response) => {
      message.success(response);
      navigate("/")
    }).catch((error) => {
      message.error(error)
      karyawanValidator.except(error)
    })
  }

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>New Karyawan</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Karyawan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama"}
                    className={"bg-body-tertiary"}
                    value={karyawan.nama}
                    name={"nama"}
                    onChange={(e) => karyawanChangeListener.onChangeText(e, karyawan, setKaryawan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={karyawanValidator.get('nama')} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/")}>Batal</Button>
            <Button onClick={onKaryawanCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageKaryawanCreate;