import Web3 from "web3";
import ReportCard from "../contracts/ReportCard.json";
import Administration from "../contracts/Administrators.json";
import TruffleContract from "@truffle/contract";
import store from "../redux/store";


//@ts-ignore
const ReportCardContract = TruffleContract(ReportCard);


//@ts-ignore
const administrationContract = TruffleContract(Administration);



const user = store.getState().user;

// @ts-ignore
var currentweb3;
export async function unlockAccount() {
  // @ts-ignore
  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("Web3 not found");
  }

  const web3 = new Web3(ethereum);
  await ethereum.enable();
  currentweb3 = web3;
  const accounts = await web3.eth.getAccounts();

  return { web3, account: accounts[0] || "" };
}


export async function addReportCardFunction(
  contenu: string,
  callback: (error: Error | null, id: string | null) => any
) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    ReportCardContract.setProvider(web3.currentProvider);
    const pres = await ReportCardContract.at(
      "0x0a342F8024f7b24927E4dF89e182f0EdF8fb3Fa5"
    );
    let prestx = await pres
      .addReportCard(contenu, { from: user.address })
      .then((prestx2: any) => {
        let id = prestx2.logs[0].args.sequence.toString();
        callback(null, JSON.stringify(id));
      });
    // let id = prestx.logs[0].args.sequence.toString();
    // callback(null, JSON.stringify(id));
    console.log({ user } + " this is user");
  } catch (error) {
    callback(error, null);
    console.log(error);
    console.log("error while read message");
  }
}

export async function getReportCardFunction(
  id: number,
  callback: (error: Error | null, contenu: string | string) => any
) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    ReportCardContract.setProvider(web3.currentProvider);
    const pres = await ReportCardContract.at(
      "0x0a342F8024f7b24927E4dF89e182f0EdF8fb3Fa5"
    );
    let prestx = await pres
      .getReportCard(id, { from: user.address })
      .then((prestx2: any) => {
        console.log(prestx2);
        callback(null, JSON.stringify(prestx2));
      });
  } catch (error) {
    callback(error, "");
    console.log(error);
    console.log("error while read message");
  }
}

export async function updateReportCardFunction(
  contenu: string,
  nbreBloc: number,
  callback: (error: Error | null, id: string | null) => any
) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    ReportCardContract.setProvider(web3.currentProvider);
    const pres = await ReportCardContract.at(
      "0x0a342F8024f7b24927E4dF89e182f0EdF8fb3Fa5"
    );
    let prestx = await pres
      .updateReportCard(contenu, nbreBloc, {
        from: user.address,
      })
      .then((prestx2: any) => {
        let id = prestx2.logs[0].args.sequence.toString();
        console.log(JSON.stringify(prestx2) + "id");
        callback(null, JSON.stringify(id));
      });
  } catch (error) {
    callback(error, null);
    console.log(error);
    console.log("error while read message");
  }
}

export async function addTeacherFunction(address: string, callback: any) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const addD = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    await addD
      .addTeacher(address, { from: user.address })
      .then((prestx2: any) => {
        callback(true);
      });
  } catch (error) {
    callback(false);
  }
}


export async function addAdminFunction(address: string, callback: any) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const instanceContractAdmin = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    await instanceContractAdmin
      .addAdmin(address, { from: user.address })
      .then((prestx2: any) => {
        callback(true);
      });
  } catch (error) {
    callback(false);
  }
}

export async function removeAdminFunction(address: string, callback: any) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const cont = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    let removeAdmin = await cont
      .removeAdmin(address, { from: user.address })
      .then((prsetx2: any) => {
        console.log(" remove admin " + JSON.stringify(removeAdmin));
        callback(true);
      });
  } catch (error) {
    console.log(error);
    console.log("error while read message");
    callback(false);
  }
}

export async function removeTeacherFunction(address: string, callback: any) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const cont = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    let removeTeacher = await cont
      .removeTeacher(address, { from: user.address })
      .then((prestx2: any) => {
        callback(true);
      });
  } catch (error) {
    callback(false);
  }
}



export async function isAdminFunction(address: string, callback: any) {
  const user = store.getState().user;
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const cont = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    console.log("user.address",user.address  );
    let isAdmin = await cont.isAdmin(address, { from: user.address });
console.log("isAdmin :" ,isAdmin)
    callback(isAdmin, null);
  } catch (error) {
    callback(null, error);
  }
}

export async function isTeacherFunction(address: string, callback: any) {
  // @ts-ignore
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  try {
    administrationContract.setProvider(web3.currentProvider);
    const cont = await administrationContract.at(
      "0x7298119bd49B97Fb2557A60a4bA6a9490c810cc0"
    );
    let isTeacher = await cont.isTeacher(address, { from: user.address });

    callback(isTeacher, null);
  } catch (error) {
    console.log(error);
    console.log("error while read message");
    callback(null, error);
  }
}



export function subscribeToAccount(
  web3: Web3,
  callback: (error: Error | null, account: string | null) => any
) {
  const id = setInterval(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      callback(null, accounts[0]);
    } catch (error) {
      callback(error, null);
    }
  }, 1000);

  return () => {
    clearInterval(id);
  };
}

export function subscribeToBalance(
  web3: Web3,
  callback: (error: Error | null, balance: string | null) => any
) {
  const id = setInterval(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      callback(null, balance);
    } catch (error) {
      callback(error, null);
    }
  }, 1000);

  return () => {
    clearInterval(id);
  };
}

export function subscribeToNetId(
  web3: Web3,
  callback: (error: Error | null, netId: number | null) => any
) {
  const id = setInterval(async () => {
    try {
      const netId = await web3.eth.net.getId();
      localStorage.setItem("myNetId", netId.toString());
      callback(null, netId);
    } catch (error) {
      callback(error, null);
    }
  }, 1000);

  return () => {
    clearInterval(id);
  };
}
