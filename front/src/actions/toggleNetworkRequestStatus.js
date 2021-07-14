import * as types from "./actionsTypes";

// action creator
const toggleNetworkRequestStatus = (isFetching) => ({
  type: types.NETWORK_REQUEST_STATUS,
  isFetching,
});

export default toggleNetworkRequestStatus;
