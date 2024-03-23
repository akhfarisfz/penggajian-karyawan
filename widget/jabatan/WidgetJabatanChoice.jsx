import { Button, Card, Form, ListGroup, Pagination } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../src/libs/config/settings.js";

const WidgetJabatanChoice = ({ callback }) => {
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

  const onPilih = (jabatan) => {
    callback(jabatan);
  };

  useEffect(() => {
    onJabatanList();
  }, []);

  return (
    <Card>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Form.Control
            ref={jabatanSearch}
            onKeyDown={onJabatanSearch}
            placeholder={"Search..."}
          />
        </ListGroup.Item>
        {daftarJabatan.map((value, index) => (
          <ListGroup.Item
            key={index}
            className={"d-flex justify-content-between"}
          >
            <div>{value.nama}</div>
            <div>{formatCurrency(value.gajiPokok)}</div>
            <div>{formatCurrency(value.tunjangan)}</div>

            <Button size={"sm"} onClick={() => onPilih(value)}>
              Pilih
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

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
  );
};

WidgetJabatanChoice.propTypes = {
  callback: PropTypes.func,
};

export default WidgetJabatanChoice;
