import {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, CANCEL_INTERVIEW, EDIT_INTERVIEW} from "hooks/useApplicationData"



function numOfSpots (increment, state) {
  console.log("spots")
  let stateDay = state.days.find((day) => day.name === state.day);
  let newDay = { ...stateDay, spots: stateDay.spots + increment };
  return state.days.map((day) => (day.name === state.day ? newDay : day));
};

export function reducer(state, action) {
  console.log("action",action)
  console.log("state", state)
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, 
        day: action.value
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        day: action.value.day,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers,
      };
    case SET_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.value.id]: {
          ...state.appointments[action.value.id],
          interview: { ...action.value.interview },
        },
      };
      let days = numOfSpots(-1, state);
      return {
        ...state,
        appointments,
        days,
      };
    }
    case CANCEL_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.value.id]: {
          ...state.appointments[action.value.id],
          interview: { ...action.value.interview },
        },
      };
      let days = numOfSpots(1, state);
      return {
        ...state,
        appointments,
        days,
      };
    }
    case EDIT_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.value.id]: {
          ...state.appointments[action.value.id],
          interview: { ...action.value.interview },
        },
      };
      let days = numOfSpots(0, state);
      return {
        ...state,
        appointments,
        days,
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
