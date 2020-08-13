class CompParser {
    /**
    * Parses the valorant competitive history
    * @param data {object} Data to parse
    * @returns {object} parsed data
    */
    constructor(data) {
      this.data = data;
    };

   
    let newHistory = {
     Version: this.data.Version,
     Subject:this.data.Subject,
     Matches: null
    };

    async parse() {
      const parsed = [];
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
        
      return newHistory;
    }
  
  };
  module.exports = CompParser;
  
