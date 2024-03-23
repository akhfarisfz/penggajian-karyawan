import { Button, Card, Form, ListGroup, Pagination } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../src/libs/config/settings.js";

const WidgetKaryawanChoice = ({ callback }) => {
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

  const onDepartemenPagination = (page) => {
    onKaryawanList({ search: karyawanSearch.current.value, page });
  };

  const onPilih = (karyawan) => {
    callback(karyawan);
  };

  useEffect(() => {
    onKaryawanList();
  }, []);

  return (
    <Card>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Form.Control
            ref={karyawanSearch}
            onKeyDown={onKaryawanSearch}
            placeholder={"Search..."}
          />
        </ListGroup.Item>
        {daftarKaryawan.map((value, index) => (
          <ListGroup.Item
            key={index}
            className={"d-flex justify-content-between"}
          >
            <div>{value.nik}</div>
            <div>{value.nama}</div>

            <Button size={"sm"} onClick={() => onPilih(value)}>
              Pilih
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card.Footer>
        <Pagination>
          <Pagination.First
            disabled={!daftarKaryawanPagination.previous}
            onClick={() => onDepartemenPagination(1)}
          />
          {daftarKaryawanPagination?.pages?.map((page) => (
            <Pagination.Item
              onClick={() => onDepartemenPagination(page.page)}
              key={page.page}
            >
              {page.page}
            </Pagination.Item>
          ))}
          <Pagination.Last
            disabled={!daftarKaryawanPagination.next}
            onClick={() =>
              onDepartemenPagination(daftarKaryawanPagination.totalPage)
            }
          />
        </Pagination>
      </Card.Footer>
    </Card>
  );
};

WidgetKaryawanChoice.propTypes = {
  callback: PropTypes.func,
};

export default WidgetKaryawanChoice;
