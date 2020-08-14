const m = require("../main/debug/messages");
const e = require("../errors/exceptions");
class MatchParser {
  /**
  * Parses the valorant match history
  * @param data {object} Data to parse
  * @returns {object} parsed data
  */
  constructor(data, debug, isEnabled) {
    this.data = data;
    this.debugger = debug;
    this.isEnabled = isEnabled;
  };

  async parse() {

    try {
      let newHistory = {
        Subject:this.data.Subject,
        BeginIndex: this.data.BeginIndex,
        EndIndex: this.data.EndIndex,
        Total: this.data.Total,
        History: !this.data.History ? null : this.data.History
      };
      
      const parsed = [];
      await new Promise((resolve) => {
  
        let length = this.data.History.length;
        for(let mStack in this.data.History) {
         const m = this.data.History[mStack];
         const date = new Date(parseInt(m.GameStartTime));
         
         if(m.MatchID) {
           parsed.push({ "MatchID":m.MatchID, "GameStartTime":date, "TeamID":m.TeamID});
           length--;
         }
     
         if(length === 0) {
          newHistory.History = parsed;
          resolve();
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
