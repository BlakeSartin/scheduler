

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


export const getInterviewersForDay = (state, day) => {
  try {
    return state.days
      .find((stateDay) => stateDay.name === day)
      .interviewers.map((interviewerId) => state.interviewers[interviewerId]);
  } catch (err) {
    return [];
  }
};



export function getInterview(state, interview) {
  let newObject = {};
  if (interview) {
    newObject = interview;
    newObject.interviewer = state.interviewers[interview.interviewer];
  } else {
    newObject = null;
  }
  return newObject;
}
