import React, { useState, useEffect } from 'react';
import "./Home.css"
import { useWeb3Context } from "../contexts/Web3";

import useAsync from "../components/useAsync";
import { unlockAccount } from '../api/web3'
import store from '../redux/store';
import { user } from '../redux/actions';
import Swal from 'sweetalert2'
import {  isAdminFunction, isTeacherFunction } from '../api/web3'

const Home = () => {
    const {
        state: { account, netId },
        updateAccount,
    } = useWeb3Context();

    const handleClick = () => { window.location.assign('#/Admin') }

    const { call } = useAsync(unlockAccount);

    async function onClickConnectAdmin() {
        const { error, data } = await call(Error);
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "An error occurred while connecting to Metamask!"
            })
        }
        if (data) {
            updateAccount(data);
            store.dispatch(user(data.account));
            isAdminFunction(data.account, (isSuccess: any, error: any) => {
                // 
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: "Please check the administrator address!"
                    })
                    return;
                }
                if (isSuccess == true) {
                    handleClick();
                }
                else if (isSuccess == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: " you are not an Administrator"
                    })
                }
            })
        }
    }
    const handleClickTeacher = () => { window.location.assign('#/Teacher') }

    async function onClickConnectTeacher() {
        const { error, data } = await call(Error);
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "An error occurred while connecting to Metamask!"
            })
        }
        if (data) {
            updateAccount(data);
            store.dispatch(user(data.account));

            isTeacherFunction(data.account, (isSuccess: any, error: any) => {
                // 
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: "Please check the Teacher's address!"
                    })
                    return;
                }
                if (isSuccess == true) {
                    handleClickTeacher();
                }
                else if (isSuccess == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: "you are not a Teacher"
                    })
                }
            })
        }
    }
    return (
        <div className="Home">
            <div className="cardHome">
                <button onClick={() => onClickConnectAdmin()}>Connect administration</button>
               
                <button onClick={() => onClickConnectTeacher()}>Connect Teacher</button>
            </div>
        </div>)

};
export default Home;