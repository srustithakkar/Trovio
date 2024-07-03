import React from "react";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import moment from "moment";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface CarbonCredit {
  projectId: string;
  projectName: string;
  description: string;
  projectManagerName: string;
  projectRegistrationDate: string;
  carbonCreditAmount: number;
}

interface LocationState {
  credit: CarbonCredit;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;

  if (!state?.credit) {
    return <Navigate to="/dashboard" />;
  }

  const credit = state.credit;

  return (
    <>
      <div className="flex items-center py-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2 p-2 w-5 h-5"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold">{credit.projectName}</h1>
      </div>
      <div className="max-w-screen-xl m-auto p-5 flex gap-[20px] bg-white rounded">
        <div className="h-[300px] w-2/3  bg-gray-200 flex items-center justify-center rounded my-5">
          <span className="opacity-20">Img Placeholder</span>
        </div>
        <div className="my-5 ">
          <p className="text-lg">{credit.description}</p>
          <div className="flex justify-between text-sm">
            <span className="text-orange-500">
              <FontAwesomeIcon icon={faUser} className="px-2" />
              By {credit.projectManagerName}
            </span>
            <span>
              {moment(credit.projectRegistrationDate).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div className="text-lg mt-5">
            <p>Carbon Credit Amount: {credit.carbonCreditAmount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
