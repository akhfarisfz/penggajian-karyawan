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

const PageJabatanList = () => {
  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarJabatan, setDaftarJabatan] = useState([]);
  const [daftarJabatanPagination, setDaftarJabatanPagination] = useState({});
  const jabatanSearch = useRef({ value: "" });

  const onJabatanList = (params) => {
    const url = `${BASE_URL}/jabatan/`;

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
        setDaftarJabatanPagination(pagination);
        setDaftarJabatan(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onJabatanSearch = (e) => {
    if (e.key == "Enter") {
      onJabatanList({ search: jabatanSearch.current.value });
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  const onJabatanPagination = (page) => {
    onJabatanList({ search: jabatanSearch.current.value, page });
  };

  useEffect(() => {
    onJabatanList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Jabatan</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <Button onClick={() => navigate("new")}>Tambah Jabatan</Button>
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
                        ref={jabatanSearch}
                        onKeyDown={onJabatanSearch}
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
                    <th>Nama Jabatan</th>
                    <th>Gaji Pokok</th>
                    <th>Tunjangan</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarJabatan.map((value) => (
                    <tr key={value._id}>
                      <td>
                        <Link
                          to={`/jabatan/detail/${value._id}`}
                          className={"text-decoration-none"}
                        >
                          {value._id}
                        </Link>
                      </td>
                      <td>{value.nama}</td>
                      <td>{formatCurrency(value.gajiPokok)}</td>
                      <td>{formatCurrency(value.tunjangan)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer>
                <Pagination>
                  <Pagination.First
                    disabled={!daftarJabatanPagination.previous}
                    onClick={() => onJabatanPagination(1)}
                  />
                  {daftarJabatanPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onJabatanPagination(page.page)}
                      key={page.page}
                    >
                      {page.page}
                    </Pagination.Item>
                  ))}
                  <Pagination.Last
                    disabled={!daftarJabatanPagination.next}
                    onClick={() =>
                      onJabatanPagination(daftarJabatanPagination.totalPage)
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
export default PageJabatanList;
