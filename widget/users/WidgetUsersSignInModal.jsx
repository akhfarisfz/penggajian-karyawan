import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
// import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";
import {useContext, useState} from "react";
import ComponentMessageValidation from '../../src/libs/components/ComponentMessageValidation.jsx';
import { BASE_URL } from '../../src/libs/config/settings.js';
import { ContextApplication } from '../../src/libs/config/contexts.js';
import useJWT from '../../src/libs/hooks/useJWT.jsx';
import useHTTP from '../../src/libs/hooks/useHTTP.jsx';
import useMessage from '../../src/libs/hooks/useMessage.jsx';
import useChangeListener from '../../src/libs/hooks/useChangeListener.jsx';
import useValidator from '../../src/libs/hooks/useValidator.jsx';

const userInit = {
  email: "",
  password: ""
}

const userValidatorInit = {
  email: [],
  password: []
}

const WidgetUsersSignInModal = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [user, setUser] = useState(userInit);
  const userValidator = useValidator(userValidatorInit);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const signIn = () => {
  //   usersValidator.reset();

  //   const url = `${BASE_URL}/users/signin/`;
  //   http.publicHTTP.post(url, users)
  //     .then((response) => {
  //       jwt.set(response.data.access);
  //       application.setIsAuthenticated(true);
  //       message.success(response)
  //     })
  //     .catch((error) => {
  //       message.error(error);
  //       usersValidator.except(error)
  //     });
  // }

  const signIn = () => {
    userValidator.reset();

    http.publicHTTP.post(`${BASE_URL}/users/signin/`, user).then((response) => {
      jwt.set(response.data.token);
      application.setIsAuthenticated(true);
      message.success(response)
    }).catch((error) => {
      userValidator.except(error);
      console.log(error)
    })
  }

  return (
    <>
      <Modal
        show={!application.isAuthenticated}
        onHide={handleClose}
        centered={true}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className={"mb-3"}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name={"email"}
              value={user.email}
              onChange={e => changeListener.onChangeText(e, user, setUser)}
            />
            <ComponentMessageValidation messages={userValidator.get('email')} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name={"password"}
              type={"password"}
              value={user.password}
              onChange={e => changeListener.onChangeText(e, user, setUser)}
            />
            <ComponentMessageValidation messages={userValidator.get('password')} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default WidgetUsersSignInModal;