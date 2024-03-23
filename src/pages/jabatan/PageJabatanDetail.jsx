import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import { useEffect, useState } from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageJabatanDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const jabatanChangeListener = useChangeListener();

  const [jabatan, setJabatan] = useState({
    nama: "",
    gajiPokok: 0,
    tunjangan: 0,
  });

  const jabatanValidator = useValidator({
    nama: [],
    gajiPokok: [],
    tunjangan: [],
  });

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  const onJabatanUpdate = () => {
    jabatanValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .put(`${BASE_URL}/jabatan/${params.id}/`, jabatan, config)
      .then((response) => {
        message.success(response);
        navigate("/");
      })
      .catch((error) => {
        message.error(error);
        jabatanValidator.except(error);
      });
  };

  const onJabatanDelete = () => {
    message.confirmRemove(() => {
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .delete(`${BASE_URL}/jabatan/${params.id}/`, config)
        .then((response) => {
          message.success(response);
          navigate("/");
        })
        .catch((error) => {
          message.error(error);
        });
    });
  };

  const onJabatanDetail = () => {
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(`${BASE_URL}/jabatan/${params.id}/`, config)
      .then((response) => {
        setJabatan(response.data);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    // panggil fungsi detail barang
    if (params.id) {
      onJabatanDetail();
    }
  }, [params.id]);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Jabatan Detail</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Jabatan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={jabatan.nama}
                    name={"jabatan"}
                    onChange={(e) =>
                      jabatanChangeListener.onChangeText(e, jabatan, setJabatan)
                    }
                  />
                </Form.Group>
                <Card.Subtitle className={"mb-3"}>Gaji Pokok</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama Gaji Pokok"}
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
                <Card.Subtitle className={"mb-3"}>Tunjangan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Tunjangan"}
                    className={"bg-body-tertiary"}
                    value={jabatan.tunjangan}
                    name={"tunjangan"}
                    onChange={(e) =>
                      departemenChangeListener.onChangeNumber(
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
            <Button variant={"outline-secondary"} onClick={() => navigate("/")}>
              Batal
            </Button>
            <Button variant={"outline-secondary"} onClick={onJabatanDelete}>
              Hapus
            </Button>
            <Button onClick={onJabatanUpdate}>Update</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageJabatanDetail;
