module.exports = {
  
  // Client Constructor
  ACCOUNT_EMAIL_MISSING : { message: "Account email has not been provided!", type: "ACCOUNT_EMAIL_MISSING", code: 10001 },
  ACCOUNT_PASSWORD_MISSING : { message: "Account password has not been provided!", type: "ACCOUNT_PASSWORD_MISSING", code: 10002 },
  ACCOUNT_REGION_MISSING : { message: "Account region has not been provided!", type: "ACCOUNT_REGION_MISSING", code: 10003 },
  
  ACCOUNT_EMAIL_TYPE : { message: "Account email is not a string!", type: "ACCOUNT_EMAIL_TYPE", code: 20001 },
  ACCOUNT_PASSWORD_TYPE : { message: "Account password is not a string!", type: "ACCOUNT_PASSWORD_TYPE", code: 20002 },
  ACCOUNT_REGION_TYPE : { message: "Account region is not a valid library enum!", type: "ACCOUNT_REGION_TYPE", code: 20003 },
  
  
  // Client Authorization
  CLIENT_AUTHORIZATION_MISSING : { message: "You are not authorized!, Please login first.", type: "CLIENT_AUTHORIZATION_MISSING", code: 30001 },
  CLIENT_BEARER_MISSING : { message: "You are not properly authorized! Please login again.", type: "CLIENT_BEARER_MISSING", code: 30002 },
  CLIENT_RSOTOKEN_MISSING : { message: "You are not propely authorized! Please login again.", type: "CLIENT_RSOTOKEN_MISSING", code: 30003 },
  
  
  // Client Account
  CLIENT_ACCOUNT_NULL : { message: "You are not properly logged in. Please login again.", type: "CLIENT_ACCOUNT_NULL", code: 40001 }, 
  CLIENT_ACCOUNTID_MISSING : { message: "You are not properly loggrd in! Please login again.", type: "CLIENT_ACCOUNTID_MISSING", code: 40002 }
  
};