import { axiosInstance, axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const registerUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-up', data), dispatch);

const loginUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-in', data), dispatch);

const logoutUser = (dispatch) => handleAPICall(axiosInstance.post('/user/sign-out'), dispatch);

const getDetailsUser = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getUsers = (params, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/user/get-all', {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateUser = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/user/update/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const deleteUser = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/user/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const refreshToken = (refreshToken, dispatch) =>
  handleAPICallWithoutToast(
    axiosInstance.post(
      '/user/refresh-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    ),
    dispatch
  );

const changePassword = (id, payload, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/user/change-password/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const getPassword = (payload, dispatch) => {
  return handleAPICall(axiosInstance.post('/user/get-password', payload), dispatch);
};

const resetPassword = (payload, dispatch) => {
  return handleAPICall(axiosInstance.post('/user/reset-password', payload), dispatch);
};

const sendVerifyEmail = (payload, dispatch) => {
  return handleAPICall(axiosInstance.post('/user/send-verify-email', payload), dispatch);
};

const verifyEmail = (payload, dispatch) => {
  return handleAPICall(axiosInstance.post('/user/verify-email', payload), dispatch);
};

const UserService = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUsers,
  getDetailsUser,
  refreshToken,
  changePassword,
  getPassword,
  resetPassword,
  sendVerifyEmail,
  verifyEmail,
};

export default UserService;
