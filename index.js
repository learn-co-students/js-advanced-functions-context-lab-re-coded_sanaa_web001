/* Your Code Here */

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


function createEmployeeRecord(employeeInfo){
    let record = {}
    record.firstName = employeeInfo[0]
    record.familyName = employeeInfo[1]
    record.title = employeeInfo[2]
    record.payPerHour = employeeInfo[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}

function createEmployeeRecords(employeesArray){
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp){ //no employee Record anymore bc of "this"
    let timeInObj = {}
    timeInObj.type = "TimeIn"
    timeInObj.hour = parseInt(dateStamp.split(" ")[1])
    timeInObj.date = dateStamp.split(" ")[0]

    this.timeInEvents.push(timeInObj)
    return this
}

function createTimeOutEvent(dateStamp){
    let timeOutObj = {}
    timeOutObj.type = "TimeOut"
    timeOutObj.hour = parseInt(dateStamp.split(" ")[1])
    timeOutObj.date = dateStamp.split(" ")[0]

    this.timeOutEvents.push(timeOutObj)
    return this

}

function hoursWorkedOnDate(dateStamp){
    //find the time in (hour) for date
    const timeInForDate = this.timeInEvents.find(e => e.date === dateStamp)
    const timeOutForDate = this.timeOutEvents.find(e => e.date === dateStamp)

    return ((timeOutForDate.hour - timeInForDate.hour)/100)

}

function wagesEarnedOnDate(dateStamp){

    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour

}

function findEmployeeByFirstName(employees, firstName){
   return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(allEmployees){
    return allEmployees.reduce((total, employee) => total + allWagesFor.call(employee), 0) 

} 