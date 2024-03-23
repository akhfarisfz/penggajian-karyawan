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

const PagePotonganCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [potongan, setPotongan] = useState({
    nama: "",
    potongan: 0
  })

  const potonganChangeListener = useChangeListener();
  const potonganValidator = useValidator({
    nama: [],
    potongan: []
});


  const onPotonganCreate = () => {
    potonganValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(`${BASE_URL}/potongan/`, potongan, config).then((response) => {
      message.success(response);
      navigate("/")
    }).catch((error) => {
      message.error(error)
      potonganValidator.except(error)
    })
  }

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>New Potongan</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Potongan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama Potongan"}
                    className={"bg-body-tertiary"}
                    value={potongan.nama}
                    name={"nama"}
                    onChange={(e) => potonganChangeListener.onChangeText(e, potongan, setPotongan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={potonganValidator.get('nama')} />
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Potongan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Jumlah Potongan"}
                    className={"bg-body-tertiary"}
                    value={potongan.potongan}
                    name={"potongan"}
                    onChange={(e) => potonganChangeListener.onChangeText(e, potongan, setPotongan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={potonganValidator.get('potongan')} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/potongan")}>Batal</Button>
            <Button onClick={onPotonganCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePotonganCreate;