import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import QRCode from "qrcode";
import { addReportCardFunction, isTeacherFunction } from "../api/web3";
import "./Teacher.css";
import Swal from "sweetalert2";
import store from "../redux/store";
import ReactModal from "react-modal";
const Teacher = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [dateReportCard, setDateReportCard] = useState("");
  const [sohwModal, setShowModal] = useState(false);
  const [activeAjout, setactiveAjout] = useState(true);
  const [activePrint, setactivePrint] = useState(true);

  const customStyles = {
    content: {
      // padding: "30px 100px 20px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-30%",
      transform: "translate(-50%, -50%)",
    },
  };


  const handleChange = (event: any) => {
    if (event.target.name == "dateReportCard") {
      setDateReportCard(event.target.value);
    } else if (event.target.name == "nameStudent") {
      setNomStudent(event.target.value);
    } else if (event.target.name == "dateNaissance") {
      setDateNaissance(event.target.value);
    } else if (event.target.name == "matter") {
      setMatter(event.target.value);
    } else if (event.target.name == "grade") {
      setGrade(event.target.value);
    } else if (event.target.name == "periode") {
      setPeriode(event.target.value);
    }
  };

  const [nomStudent, setNomStudent] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [nomMatter, setMatter] = useState("");
  const [code, setCode] = useState("");
  const [gradeMatter, setGrade] = useState("");
  const [periodeMatter, setPeriode] = useState("");

  const [id, setId] = useState("79948087976a297cda296d35efaf9a5eaea57528");


  const convertisseurStringToJson = () => {
    if (
      !nomMatter ||
      !gradeMatter ||
      !periodeMatter ||
      !dateNaissance ||
      !nomStudent ||
      !dateReportCard
    ) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill in the ReportCard fields!",
      });
    } else {
      setShowModal(true);
      //const id = generateId(40);

      const ReportCard = {
        date: dateReportCard,
        student: nomStudent,
        dateNaissance: dateNaissance,
        matter: nomMatter,
        grade: gradeMatter,
        periode: periodeMatter,
      };
      const stringReportCard = JSON.stringify(ReportCard);

      const encrypted = CryptoJS.AES.encrypt(stringReportCard, id);

      addReportCardFunction(encrypted.toString(), (error, response) => {
        if (error) {
          console.log("error" + error);
          setShowModal(false);
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: "An error occurred while adding the ReportCard!",
          });
        } else if (response) {
          var genereCode = response.replace(/^"(.+)"$/, "$1");
          setCode(genereCode);
          setShowModal(false);

          setactivePrint(false);



          Swal.fire(
            "ReportCard a été ajouté avec succès!",
            genereCode,
            "success"
          );
        }
      });
    }
  };
  const showReportCard = () => {

    window.location.assign('#/ReportCard')

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

    if (
      nomMatter &&
      gradeMatter &&
      periodeMatter &&
      dateNaissance &&
      nomStudent &&
      dateReportCard
    ) {
      setactiveAjout(false);
    } else {
      setactiveAjout(true);
    }
  });

  return isTeacher ? (
    <div className="Teacher">
      <div className="Modal">
        <ReactModal
          isOpen={sohwModal}
          contentLabel="Request sent"
          style={customStyles}
        >
          <div>
            <p className="modalPara">
              {" "}
              Waiting for validation of the transaction
            </p>
            <img src="loading.gif" alt="" />
          </div>
        </ReactModal>
      </div>
      <div className="cardReport">
        <h2 className="title">Teacher</h2>
        <div className="form-row">
          <label htmlFor="Date" className="col-md-6">
            {/* Date de ReportCard */}
            ReportCard date
          </label>
          <input
            type="text"
            id="Date"
            name="dateReportCard"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="student" className="col-md-6">
            First and last name of student
          </label>
          <input
            name="nameStudent"
            type="text"
            id="student"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="DateNaissance" className="col-md-6">
            Date of birth
          </label>
          <input
            name="dateNaissance"
            type="text"
            id="DateNaissance"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="matter" className="col-md-6">
            Matter
          </label>
          <input
            name="matter"
            type="text"
            id="matter"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="grade" className="col-md-6">
            grade
          </label>
          <input
            name="grade"
            type="text"
            id="grade"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="periode" className="col-md-6">
            Period
          </label>
          <input
            name="periode"
            type="text"
            id="periode"
            className="col-md-6"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              onClick={convertisseurStringToJson}
              disabled={activeAjout}
              className={
                !activeAjout ? "btnadressValide" : "btnadressNonValide"
              }
            >
              generate ReportCard
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={showReportCard}
              disabled={activePrint}
              className={
                !activePrint ? "btnadressValide" : "btnadressNonValide"
              }
            >
              see the report card{" "}
            </button>


          </div>
        </div>
        {code &&
          <div className="form-row">
            <label className="code col-md-6">
              The id of report card :  {code}
            </label>

          </div>}



      </div>
    </div>
  ) : (
    <></>
  );
};
export default Teacher;
