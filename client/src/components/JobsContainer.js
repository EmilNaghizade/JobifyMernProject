import { useEffect } from "react";

import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  const {
    getAllJobs,
    jobs,
    isLoading,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2 className="no-jobs">No jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* pagination and buttons */}
      {numOfPages > 1 && <PageBtnContainer></PageBtnContainer>}
    </Wrapper>
  );
};

export default JobsContainer;
