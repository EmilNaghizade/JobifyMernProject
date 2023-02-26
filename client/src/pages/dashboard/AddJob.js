import { useNavigate } from "react-router-dom";

import { Alert, FormRow, FormSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    displayAlert,
    showAlert,
    position,
    company,
    jobLocation,
    jobType,
    status,
    statusOptions,
    jobTypeOptions,
    isEditing,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
    setTimeout(()=> {
      navigate("/all-jobs");
    },2000)
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? " edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* job location */}
          <FormRow
            type="text"
            labelText={"Job location"}
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <FormSelect
            name="jobType"
            labelText={"Job type"}
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* job status */}
          <FormSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-bnt"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>

            <button
              className="btn btn-block clear-btn"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
