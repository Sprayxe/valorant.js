const m = require("../main/debug/messages");
const e = require("../errors/exceptions");
class CompParser {
    /**
    * Parses the valorant competitive history
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
        const parsed = [];
      
        let newHistory = {
          Version: this.data.Version,
          Subject:this.data.Subject,
          Matches: !this.data.Matches ? null : this.data.Matches
        };
  
        await new Promise((resolve) => {
          if(!this.data.Matches) return resolve();
  
          let length = this.data.Matches.length;
          for(let mStack in this.data.Matches) {
           const m = this.data.Matches[mStack];
           const date = new Date(parseInt(m.MatchStartTime));
           
           if(m.MatchID) {
             parsed.push({ "MatchID":m.MatchID, "MatchStartTime":date, "TierAfterUpdate":m.TierAfterUpdate, "CompetitiveMovement":m.CompetitiveMovement });
             length--;
           }
       
           if(length === 0) {
            newHistory.Matches = parsed;
            resolve();
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
  
