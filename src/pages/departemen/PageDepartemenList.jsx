import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import { useEffect, useRef, useState } from "react";
import useMessage from "../../libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import useURLResolver from "../../libs/hooks/useURLResolver.jsx";
import { Link, json, useNavigate } from "react-router-dom";

const PageDepartemenList = () => {
  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarDepartemen, setDaftarDepartemen] = useState([]);
  const [daftarDepartemenPagination, setDaftarDepartemenPagination] = useState(
    {}
  );
  const departemenSearch = useRef({ value: "" });

  const onDepartemenList = (params) => {
    const url = `${BASE_URL}/departemen/`;

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        setDaftarDepartemenPagination(pagination);
        setDaftarDepartemen(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onDepartemenSearch = (e) => {
    if (e.key == "Enter") {
      onDepartemenList({ search: departemenSearch.current.value });
    }
  };
  //PRINT DISINI
  // const onPrintSlip = (id) => {
  //     const url = `${BASE_URL}/departemen/${id}/print/`;
  //     const config = {
  //       headers: {
  //         Authorization: jwt.get()
  //       },
  //     }

  //     http.privateHTTP.put(url, null, config).then((response) => {
  //       onDepartemenList()
  //       message.success(response)
  //     }).catch((error) => {
  //       message.error(error)
  //     })
  //   }
  const onDepartemenPagination = (page) => {
    onDepartemenList({ search: departemenSearch.current.value, page });
  };

  useEffect(() => {
    onDepartemenList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Departemen</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <Button onClick={() => navigate("create")}>
              Tambah Departemen
            </Button>
          </Col>
        </Row>
        <Row className={"mb-4"}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        ref={departemenSearch}
                        onKeyDown={onDepartemenSearch}
                        placeholder={"Search..."}
                        className={"w-50 bg-body-tertiary"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Departemen</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarDepartemen.map((value) => (
                    <tr key={value._id}>
                      <td>
                        <Link
                          to={`/departemen/detail/${value._id}`}
                          className={"text-decoration-none"}
                        >
                          {value._id}
                        </Link>
                      </td>
                      <td>{value.nama}</td>
                      {/* <td><Button onClick={() => onPrintSlip(value._id)} variant={"success"}>Print</Button></td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First
                    disabled={!daftarDepartemenPagination.previous}
                    onClick={() => onDepartemenPagination(1)}
                  />
                  {daftarDepartemenPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onDepartemenPagination(page.page)}
                      key={page.page}
                    >
                      {page.page}
                    </Pagination.Item>
                  ))}
                  <Pagination.Last
                    disabled={!daftarDepartemenPagination.next}
                    onClick={() =>
                      onDepartemenPagination(
                        daftarDepartemenPagination.totalPage
                      )
                    }
                  />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PageDepartemenList;
