class CompParser {
    /**
    * Parses the valorant competitive history
    * @param data {object} Data to parse
    * @returns {object} parsed data
    */
    constructor(data) {
      this.data = data;
    };
  
    async parse() {
      const parsed = [];
      await new Promise((resolve) => {
        let length = this.data.Matches.length;
        for(let mStack in this.data.Matches) {
         const m = this.data.Matches[mStack];
         const date = new Date(parseInt(m.MatchStartTime));
         
         if(m.MatchID) {
           parsed.push({ "MatchID":m.MatchID, "MatchStartTime":date, "TierAfterUpdate":m.TierAfterUpdate, "CompetitiveMovement":m.CompetitiveMovement });
           length--;
         }
     
         if(length === 0) {
          resolve();
         }
        }
      });
        
      const newHistory = {
       "Version": this.data.Version,
       "Subject":this.data.Subject,
       "Matches": parsed
      };
      return newHistory;
    }
  
  };
  module.exports = CompParser;
  