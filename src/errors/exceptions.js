module.exports = {
  
  // Client Constructor
  ACCOUNT_USERNAME_MISSING : { message: "Account username has not been provided!", type: "ACCOUNT_EMAIL_MISSING", code: 10001 },
  ACCOUNT_PASSWORD_MISSING : { message: "Account password has not been provided!", type: "ACCOUNT_PASSWORD_MISSING", code: 10002 },
  ACCOUNT_REGION_MISSING : { message: "Account region has not been provided!", type: "ACCOUNT_REGION_MISSING", code: 10003 },
  
  ACCOUNT_USERNAME_TYPE : { message: "Account username is not a string!", type: "ACCOUNT_EMAIL_TYPE", code: 20001 },
  ACCOUNT_PASSWORD_TYPE : { message: "Account password is not a string!", type: "ACCOUNT_PASSWORD_TYPE", code: 20002 },
  ACCOUNT_REGION_TYPE : { message: "Account region is not a valid library enum!", type: "ACCOUNT_REGION_TYPE", code: 20003 },
  
  
  // Client Authorization
  CLIENT_AUTHORIZATION_MISSING : { message: "You are not authorized!, Please login first.", type: "CLIENT_AUTHORIZATION_MISSING", code: 30001 },
  CLIENT_BEARER_MISSING : { message: "You are not properly authorized! Please login again.", type: "CLIENT_BEARER_MISSING", code: 30002 },
  CLIENT_RSOTOKEN_MISSING : { message: "You are not propely authorized! Please login again.", type: "CLIENT_RSOTOKEN_MISSING", code: 30003 },
  
  
  // Client Account
  CLIENT_ACCOUNT_NULL : { message: "You are not properly logged in. Please login again.", type: "CLIENT_ACCOUNT_NULL", code: 40001 }, 
  CLIENT_ACCOUNTID_MISSING : { message: "You are not properly logged in! Please login again.", type: "CLIENT_ACCOUNTID_MISSING", code: 40002 },
  CLIENT_ACCOUNT_NEW : { message: "You have to start valorant atleast once before you can use this.", type: "CLIENT_ACCOUNT_NEW", code: 40003},
  CLIENT_SIGNIN_FAIL: { message: "Failed to signin to Riot Services.", type: "CLIENT_SIGNIN_FAIL", code: 40004 },

  // User Account
  ACCOUNT_REFRESH_FAIL: { message: "Failed to refresh account data.", type: "ACCOUNT_REFRESH_FAIL", code: 40005 },
  ACCOUNT_GETWALLET_FAIL: { message: "Failed to get account wallet.", type: "ACCOUNT_GETWALLET_FAIL", code: 40006 },
  ACCOUNT_GETSTOREFRONT_FAIL: { message: "Failed to get account's storefront.", type: "ACCOUNT_GETSTOREFRONT_FAIL", code: 40007 },
  ACCOUNT_GETWALLET_FAIL: { message: "Failed to get account wallet.", type: "ACCOUNT_GETWALLET_FAIL", code: 40008 },
  ACCOUNT_GETINVENTORY_FAIL: { message: "Failed to get account inventory", type: "ACCOUNT_GETINVENTORY_FAIL", code: 40009 },

  // Valorant Debugger
  DEBUG_DATA_MISSING : { message: "You did not provide any data to log! Please provide some data.", type: "DEBUG_DATA_MISSING", code: 50001 },
  DEBUG_TYPE_MISSING : { message: "You did not provide a type! Please provide a type.", type: "DEBUG_TYPE_MISSING", code: 50002 },
  DEBUG_DATA_TYPE : { message: "Debug data to log is not a string!", type: "DEBUG_DATA_TYPE", code: 50003 },
  DEBUG_TYPE_TYPE : { message: "Debug type is not a string!", type: "DEBUG_TYPE_TYPE", code: 50004 },
  DEBUG_TYPE_INVALID : { message: "Provided debug type is invalid! Choose between: \"client\" or \"request\" .", type: "DEBUG_TYPE_INVALID", code: 50005 },

  // Match API
  MATCH_MATCHHISTORY_FAIL: { message: "Failed to get match history.", type: "MATCH_MATCHHISTORY_FAIL", code: 60001 },
  MATCH_COMPHISTORY_FAIL: { message: "Failed to get competitive history.", type: "MATCH_COMPHISTORY_FAIL", code: 60002 },
  
  // Information API
  INFO_GETCONTRACT_FAIL: { message: "Failed to get story contract.", type:"INFO_GETCONTRACT_FAIL", code: 70001 },
  INFO_GETITEMS_FAIL: { message: "Failed to get all items from the game", type: "INFO_GETITEMS_FAIL", code: 70002 },
  
  // Parsers
  MATCH_PARSER_NODATA: { message: "No data to parse has been provided.", type: "MATCH_PARSER_NODATA", code: 80001 },
  
  COMP_PARSER_NODATA: { message: "No data to parse has been provided.", type: "COMP_PARSER_NODATA", code: 80002 },
  
  STORE_PARSER_NODATA: { message: "No data to parse has been provided.", type: "STORE_PARSER_NODATA", code: 80003 },
  
};
