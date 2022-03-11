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
  // const customStyles = {
  //   content : {
  //     top                   : '50%',
  //     left                  : '50%',
  //     right                 : 'auto',
  //     bottom                : 'auto',
  //     marginRight           : '-50%',
  //     transform             : 'translate(-50%, -50%)',
  //     padding: "100px 120px 50px",
  //   }
  // };

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

  const [id, setId] = useState("");
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }
  function dec2hex(dec: any) {
    return ("0" + dec.toString(16)).substr(-2);
  }

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
      const id = generateId(40);
      setId(id);
      const ReportCard = {
        date: dateReportCard,
        Student: nomStudent,
        dateNaissance: dateNaissance,
        matter: nomMatter,
        grade: gradeMatter,
        periode: periodeMatter,
      };
      const stringReportCard = JSON.stringify(ReportCard);

      const encrypted = CryptoJS.AES.encrypt(stringReportCard, id);
      QRCode.toCanvas(document.getElementById("canvas"), id, function (error) {
        if (error) console.error(error);
      });

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
          window.print();

          Swal.fire(
            "Succès!",
            "ReportCard a été ajouté avec succès!",
            "success"
          );
        }
      });
    }
  };
  const PrintQrCode = () => {
    var canvas: any;

    QRCode.toCanvas(document.getElementById("canvas"), id, function (error) {
      if (error) console.error(error);
      else {
        window.print();
      }
    });
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
      <div className="cardMed">
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
              onClick={PrintQrCode}
              disabled={activePrint}
              className={
                !activePrint ? "btnadressValide" : "btnadressNonValide"
              }
            >
              Print code{" "}
            </button>
          </div>
        </div>
        <div className="qrcode">
          <canvas id="canvas" />
          {/* <canvas className="qrcanvas" id="canvas" width="1000" height="1000" /> */}
          <p className="code"> your code {code}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Teacher;
