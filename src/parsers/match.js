class MatchParser {
  /**
  * Parses the valorant match history
  * @param data {object} Data to parse
  * @returns {object} parsed data
  */
  constructor(data) {
    this.data = data;
  };
  
  let newHistory = {
    Subject:this.data.Subject,
    BeginIndex: this.data.BeginIndex,
    EndIndex: this.data.EndIndex,
    Total: this.data.Total,
    History: null
  };

  async parse() {
    const parsed = [];
    await new Promise((resolve) => {
      if(!this.data.History) return resolve();

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
      
    return newHistory;
  }

};
module.exports = MatchParser;
