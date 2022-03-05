import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Error from "./Error";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }
  
  function confirm() {
    transition(CONFIRM);
  }

  function edit(name, interviewer) {
    transition(SAVING);
    props
      .editInterview(props.id, { student: name, interviewer })
      .then((response) => {transition(SHOW)
      })
      .catch((error) => transition(ERROR_SAVE, true))
  }

  function cancel(name, interviewer) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log("error")
        transition(ERROR_DELETE, true)});
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && props.interview &&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status replace={true} message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={cancel} />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interview ? props.interview.interviewer.id : props.interviewer}
          student={props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={edit}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Couldnt delete" onClose={back} />
      )}
       {mode === ERROR_SAVE && (
        <Error message="Couldnt save" onClose={back} />
      )}
    </article>
  );
}
