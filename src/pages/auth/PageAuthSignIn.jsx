import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import {ContextApplication} from "../../libs/config/contexts.js";
import useValidator from "../../libs/hooks/useValidator.jsx";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageAuthSignIn = () => {
  const application = useContext(ContextApplication)
  const http = useHTTP();
  const jwt = useJWT();

  const [user, setUser] = useState({email: "", password: ""})
  const userChangeListener = useChangeListener();
  const userValidator = useValidator({email: [], password: []})


  const onSignIn = () => {
    userValidator.reset();

    http.publicHTTP.post(`${BASE_URL}/users/signin/`, user).then((response) => {
      jwt.set(response.data.token);
      application.setIsAuthenticated(true);
    }).catch((error) => {
      userValidator.except(error);
      console.log(error)
    })
  }

  return (
    <>
      <Container>
        <Row className={"d-flex justify-content-center vh-100 align-items-center"}>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Form.Group className={"mb-3"}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name={"email"}
                    value={user.email}
                    onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
                    type={"email"} />
                  <ComponentMessageValidation messages={userValidator.get('email')} />
                </Form.Group>
                <Form.Group className={"mb-4"}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name={"password"}
                    value={user.password}
                    onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
                    type={"password"} />
                  <ComponentMessageValidation messages={userValidator.get('password')} />
                </Form.Group>
                <Form.Group className={"mb-3 d-grid"}>
                  <Button size={"lg"} onClick={onSignIn}>Sign In</Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageAuthSignIn;