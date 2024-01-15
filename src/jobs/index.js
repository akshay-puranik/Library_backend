var schedule = require("node-schedule");
const { checkForLateFees } = require("../controllers/user");

var Job = function () {
  this.startSchedular = function () {
    schedule.scheduleJob("* * * * *", function () {
      console.log(`Starting Cron Job to check for late fees`);
      checkForLateFees();
    });
  };

  this.startJobs = function () {
    this.startSchedular();
  };
};

module.exports = Job;
