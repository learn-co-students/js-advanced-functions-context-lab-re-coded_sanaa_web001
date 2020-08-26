/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// ### `createEmployeeRecord`

let createEmployeeRecord = function (record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployeeRecords = function (arrayOfRecords) {
  return arrayOfRecords.map((e) => createEmployeeRecord(e));
};

let createTimeInEvent = function (dateStamp) {
  let [date, hours] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hours, 10),
    date,
  });
  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let [date, hours] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hours, 10),
    date,
  });
  return this;
};

// ### `hoursWorkedOnDate`

// * **Argument(s)**
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Hours worked, an `Integer`
// * **Behavior**
//   * Given a date, find the number of hours elapsed between that date's
//     timeInEvent and timeOutEvent
let hoursWorkedOnDate = function (dateStamp) {
  let inEvent = this.timeInEvents.find((e) => e.date == dateStamp);
  let outEvent = this.timeOutEvents.find((e) => e.date == dateStamp);

  return (outEvent.hour - inEvent.hour) / 100;
};

//   `wagesEarnedOnDate`

let wagesEarnedOnDate = function (dateStamp) {
  let hoursToWork = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
  return parseFloat(hoursToWork.toString());
};

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((e) => e.firstName === firstName);
};

let calculatePayroll = function (arrayOfRecords) {
  return arrayOfRecords.reduce((memo, record) => {
    return memo + allWagesFor.call(record);
  }, 0);
};
