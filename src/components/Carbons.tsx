import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface CarbonCredit {
  projectId: string;
  projectName: string;
  description: string;
  projectManagerName: string;
  projectRegistrationDate: string;
  carbonCreditAmount: number;
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>;
  username: string;
}

const fetchCarbonCredits = async (): Promise<CarbonCredit[]> => {
  const BASE_URL = "http://localhost:8080";
  const response = await axios.get(`${BASE_URL}/api/projects`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token") || "",
    },
  });
  return response.data;
};

const Carbons: React.FC<Props> = ({ setLogin, username }) => {
  const [viewMode, setViewMode] = useState("Normal");
  const {
    data: carbonCredits = [],
    isLoading,
    isError,
  } = useQuery("carbonCredits", fetchCarbonCredits);
  const navigate = useNavigate();

  const handleToggleView = (mode: string) => {
    setViewMode(mode);
  };

  const handleCardClick = (credit: CarbonCredit) => {
    navigate(`/dashboard/project/${credit.projectId}`, { state: { credit } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <section>
      <div className="flex items-center justify-between my-5">
        <h1 className="text-2xl font-bold">Carbon Credits</h1>
        <ul className="flex space-x-2">
          <li>
            <button
              className={`p-2 rounded-md px-4 hover:bg-slate-300 ${viewMode === "Normal" ? "bg-green-500" : "bg-slate-200"
                }`}
              onClick={() => handleToggleView("Normal")}
            >
              Normal
            </button>
          </li>
          <li>
            <button
              className={`p-2 rounded-md px-4 hover:bg-slate-300 ${viewMode === "Compact" ? "bg-green-500" : "bg-slate-200"
                }`}
              onClick={() => handleToggleView("Compact")}
            >
              Compact
            </button>
          </li>
        </ul>
      </div>

      <main>
        <div
          className={`grid ${viewMode === "Normal" ? "grid-cols-3" : "grid-cols-2"
            } gap-5 my-5`}
        >
          {carbonCredits.map((credit) => (
            <div
              key={credit.projectId}
              onClick={() => handleCardClick(credit)}
              style={{ cursor: "pointer" }}
              className=" bg-white  rounded-md "
            >
              {viewMode === "Normal" ? (
                <NormalCard credit={credit} />
              ) : (
                <CompactCard credit={credit} />
              )}
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

const NormalCard: React.FC<{ credit: CarbonCredit }> = ({ credit }) => {
  return (
    <div className="min-w-[350px] p-5 space-y-1 flex flex-col justify-between rounded-md h-full">
      <div className="flex-grow">
        <h2 className="text-xl font-bold py-2">{credit.projectName}</h2>
        <p className="line-clamp-3">{credit.description}</p>
      </div>
      <div className="h-[200px] bg-gray-200 flex items-center justify-center rounded">
        <img className="opacity-20" alt="Image" />
      </div>
      <div className="flex justify-between text-sm pt-2">
        <span className="text-orange-500">
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          By {credit.projectManagerName}
        </span>
        <span className="text-gray-500">
          {moment(credit.projectRegistrationDate).format("MMMM Do, YYYY")}
        </span>
      </div>
    </div>
  );
};

const CompactCard: React.FC<{ credit: CarbonCredit }> = ({ credit }) => {
  return (
    <div className=" p-3 flex justify-between">
      <div className="w-3/5">
        <h2 className="text-xl font-bold p-2">{credit.projectName}</h2>
        <p className=" text-justify  line-clamp-3 px-2">{credit.description}</p>
      </div>
      <div className="flex flex-col text-sm justify-evenly">
        <span className="text-orange-500">
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          By {credit.projectManagerName}
        </span>
        <span>
          {moment(credit.projectRegistrationDate).format("MMMM Do, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default Carbons;
