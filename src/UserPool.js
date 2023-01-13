import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-1_nQQyRkC1H", // Your user pool id here
  ClientId: "6lg7g0e5skbbn5j3nqumnr2osj", // Your client id here

  /*  ClientId: process.env.REACT_APP_CLIENTID, */ // Your client id here
};

export default new CognitoUserPool(poolData);
