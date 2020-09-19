/* Your Code Here */
function createEmployeeRecord (arraySt){
  return {
    firstName : arraySt[0],
    familyName: arraySt[1],
    title: arraySt[2],
    payPerHour: arraySt[3],
    timeInEvents : [],
    timeOutEvents:[]
}
}
function createEmployeeRecords (arraySt){
  return arraySt.map (x => createEmployeeRecord(x));
}
/*

 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 function createTimeInEvent (date){
  let arrDa = date.split(" ") ;
  let ob = {
    type:"TimeIn" ,
    hour: parseInt(arrDa[1]),
    date:arrDa[0]
  };
  this.timeInEvents.push(ob);
  return this;
}

function createTimeOutEvent ( date){
  let arrDa = date.split(" ") ;
  let ob = {
    type:"TimeOut" ,
    hour: parseInt(arrDa[1]),
    date:arrDa[0]
  };
  this.timeOutEvents.push(ob);
  return this;
}


function hoursWorkedOnDate (date){
  let arrDa = date.split(" ") ;
  for (let i = 0 ; i < this.timeInEvents.length ;i++ ) {
    if(arrDa[0] === this.timeInEvents[i].date){
      return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour )/ 100;
    }
  }
}
function wagesEarnedOnDate (date){
  return hoursWorkedOnDate.call(this,date) * this.payPerHour ;
}

function allWagesFor (){
  let hour = 0;
  for (let i = 0 ; i < this.timeInEvents.length ; i++ ) {
    hour += wagesEarnedOnDate.call(this ,this.timeInEvents[i].date);
  }
  return hour  ;
}

function findEmployeeByFirstName (srcArray,firstName ){
  let s= srcArray.find((x) => x.firstName === firstName);
  return s;
}

function calculatePayroll (srcArray ){
  let sum = 0 ;
  for (let i = 0 ; i < srcArray.length ; i++ ) {
    for (let j = 0 ; j < srcArray[i].timeInEvents.length ; j++ ){
      sum += wagesEarnedOnDate.call(srcArray[i],srcArray[i].timeInEvents[j].date) ;
    }
  }
  return sum ;
}
