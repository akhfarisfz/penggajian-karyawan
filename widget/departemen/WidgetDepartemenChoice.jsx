import { Button, Card, Form, ListGroup, Pagination } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../src/libs/config/settings.js";

const WidgetDepartemenChoice = ({ callback }) => {
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

  const onDepartemenPagination = (page) => {
    onDepartemenList({ search: departemenSearch.current.value, page });
  };

  const onPilih = (departemen) => {
    callback(departemen);
  };

  useEffect(() => {
    onDepartemenList();
  }, []);

  return (
    <Card>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Form.Control
            ref={departemenSearch}
            onKeyDown={onDepartemenSearch}
            placeholder={"Search..."}
          />
        </ListGroup.Item>
        {daftarDepartemen.map((value, index) => (
          <ListGroup.Item
            key={index}
            className={"d-flex justify-content-between"}
          >
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
              onDepartemenPagination(daftarDepartemenPagination.totalPage)
            }
          />
        </Pagination>
      </Card.Footer>
    </Card>
  );
};

WidgetDepartemenChoice.propTypes = {
  callback: PropTypes.func,
};

export default WidgetDepartemenChoice;
