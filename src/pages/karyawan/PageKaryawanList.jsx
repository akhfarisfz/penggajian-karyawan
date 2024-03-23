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
import { Link, useNavigate } from "react-router-dom";
import WidgetKaryawanCreateModal from "../../../widget/karyawan/WidgetKaryawanCreateModal.jsx";

const PageKaryawanList = () => {
  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarKaryawan, setDaftarKaryawan] = useState([]);
  const [daftarKaryawanPagination, setDaftarKaryawanPagination] = useState({});
  const karyawanSearch = useRef({ value: "" });

  const onKaryawanList = (params) => {
    const url = `${BASE_URL}/karyawan/`;
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
        setDaftarKaryawanPagination(pagination);
        setDaftarKaryawan(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onKaryawanSearch = (e) => {
    if (e.key == "Enter") {
      onKaryawanList({ search: karyawanSearch.current.value });
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  const onKaryawanPagination = (page) => {
    onKaryawanList({ search: karyawanSearch.current.value, page });
  };

  useEffect(() => {
    onKaryawanList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Karyawan</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <WidgetKaryawanCreateModal callback={onKaryawanList} />
            {/* <Button onClick={() => navigate("new")}>New Karyawan</Button> */}
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
                        ref={karyawanSearch}
                        onKeyDown={onKaryawanSearch}
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
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Departemen</th>
                    <th>Gaji Pokok</th>
                    <th>Tunjangan</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {daftarKaryawan.map((value) => (
                    <tr key={value._id}>
                      <td>
                        <Link
                          to={`/detail/${value._id}`}
                          className={"text-decoration-none"}
                        >
                          {value._id}
                        </Link>
                      </td>
                      <td>{value.nik}</td>
                      <td>{value.nama}</td>
                      <td>{value.jabatan.nama}</td>
                      <td>{value.departemen.nama}</td>
                      <td>{formatCurrency(value.jabatan.gajiPokok)}</td>
                      <td>{formatCurrency(value.jabatan.tunjangan)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First
                    disabled={!daftarKaryawanPagination.previous}
                    onClick={() => onKaryawanPagination(1)}
                  />
                  {daftarKaryawanPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onKaryawanPagination(page.page)}
                      key={page.page}
                    >
                      {page.page}
                    </Pagination.Item>
                  ))}
                  <Pagination.Last
                    disabled={!daftarKaryawanPagination.next}
                    onClick={() =>
                      onKaryawanPagination(daftarKaryawanPagination.totalPage)
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

export default PageKaryawanList;
