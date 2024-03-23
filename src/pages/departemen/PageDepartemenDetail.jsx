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

const PageDepartemenDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [departemen, setDepartemen] = useState({
    namaDepartemen: ""
  })
  const departemenChangeListener = useChangeListener();
  const DepartemenValidator = useValidator({
    namaDepartemen: []
  });

  const onDepartemenUpdate = () => {
    DepartemenValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(`${BASE_URL}/departemen/${params.id}/`, departemen, config).then((response) => {
      message.success(response);
      navigate("/departemen")
    }).catch((error) => {
      message.error(error)
      DepartemenValidator.except(error)
    })
  }

  const onDepartemenDelete = () => {
    message.confirmRemove(() => {
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(`${BASE_URL}/departemen/${params.id}/`, config).then((response) => {
        message.success(response);
        navigate("/departemen")
      }).catch((error) => {
        message.error(error)
      })
    })
  }

  const onDepartemenDetail = () => {
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(`${BASE_URL}/departemen/${params.id}/`, config).then((response) => {
      setDepartemen(response.data)
    }).catch((error) => {
      message.error(error)
    })
  }

  useEffect(() => {
    if (params.id) {
      onDepartemenDetail()
    }
  }, [params.id]);
  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Departemen Detail</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Departemen</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Masukkan Nama Departemen"}
                    className={"bg-body-tertiary"}
                    value={departemen.nama}
                    name={"nama"}
                    onChange={(e) => departemenChangeListener.onChangeText(e, departemen, setDepartemen)}
                  />

                  <Form.Text>Harap form di isi dengan baik</Form.Text>

                  <ComponentMessageValidation messages={DepartemenValidator.get('nama')} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/departemen")}>Batal</Button>
            <Button variant={"outline-secondary"} onClick={onDepartemenDelete}>Hapus</Button>
            <Button onClick={onDepartemenUpdate}>Update</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageDepartemenDetail;