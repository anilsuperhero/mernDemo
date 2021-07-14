import React from "react";
import Breadcrumb from "../../Component/Breadcrumb";

const Index = (props) => {
  return (
    <>
      <Breadcrumb {...props} />
      <div className="right-contant">
        <div className="process-detail">
          <h3 className="page-sm-title">Dashboard</h3>
          <div className="block-outer">
            <h4 className="small-title">Details of in Process Audit</h4>
            <div className="detail-process">
              <ul>
                <li>
                  <h6>Audit Number:</h6>#A0000001
                </li>
                <li>
                  <h6>Current Stage:</h6>SLA\Deposit is Pending
                </li>
                <li>
                  <h6>Next Step:</h6>Admin Assign Author
                </li>
                <li>
                  <h6>Expected Completion Date:</h6> 30 June 2021
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="audit-process">
          <div className="block-outer">
            <h4 className="small-title">Audit Process</h4>
            <div className="audit-process-number">----</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
