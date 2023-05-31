import { makeApiRequest } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingAction";
import { toast } from "react-toastify";
import {
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
  SAVE_REGISTER_DATA,
  LOGOUT,
} from "./registerActionTypes";

export const fetchRegisterRequest = () => ({
  type: FETCH_REGISTER_REQUEST,
});
export const fetchRegisterSuccess = (data) => ({
  type: FETCH_REGISTER_SUCCESS,
  payload: data,
});
export const fetchRegisterFailure = (error) => ({
  type: FETCH_REGISTER_FAILURE,
  payload: error,
});
export const logOut = () => ({
  type: LOGOUT,
});

export const saveRegisterData = (data) => ({
  type: SAVE_REGISTER_DATA,
  payload: data,
});

export const fetchRegisterData = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(fetchRegisterRequest());
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/register",
        method: "POST",
        data,
      });
      if (response.status === 200) {
        let res = response.data;
        navigate("/login");
        dispatch(fetchRegisterSuccess(res));
        dispatch(stopLoading());
      }
    } catch (error) {
      dispatch(fetchRegisterFailure(error));
      toast.error(error?.message || "Something went wrong");
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const userLogOut = () => {
  return async (dispatch) => {
    dispatch(logOut());
  };
};
export const userVerify = (token) => {
  return async (dispatch) => {
    const headers = {
      token: `Bearer ${token}`,
      common: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch(startLoading());
      const response = await makeApiRequest({
        endpoint: "/verify-email",
        method: "POST",
        headers,
      });
      if (response.status === 200) {
        dispatch(stopLoading());
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch(stopLoading());
    }
  };
};
