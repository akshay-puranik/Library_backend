var schedule = require("node-schedule");

var Job = function () {
  this.startSchedular = function () {
    schedule.scheduleJob("* * * * *", function () {
      console.log(`Starting Cron Job to check for late fees`);
    });
  };

  this.startJobs = function () {
    this.startSchedular();
  };
};

module.exports = Job;
