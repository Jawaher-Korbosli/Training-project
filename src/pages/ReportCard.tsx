import React, { useState, useEffect } from "react";


import {
  getReportCardFunction,
  updateReportCardFunction,
  isTeacherFunction
} from "../api/web3";
import "./ReportCard.css";
import Swal from "sweetalert2";
import store from "../redux/store";
// import 'sweetalert2/src/sweetalert2.scss'
import ReactModal from "react-modal";
const ReportCard = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [Matter, setMatter] = useState("");
  const [grade, setGrade] = useState("");
  const [periode, setPeriode] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [sohwModal,setShowModal]=useState(false);
  const [Student, setStudent] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [dateReportCard, setDateReportCard] = useState("");
  const [code, setCode] = useState("");
  const previewStyle = {
    height: 240
  };
  const customStyles = {
 
    content: {
     
      // padding: "30px 100px 20px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-30%",
       transform: "translate(-50%, -50%)",
      
    }
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  const getBlockReportCard = () => {
    if (!code) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please verify your code!"
      });
    }
    getReportCardFunction(Number(code), (error, response) => {
      if (error) 
      {console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please verify your code!"
        });
      }
      else { 
      
     
        const decrypted = JSON.parse(JSON.parse(response));
        setDateReportCard(decrypted.date);
        setStudent(decrypted.student);
        setDateNaissance(decrypted.dateNaissance);
        setMatter(decrypted.matter);
        setGrade(decrypted.grade);
        setPeriode(decrypted.periode);

        setShowInput(true);
        console.log(decrypted + "decrypt");
      }
    });
  };

  const updateReportCard = () => {
    setShowModal(true)
    const ReportCard = {
      date: dateReportCard,
      student: Student,
      dateNaissance: dateNaissance,
      matter: Matter,
      grade: grade,
      periode: periode
    };
    const stringReportCard = JSON.stringify(ReportCard);
    updateReportCardFunction(
      stringReportCard,
      Number(code),
      (error, response) => {
        if (error) console.error(error);
        else
        {
          Swal.fire("Success!", "ReportCard successfully modified!", "success");
          setShowModal(false)
      }}
    );
  };

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };
  useEffect(() => {
    let state = store.getState();
    if (state.user && state.user.address) {
      isTeacherFunction(state.user.address, (isSuccess: any, error: any) => {
        if (isSuccess == true) {
          setIsTeacher(true);
        } else {
          window.location.assign("#/");
        }
      });
    } else {
      window.location.assign("#/");
    }
  });
  return isTeacher ? (
    <div className="ReportCard">
      <ReactModal
    
    isOpen={sohwModal}
    contentLabel="Request sent"
     style={customStyles}
  >
    <div>
      <p className="modalPara"> Waiting for validation of the transaction </p>
      <img src="loading.gif" alt="" />
    </div>
  </ReactModal>
      <div className="cardPh">
        <h2 className="title">ReportCard</h2>
        <div className="form-row">
          <label htmlFor="code" className="col-md-6">
          Enter Your Code
          </label>
          <input
            type="number"
            id="code"
            value={code}
            onChange={handleCodeChange}
            className="col-md-6"
          />
        </div>
        
      

        {code && (
          <>
            <button onClick={getBlockReportCard}>Get ReportCard</button>
          </>
        )}

        {showInput && (
          <>
            <div className="form-row">
              <label htmlFor="dateReportCard" className="col-md-6">
              Report card date
              </label>
              <input
                type="text"
                id="dateReportCard"
                className="col-md-6"
                value={dateReportCard}
                onChange={event => {
                  setDateReportCard(event.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="dateReportCard" className="col-md-6">
              First and last name of student
              </label>
              <input
                type="text"
                id="dateReportCard"
                className="col-md-6"
                value={Student}
                onChange={event => {
                  setStudent(event.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="dateReportCard" className="col-md-6">
              Date of birth
              </label>
              <input
                type="text"
                id="dateReportCard"
                className="col-md-6"
                value={dateNaissance}
                onChange={event => {
                  setDateNaissance(event.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="Matter" className="col-md-6">
              Matter
              </label>
              <input
                type="text"
                id="Matter"
                className="col-md-6"
                value={Matter}
                onChange={event => {
                  setMatter(event.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="grade" className="col-md-6">
              Grade
              </label>
              <input
                type="text"
                id="grade"
                className="col-md-6"
                value={grade}
                onChange={event => {
                  setGrade(event.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="periode" className="col-md-6">
              Period
              </label>
              <input
                type="text"
                id="periode"
                className="col-md-6"
                value={periode}
                onChange={event => {
                  setPeriode(event.target.value);
                }}
              />
            </div>

            <button onClick={() => updateReportCard()}>Update</button>
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default ReportCard;
