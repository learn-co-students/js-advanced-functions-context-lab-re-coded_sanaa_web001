/* Your Code Here */

function createEmployeeRecord(employeeData) {
  let newEmployee = {};

  newEmployee.firstName = employeeData[0];
  newEmployee.familyName = employeeData[1];
  newEmployee.title = employeeData[2];
  newEmployee.payPerHour = employeeData[3];
  newEmployee.timeInEvents = [];
  newEmployee.timeOutEvents = [];

  return newEmployee;
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    let timeInObj = {
        type: "TimeIn",
        hour: (dateStamp.length > 13 ? parseInt(dateStamp.slice(11), 10) : parseInt(dateStamp.slice(9), 10)),
        date: (dateStamp.length > 13 ? dateStamp.slice(0, 10) : dateStamp.slice(0, 8))
    }
    this.timeInEvents.push(timeInObj);
    return this;
}
function createTimeOutEvent(dateStamp) {
    let timeInObj = {
        type: "TimeOut",
        hour: (dateStamp.length > 13 ? parseInt(dateStamp.slice(11), 10) : parseInt(dateStamp.slice(9), 10)),
        date: (dateStamp.length > 13 ? dateStamp.slice(0, 10) : dateStamp.slice(0, 8))
    }
    this.timeOutEvents.push(timeInObj);
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(d => d.date === date);
    let timeOut = this.timeOutEvents.find(d => d.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(date) {
    let wage = hoursWorkedOnDate.call(this,date) * this.payPerHour;
    return wage;
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName);
}

function calculatePayroll(srcArray) {
    let totalWages = srcArray.reduce(function (total, currentValue) {
        let newTotal = allWagesFor.call(currentValue) + total
        return newTotal;
    }, 0)
    return totalWages;
}
