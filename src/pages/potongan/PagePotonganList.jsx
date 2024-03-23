import {Button, Card, Col, Container, Form, Pagination, Row, Table} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import {useEffect, useRef, useState} from "react";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useURLResolver from "../../libs/hooks/useURLResolver.jsx";
import {Link, useNavigate} from "react-router-dom";

const PagePotonganList = () => {

  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarPotongan, setDaftarPotongan] = useState([]);
  const [daftarPotonganPagination, setDaftarPotonganPagination] = useState({})
  const potonganSearch = useRef({value: ""})

  const onPotonganList = (params) => {
    const url = `${BASE_URL}/potongan/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setDaftarPotonganPagination(pagination);
      setDaftarPotongan(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  const onPotonganSearch = (e) => {
    if (e.key == 'Enter') {
        onPotonganList({search: potonganSearch.current.value})
    }
  }

  const onPotonganPagination = (page) => {
    onPotonganList({search: potonganSearch.current.value, page})
  }

  useEffect(() => {
    onPotonganList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Potongan</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <Button onClick={() => navigate("potongan")}>New Potongan</Button>
          </Col>
        </Row>
        <Row className={"mb-4"}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control ref={potonganSearch}
                                    onKeyDown={onPotonganSearch}
                                    placeholder={"Search..."}
                                    className={"w-50 bg-body-tertiary"} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Potongan</th>
                    <th>Potongan</th>
                </tr>
                </thead>
                <tbody>
                {daftarPotongan.map((value) => (
                  <tr key={value._id}>
                    <td>
                      <Link to={`/potongan/detail/${value._id}`} className={"text-decoration-none"}>{value._id}</Link>
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.potongan}%</td>
                  </tr>
                ))}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First disabled={!daftarPotonganPagination.previous}
                                    onClick={() => onPotonganPagination(1)} />
                  {daftarPotonganPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onPotonganPagination(page.page)}
                      key={page.page}>{page.page}</Pagination.Item>
                  ))}
                  <Pagination.Last disabled={!daftarPotonganPagination.next}
                                   onClick={() => onPotonganPagination(daftarPotonganPagination.totalPage)} />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePotonganList;