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

const PagePenggajianCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [penggajian, setPenggajian] = useState({});
  const penggajianChangeListener = useChangeListener();
  const penggajianValidator = useValidator([]);

  const onPenggajianCreate = () => {
    penggajianValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(`${BASE_URL}/penggajian/`, penggajian, config)
      .then((response) => {
        message.success(response);
        navigate("/penggajian");
      })
      .catch((error) => {
        message.error(error);
        penggajianValidator.except(error);
      });
  };

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>New Penggajian</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>
                  ID
                </Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama"}
                    className={"bg-body-tertiary"}
                    value={penggajian.karyawanref}
                    name={"karyawanref"}
                    onChange={(e) =>
                      penggajianChangeListener.onChangeText(
                        e,
                        penggajian,
                        setPenggajian
                      )
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={penggajianValidator.get("karyawanref")}
                  />
                </Form.Group>
                <Card.Subtitle className={"mb-3"}>Periode Gaji</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Periode Gaji"}
                    className={"bg-body-tertiary"}
                    value={penggajian.periodeGajiBulan}
                    name={"periodeGajiBulan"}
                    onChange={(e) =>
                      penggajianChangeListener.onChangeText(
                        e,
                        penggajian,
                        setPenggajian
                      )
                    }
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation
                    messages={penggajianValidator.get("karyawanref")}
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
              onClick={() => navigate("/penggajian")}
            >
              Batal
            </Button>
            <Button onClick={onPenggajianCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PagePenggajianCreate;
