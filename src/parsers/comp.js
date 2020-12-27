const m = require("../main/debug/messages");
const e = require("../errors/exceptions");
class CompParser {
    /**
    * Parses the valorant competitive history
    * @param debugger {object} Client's debugger
    * @param isEnabled {boolean} determines if debuggins is enabled
    * @returns {object} parsed data
    */
   constructor(debug, isEnabled) {
    this.debugger = debug;
    this.isEnabled = isEnabled;
  };

    async parse(data) {
     if(!data) this.debugger.error(e.COMP_PARSER_NODATA.message, e.COMP_PARSER_NODATA);
      try {
        const parsed = [];
      
        let newHistory = {
          Version: data.Version,
          Subject: data.Subject,
          Matches: !data.Matches ? null : data.Matches
        };
  
        await new Promise((resolve) => {
          if(!data.Matches) resolve(false);
  
          let length = data.Matches.length;
          for(let mStack in data.Matches) {
           const m = data.Matches[mStack];
           const date = new Date(parseInt(m.MatchStartTime));
           
           if(m.MatchID) {
            parsed.push({ "MatchID":m.MatchID, "MatchStartTime":date, "TierAfterUpdate":m.TierAfterUpdate, "CompetitiveMovement":m.CompetitiveMovement });
             length--;
           }
       
           if(length === 0) {
            newHistory.Matches = parsed;
            resolve(true);
           }
          }
        });
        this.debugger.debug(m.MATCH_COMPHISTORY_PARSESUCCESS, "request", this.isEnabled);
        return newHistory;
      } catch(err) {
        this.debugger.error(e.MATCH_COMPHISTORY_FAIL, err)
      }
    }
  
  };
  module.exports = CompParser;
  
