
//Retrieves appointment info from state to use as props, uses state and day as params
export const getAppointmentsForDay = (state, day) => {
  console.log("here", state)
  try {
    return state.days
      .find((stateDay) => stateDay.name === day)
      .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
};

//Retrieves interviewers from state to use as props, uses state and day as params
export const getInterviewersForDay = (state, day) => {
  try {
    return state.days
      .find((stateDay) => stateDay.name === day)
      .interviewers.map((interviewerId) => state.interviewers[interviewerId]);
  } catch (err) {
    return [];
  }
};


//Retrieves interview from state to use as props, uses state and interview as params
export function getInterview(state, interview) {
  let newObject = {};
  if (interview && state.interviewers[interview.interviewer]) {
    newObject = {...interview};
    newObject.interviewer = state.interviewers[interview.interviewer];
  } else {
    newObject = null;
  }
  return newObject;
}
