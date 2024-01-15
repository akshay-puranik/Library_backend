var schedule = require("node-schedule");
const { checkForLateFees } = require("../controllers/user");

var Job = function () {
  this.startSchedular = function () {
    schedule.scheduleJob("0 0 * * *", async function () {
      await checkForLateFees();
      console.log(`Starting Cron Job to check for late fees`);
    });
  };

  this.startJobs = function () {
    this.startSchedular();
  };
};

module.exports = Job;
