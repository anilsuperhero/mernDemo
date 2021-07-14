import React from "react";
import logo from "../../assets/images/seo.svg";
import { Row, Col, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #50663c 30%, #87c846 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #50663c",
  },
  label: {
    textTransform: "capitalize",
  },
});
const NotFound = (prop) => {
  const { show } = prop;
  const classes = useStyles();
  const handleClickAdd = () => {
    prop.handleFormClick({}, true);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <div className="text-center">
              <img src={logo} alt="notfound" className="p-5" width="200" />
              <h3>Sorry we couldn't find any data</h3>
              <Row className="text-center">
                <Col md={2} className="mt-3 mx-auto">
                  <div className="text-center">
                    {show && (
                      <Button
                        classes={{
                          root: classes.root,
                          label: classes.label,
                        }}
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => handleClickAdd()}
                      >
                        Create
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NotFound;
