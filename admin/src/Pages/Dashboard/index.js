import React, { useEffect } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card } from "react-bootstrap";
import Breadcrum from "../../Component/Breadcrum";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as settingActions from "../../actions/settingActions";

const Index = (props) => {
  const { title, dashboard, actions } = props;

  useEffect(() => {
    const fetchData = () => {
      actions.getDashboardData();
    };
    fetchData();
    document.title = title;
  }, [actions, title]);

  return (
    <>
      <Breadcrum title={title} />
      {dashboard.user && (
        <Aux>
          <Row className="dashboard_users pt-3">
            <Col xs={12} md={6} lg={3} sm={6}>
              <Card className="card-event">
                <Card.Body>
                  <h2 className="mt-2 f-w-300">{dashboard.totalClient}</h2>
                  <h6 className="text-muted mt-3 mb-0">
                    Number of registered clients.
                  </h6>
                  <i className="fas fa-users text-c-green f-50" />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3} sm={6}>
              <Card className="card-event">
                <Card.Body>
                  <h2 className="mt-2 f-w-300">{dashboard.totalAuditor}</h2>
                  <h6 className="text-muted mt-3 mb-0">
                    Number of registered auditors.
                  </h6>
                  <i className="fas fa-user-secret text-c-green f-50" />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3} sm={6}>
              <Card className="card-event">
                <Card.Body>
                  <h2 className="mt-2 f-w-300">{dashboard.createdAudit}</h2>
                  <h6 className="text-muted mt-3 mb-0">
                    Total number of audit requests created by all clients or
                    companies.
                  </h6>
                  <i className="fas fa-envelope-open text-c-info f-50" />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3} sm={6}>
              <Card className="card-event">
                <Card.Body>
                  <h2 className="mt-2 f-w-300">{dashboard.completedAudit}</h2>
                  <h6 className="text-muted mt-3 mb-0">
                    Total number of audit requests marked as completed.
                  </h6>
                  <i className="fas fa-sticky-note text-c-red f-50" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Aux>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(settingActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
