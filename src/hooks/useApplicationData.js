import { useEffect, useReducer } from "react";
import axios from "axios";
import { reducer } from "helpers/reducers";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const CANCEL_INTERVIEW = "CANCEL_INTERVIEW"
export const EDIT_INTERVIEW = "EDIT_INTERVIEW"



export function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
    
      });
  }

  function cancelInterview(id, interview) {
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: CANCEL_INTERVIEW, value: {id, interview}});
    });
  }

  function editInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: EDIT_INTERVIEW, value: {id, interview}});
    });
  }


  const setDay = (day) => dispatch({type:SET_DAY,
  value: day});
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          day: "Monday",
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);
  

  return {
    editInterview,
    bookInterview,
    cancelInterview,
    setDay,
    state,
  };
}
