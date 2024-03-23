import {Button, Card, Form, ListGroup, Pagination} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import useHTTP from "../../src/libs/hooks/useHTTP.jsx";
import useJWT from "../../src/libs/hooks/useJWT.jsx";
import useMessage from "../../src/libs/hooks/useMessage.jsx";
import { BASE_URL } from "../../src/libs/config/settings.js";

const WidgetPotonganChoice = ({ callback }) => {
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

  const onPilih = (potongan) => {
    callback(potongan)
  }

  useEffect(() => {
    onPotonganList()
  }, []);

  return (
    <Card>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Form.Control
            ref={potonganSearch}
            onKeyDown={onPotonganSearch}
            placeholder={"Search..."}
          />
        </ListGroup.Item>
        {daftarPotongan.map((value, index) => (
          <ListGroup.Item key={index} className={"d-flex justify-content-between"}>
            <div>{value.nama}</div>
            <div>{value.potongan}</div>
            <Button size={"sm"} onClick={() => onPilih(value)}>Pilih</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

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
  )
}

WidgetPotonganChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetPotonganChoice;