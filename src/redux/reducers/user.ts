const user = (state = { address: "" }, action: any) => {
    switch (action.type) {



        case "ADRESSPUBLIC":
            //console.log(" action1 => " + action.type);
            //   return state;

            return { address: action.address };



        default:
            return state
    }
}
export default user;