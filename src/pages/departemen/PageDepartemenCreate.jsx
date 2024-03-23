import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import { useState } from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageDepartemenCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [departemen, setDepartemen] = useState({
    nama: "",
  });

  const departemenChangeListener = useChangeListener();
  const departemenValidator = useValidator({
    nama: [],
  });

  const onDepartemenCreate = () => {
    departemenValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(`${BASE_URL}/departemen/`, departemen, config)
      .then((response) => {
        message.success(response);
        navigate("/departemen");
      })
      .catch((error) => {
        message.error(error);
        departemenValidator.except(error);
      });
  };

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Tambah Departemen</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>
                  Nama Departemen
                </Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama Departemen"}
                    className={"bg-body-tertiary"}
                    value={departemen.nama}
                    name={"nama"}
                    onChange={(e) =>
                      departemenChangeListener.onChangeText(
                        e,
                        departemen,
                        setDepartemen
                      )
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={departemenValidator.get("nama")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/")}>
              Batal
            </Button>
            <Button onClick={onDepartemenCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageDepartemenCreate;
