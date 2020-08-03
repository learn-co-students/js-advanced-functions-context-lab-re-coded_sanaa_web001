/* Your Code Here */
function createEmployeeRecord(elements) {
    return {
        firstName: elements[0],
        familyName: elements[1],
        title: elements[2],
        payPerHour: elements[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(function (record) {
        return createEmployeeRecord(record);
    });
}
// "2014-02-28 1400"
function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function hoursWorkedOnDate(dateMatched) {
    let inEvent = this.timeInEvents.find(function (e) {
        return e.date === dateMatched;
    });
    let outEvent = this.timeOutEvents.find(function (e) {
        return e.date === dateMatched;
    });
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(matchedDate) {
    let wageOnDate = hoursWorkedOnDate.call(this, matchedDate) * this.payPerHour;
    return parseFloat(wageOnDate.toString());
}

function calculatePayroll(employeesRecords) {
    return employeesRecords.reduce(function (memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(function(record){
        return record.firstName === firstNameString;
});
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

// The payroll system
// populates a record from an Array
//   ✓ has a function called createEmployeeRecord(
//   createEmployeeRecord
//     1) populates a firstName field from the 0th element
//     2) populates a familyName field from the 1th element
//     3) populates a title field from the 2th element
//     4) populates a payPerHour field from the 3th element
//     5) initializes a field, timeInEvents, to hold an empty Array
//     6) initializes a field, timeOutEvents, to hold an empty Array
// process an Array of Arrays into an Array of employee records
//   7) has a function called createEmployeeRecords
//   createEmployeeRecords
//     8) its implementation makes use of of the createEmployeeRecord function
//     9) creates two records
//     10) correctly assigns the first names
// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//   11) has a function called createTimeInEvent
//   createTimeInEvent
//     12) creates the correct type
//     13) extracts the correct date
//     14) extracts the correct hour
// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
//   15) has a function called createTimeOutEvent
//   createTimeOutEvent
//     16) creates the correct type
//     17) extracts the correct date
//     18) extracts the correct hour
// Given an employee record with a date-matched timeInEvent and timeOutEvent
//   19) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//   hoursWorkedOnDate
//     20) calculates that the employee worked 2 hours
// Given an employee record with a date-matched timeInEvent and timeOutEvent
//   21) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//   wagesEarnedOnDate
//     22) calculates that the employee earned 54 dollars
//     23) uses hoursWorkedOnDate
// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//   ✓ allWagesFor aggregates all the dates' wages and adds them together
//   allWagesFor
//     24) calculates that the employee earned 378 dollars
//     25) uses wagesEarnedOnDate
// Given an array of multiple employees
//   26) payrollExpense aggregates all the dates' wages and adds them together
//   payrollExpense
//     27) calculates that the employees earned 770 dollars
// runs payroll using the mock data provided by Ultron data systems
//   Dependent functions: createEmployeeRecords
//     takes CSV data, returns an array of employee records
//       28) exists
//       29) returns an Array with 2 records for Loki and Natalia
//   Dependent functions: findEmployeeByFirstName(collection, firstNameString)
//     30) exists
//     31) finds "Loki" 
//   Full Payroll Test
//     from several imported CSV structures
//       calculatePayroll
//         32) exists
//         33) correctly sums the payroll burden to $11,880 when passed an array of employee records