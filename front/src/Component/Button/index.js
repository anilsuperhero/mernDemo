import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const Index = (props) => {
  const { title, isSubmitting } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      fullWidth
      type="submit"
      disabled={isSubmitting ? true : false}
      className="login-btn green-bg"
    >
      {isSubmitting ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
          ></span>
        </>
      ) : (
        <>{title}</>
      )}
    </Button>
  );
};

function mapStateToProps(state) {
  return {
    isSubmitting: state.isSubmitting,
  };
}

export default connect(mapStateToProps)(Index);
