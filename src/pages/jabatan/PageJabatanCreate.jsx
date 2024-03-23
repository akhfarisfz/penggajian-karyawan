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

const PageJabatanCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [jabatan, setJabatan] = useState({});
  const jabatanChangeListener = useChangeListener();
  const jabatanValidator = useValidator([]);

  const onJabatanCreate = () => {
    jabatanValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(`${BASE_URL}/jabatan/`, jabatan, config)
      .then((response) => {
        message.success(response);
        navigate("/");
      })
      .catch((error) => {
        message.error(error);
        jabatanValidator.except(error);
      });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Jabatan Baru</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Jabatan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama"}
                    className={"bg-body-tertiary"}
                    value={jabatan.nama}
                    name={"nama"}
                    onChange={(e) =>
                      jabatanChangeListener.onChangeText(e, jabatan, setJabatan)
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={jabatanValidator.get("nama")}
                  />
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Gaji Pokok</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Gaji Pokok"}
                    className={"bg-body-tertiary"}
                    value={jabatan.gajiPokok}
                    name={"gajiPokok"}
                    onChange={(e) =>
                      jabatanChangeListener.onChangeNumber(
                        e,
                        jabatan,
                        setJabatan
                      )
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={jabatanValidator.get("gajiPokok")}
                  />
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Tunjangan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Tunjangan"}
                    className={"bg-body-tertiary"}
                    value={jabatan.tunjangan}
                    name={"tunjangan"}
                    onChange={(e) =>
                      jabatanChangeListener.onChangeNumber(
                        e,
                        jabatan,
                        setJabatan
                      )
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={jabatanValidator.get("tunjangan")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button
              variant={"outline-secondary"}
              onClick={() => navigate("/jabatan")}
            >
              Batal
            </Button>
            <Button onClick={onJabatanCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageJabatanCreate;
