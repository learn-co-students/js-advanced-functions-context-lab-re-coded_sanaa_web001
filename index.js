/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/*let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}*/
function createEmployeeRecord(srArr){

    let empInfo={
        firstName: srArr[0],
        familyName: srArr[1],
        title: srArr[2],
        payPerHour: srArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empInfo;
 }

 function createEmployees(srArr){
    let recor = srArr.map(e=>createEmployeeRecord(e))
return recor;
}

function createTimeInEvent(dayDate){
    let myTime= dayDate.split(' ');
    let timeIn ={
        type: "TimeIn",
        hour: parseInt(myTime[1]),
        date: myTime[0]
    }
     let myObj= Object.assign({}, this);
     myObj.timeInEvents.push(timeIn);
     return myObj;
}

function createTimeOutEvent(dayDate){
    let myTime2= dayDate.split(' ');
    let timeOut ={
        type: "TimeOut",
        hour: parseInt(myTime2[1]),
        date: myTime2[0]
    }
     let myObj2= Object.assign({}, this);
     myObj2.timeOutEvents.push(timeOut);
     return myObj2;
}

function hoursWorkedOnDate(date){
    let startDate = this.timeInEvents.find(e=>e.date === date);
    let endDate = this.timeOutEvents.find(e=>e.date === date);
    let startHour= startDate.hour;
    let endHour= endDate.hour;
    let workHours=  (endHour-startHour)/100;
    return workHours;
 }

 function wagesEarnedOnDate(date){
    let workHours= hoursWorkedOnDate.call(this, date);
    let hourPayment = this.payPerHour;
    let payRate = workHours * hourPayment;
    return payRate;
}

function allWagesFor(){
    let avDate=[];
   for(let i = 0; i < this.timeInEvents.length; i++){
      avDate.push(wagesEarnedOnDate.call(this, this.timeInEvents[i].date))
   }
   let fullPayment = avDate.reduce(function (e, storage) {
       return e + storage}, 0);
   return fullPayment;
}

function calculatePayroll(recArr){
    let allPayment=0;
    for (let i=0; i<recArr.length; i++){
        allPayment= allPayment+allWagesFor.call(recArr[i])
    }
    return allPayment;
}

function createEmployeeRecords(srArr){
    let recor = srArr.map(e=>createEmployeeRecord(e))
return recor;
}

function findEmployeeByFirstName(recArr,firstName){
    let record= recArr.find(e=> e.firstName===firstName)
    return record;
}