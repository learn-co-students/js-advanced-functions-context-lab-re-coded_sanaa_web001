/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function (x){
  let timeIn = [];
  let timeOut = [];
  let obj = {
    firstName: x[0],
    familyName: x[1],
    title: x[2],
    payPerHour: x[3],
    timeInEvents: timeIn,
    timeOutEvents: timeOut
  }
  return obj;
}
let createEmployeeRecords = function (x){

  let newArray = x.map(createEmployeeRecord);
  return newArray;
}
let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
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
    let z=0;
       z = (outEvent.hour)/100 - (inEvent.hour)/100;
        return z;
}

function wagesEarnedOnDate(b){
  let z=0;
 z = hoursWorkedOnDate.call(this,b) * this.payPerHour;
 return z;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(i,j){
return  i.find(ele => ele.firstName === j)

}

function calculatePayroll(v){
   let z = v.reduce(function (accum, sum) {return accum + allWagesFor.call(sum)},0)
return z;
}
