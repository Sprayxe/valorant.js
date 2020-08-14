const m = require("../main/debug/messages");
const e = require("../errors/exceptions");
class MatchParser {
  /**
  * Parses the valorant match history
  * @param debug {object} Client's debugger
  * @param isEnabled {boolean} Determines if debugging is enabled
  * @returns {object} parsed data
  */
  constructor(debug, isEnabled) {
    this.debugger = debug;
    this.isEnabled = isEnabled;
  };

  async parse(data) {
    if(!data) this.debugger.error(e.MATCH_PARSER_NODATA.message, e.MATCH_PARSER_NODATA);
    try {
      let newHistory = {
        Subject:data.Subject,
        BeginIndex: data.BeginIndex,
        EndIndex: data.EndIndex,
        Total: data.Total,
        History: !data.History ? null : data.History
      };
      
      const parsed = [];
      await new Promise((resolve) => {
        if(!data.History) resolve(false);
        let length = data.History.length;
        for(let mStack in data.History) {
         const m = data.History[mStack];
         const date = new Date(parseInt(m.GameStartTime));
         
         if(m.MatchID) {
           parsed.push({ "MatchID":m.MatchID, "GameStartTime":date, "TeamID":m.TeamID});
           length--;
         }
     
         if(length === 0) {
          newHistory.History = parsed;
          resolve(true);
         }
        }
      });
      this.debugger.debug(m.MATCH_MATCHHISTORY_PARSESUCCESS, "request", this.isEnabled);
      return newHistory;

    } catch(err) {
      this.debugger.error(e.MATCH_MATCHHISTORY_FAIL, err);
    }
  }

};
module.exports = MatchParser;
