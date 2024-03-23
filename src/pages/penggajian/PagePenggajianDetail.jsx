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

const PagePenggajianDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [penggajian, setPenggajian] = useState({
    karyawanref: "",
    periodeGajiBulan: 0,
  });
  const penggajianChangeListener = useChangeListener();
  const penggajianValidator = useValidator({
    karyawanref: [],
    periodeGajiBulan: [],
  });

  //   const onPenggajianUpdate = () => {
  //     penggajianValidator.reset();

  //     const config = {
  //       headers: {
  //         Authorization: jwt.get(),
  //       },
  //     };

  //     http.privateHTTP
  //       .put(`${BASE_URL}/penggajian/${params.id}/`, penggajian, config)
  //       .then((response) => {
  //         message.success(response);
  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         message.error(error);
  //         penggajianValidator.except(error);
  //       });
  //   };

  const onPenggajianDelete = () => {
    message.confirmRemove(() => {
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .delete(`${BASE_URL}/penggajian/${params.id}/`, config)
        .then((response) => {
          message.success(response);
          navigate("/");
        })
        .catch((error) => {
          message.error(error);
        });
    });
  };

  const onPenggajianDetail = () => {
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(`${BASE_URL}/penggajian/${params.id}/`, config)
      .then((response) => {
        setPenggajian(response.data);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    // panggil fungsi detail barang
    if (params.id) {
      onPenggajianDetail();
    }
  }, [params.id]);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Penggajian Detail</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>
                  Nama Penggajian
                </Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    className={"bg-body-tertiary"}
                    value={penggajian.karyawanref}
                    name={"nik"}
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
                    placeholder={"Masukkan Nama Periode"}
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
                    messages={penggajianValidator.get("periodeGajiBulan")}
                  />
                </Form.Group>
                {JSON.stringify(penggajian)}
              </Card.Body>
              {/* <Card.Body>
                <Card.Subtitle className={"mb-3"}>Potongan</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Jumlah Potongan"}
                    className={"bg-body-tertiary"}
                    value={karyawan.potongan}
                    name={"potongan"}
                    onChange={(e) => potonganChangeListener.onChangeText(e, potongan, setPotongan)}
                  />
                  <Form.Text>Harap form di isi dengan baik</Form.Text>
                  <ComponentMessageValidation messages={potonganValidator.get('potongan')} />
                </Form.Group>
              </Card.Body> */}
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
            <Button variant={"outline-secondary"} onClick={onPenggajianDelete}>
              Hapus
            </Button>
            <Button onClick={onPenggajianUpdate}>Update</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PagePenggajianDetail;
