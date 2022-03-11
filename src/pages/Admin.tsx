import React, { useState, useEffect } from "react";
import "./Admin.css";
import Web3 from "web3";
import ReactModal from "react-modal";
import {
  addTeacherFunction,
  isAdminFunction,
  addAdminFunction,
  removeAdminFunction,
  removeTeacherFunction,
  isTeacherFunction,
} from "../api/web3";
import store from "../redux/store";
import Swal from "sweetalert2";

// import DatatableDesAdress from "../components/Tables/DatatableDesAdress"
function Admin(props: any) {
  const [addressPublicTeacher, setAdressPublicTeacher] = useState("");
  const [addressPublicAdmin, setAdressPublicAdmin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [validAddressAdmin , setValidAddressAdmin] = useState(false);
  const [validAddressTeacher , setValidAddressTeacher] = useState(false);
  const[sohwModal,setShowModal]=useState(false);
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
  useEffect(() => {
    let state = store.getState();
    if (state.user && state.user.address) {
      isAdminFunction(state.user.address, (isSuccess: any, error: any) => {
        if (isSuccess == true) {
          setIsAdmin(true);
        } else {
          window.location.assign("#/");
        }
      });
    } else {
      window.location.assign("#/");
    }
  });

 
  const ajoutTeacher = () => {
    setShowModal(true)
    isTeacherFunction(addressPublicTeacher, (isSuccess: any, error: any) => {
      //
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please check the teacher's address!"
        });

        return;
      }
      if (isSuccess == true) {
     
        Swal.fire(
          "Success!",
          "this address is already registered as a teacher",
          "success"
        );
        setShowModal(false)
      } else if (isSuccess == false) {
        addTeacherFunction(addressPublicTeacher, (isSuccess: boolean) => {
          //
          if (isSuccess) {
            setShowModal(false)
            Swal.fire("Success!", "Teacher has been added successfully", "success");
            
          } else {
            setShowModal(false)
            Swal.fire({
              icon: "error",
              title: "Error...",
              text: "Please check the teacher's address!"
            });
            
          }
        });
      }
    })
  
  };
  const supprimerTeacher = () => {
 
    isTeacherFunction(addressPublicTeacher, (isSuccess: any, error: any) => {
      setShowModal(true)
      if (error) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please check the teacher's address!"
        });
        return;
      }
      if (isSuccess == true) {
        removeTeacherFunction(
          addressPublicTeacher,
          (isSuccess: any, error: any) => {
            //
  
            if (isSuccess == true) {
              setShowModal(false)
              Swal.fire("Success!", " this teacher is already deleted", "success");
              
            } else if (isSuccess == false) {
              setShowModal(false)
              Swal.fire({
                icon: "error",
                title: "Error...",
                text: "this teacher is not deleted"
              });
            }
          }
        );
      } else if (isSuccess == false) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          // title: "Erreur...",
          text: "this address is not register as a teacher"
        });
      }
    });

    
  };
  const verfierTeacher = () => {
    setShowModal(true)
    isTeacherFunction(addressPublicTeacher, (isSuccess: any, error: any) => {
      //
      if (error) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please check the teacher's address!"
        });
        return;
      }
      if (isSuccess == true) {
        setShowModal(false)
        Swal.fire(
          "Success!",
          "this address is already registered as a teacher",
          "success"
        );
   
      } else if (isSuccess == false) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
         /* title: "Erreur...",*/
          text: "this address is not register as a teacher"
        });
      }
    });
  };

 

  const ajoutAdmin = () => {

    isAdminFunction(addressPublicAdmin, (isSuccess: any, error: any) => {
 setShowModal(true)
      if (error) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please check the admin's addres!"
        });
        return;
      }
      if (isSuccess == true) {
        setShowModal(false)
        Swal.fire(
          "Success!",
          "this address is already registered as an Admin",
          "success"
        );
      } else if (isSuccess == false) {
        addAdminFunction(addressPublicAdmin, (isSuccess: boolean) => {
          //
          if (isSuccess) {
            setShowModal(false)
            Swal.fire("Success!", "Admin was added successfully", "success");


          } else {
            setShowModal(false)
            Swal.fire({
              icon: "error",
              title: "Error...",
              text: "Please verify the admin address!"
            });
          }
        });
      }
    });


 
  };
  const verifierAdmin = () => {
    setShowModal(true)
    isAdminFunction(addressPublicAdmin, (isSuccess: any, error: any) => {
      //
      if (error) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Please verify admin address!"
        });
        return;
      }
      if (isSuccess == true) {
        setShowModal(false)
        Swal.fire(
          "Success!",
          "this address is already registered as an Admin",
          "success"
        );
      } else if (isSuccess == false) {
        setShowModal(false)
        Swal.fire({
          icon: "error",
          // title: "Erreur...",
          text: "this address is not registered as an Admin"
        });
      }
    });
  };
  const supprimerAdmin = () => {
    setShowModal(true)
    
      isAdminFunction(addressPublicAdmin, (isSuccess: any, error: any) => {
        //
        if (error) {
          setShowModal(false)
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: "Please check the admin address!"
          });
          return;
        }
        if (isSuccess == true) {
        
          removeAdminFunction(addressPublicAdmin, (isSuccess: any, error: any) => {
            //
    
            if (isSuccess == true) {
              setShowModal(false)
              Swal.fire("Success!", "this admin is already deleted", "success");
            } else if (isSuccess == false) {
              setShowModal(false)
              Swal.fire({
                icon: "error",
                title: "Error...",
                text: "this admin  is not deleted"
              });
            }
          });
        } else if (isSuccess == false) {
          setShowModal(false)
          Swal.fire({
            icon: "error",
            // title: "Erreur...",
            text: "this address is not registered as an Admin"
          });
        }
      });


    
  };

  const getAdressPublicTeacher = (event: any) => {
    const adressPublic = event.target.value;
    let isAddressTeacher= Web3.utils.isAddress(adressPublic)
    if (isAddressTeacher) 
     {setValidAddressTeacher(true)
    console.log ("valid address teacher")}
      else {setValidAddressTeacher(false)
      console.log ("non valid address teacher")}
    setAdressPublicTeacher(adressPublic);
  };
  const getAdressPublicAdmin = (event: any) => {
    const adressPublic = event.target.value;
    let isAddress= Web3.utils.isAddress(adressPublic)
    if (isAddress) 
     {setValidAddressAdmin(true)}
      else {setValidAddressAdmin(false)}
    setAdressPublicAdmin(adressPublic);
  };

  return isAdmin ? (
    <div className="Admin">
      <ReactModal
    
    isOpen={sohwModal}
    contentLabel="Request sent"
     style={customStyles}
  >
    <div>
      <p className="modalPara"> Waiting for validation of the transaction</p>
      <img src="loading.gif" alt="" />
    </div>
  </ReactModal>
      <div className="cardAdmin">
        <h2 className="title">Interface Administration</h2>
        <div className="form-group">
          <input
            onChange={getAdressPublicAdmin}
            placeholder="Enter the admin address"
          ></input>
          <div className="row">
            <div className="col-md-4">
              <button
                className={validAddressAdmin?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressAdmin}
                onClick={() => {
                  ajoutAdmin();
                }}
              >
                {" "}
                Add
              </button>
            </div>
            <div className="col-md-4">
              <button
                className={validAddressAdmin?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressAdmin}
                onClick={() => {
                  supprimerAdmin();
                }}
              >
                {" "}
                Delete
              </button>
            </div>
            <div className="col-md-4">
              <button
                className={validAddressAdmin?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressAdmin}
                onClick={() => {
                  verifierAdmin();
                }}
              >
                {" "}
                Check
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            onChange={getAdressPublicTeacher}
            placeholder="Enter the doctor address"
          ></input>
          <div className="row">
            <div className="col-md-4">
              <button
                className={validAddressTeacher?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressTeacher}
                onClick={() => {
                  ajoutTeacher();
                }}
              >
                {" "}
                Add
              </button>
            </div>
            <div className="col-md-4">
              <button
                className={validAddressTeacher?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressTeacher}
                onClick={() => {
                  supprimerTeacher();
                }}
              >
                {" "}
               Delete
              </button>
            </div>
            <div className="col-md-4">
              <button
                className={validAddressTeacher?"btnadressValide":"btnadressNonValide"}
                disabled={!validAddressTeacher}
                onClick={() => {
                  verfierTeacher();
                }}
              >
                {" "}
              Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default Admin;
