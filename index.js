/* Your Code Here */
let createEmployeeRecord = function(ID){
    return {
        firstName: ID[0],
        familyName: ID[1],
        title: ID[2],
        payPerHour: ID[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(e) {
    return e.map(function(id){
        return createEmployeeRecord(id)
    })
}

let createTimeInEvent = function(d,h){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(h, 10),
        date:d,
    })

    return this
}
let createTimeOutEvent = function(dOut,hOut){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hOut, 10),
        date:dOut,
    })

    return this
}
let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
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


