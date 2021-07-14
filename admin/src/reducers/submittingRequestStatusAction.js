import * as types from './actionsTypes'

// action creator
const submittingRequestStatus = (isSubmitting) => ({
  type: types.SUBMITTING_REQUEST_STATUS,
  isSubmitting,
});

export default submittingRequestStatus;
