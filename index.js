const createEmployeeRecord = (arr) => {
  const [firstName, familyName, title, payPerHour] = arr;
  const employee = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
};

const createEmployeeRecords = (arr) => {
  return arr.map((employee) => createEmployeeRecord(employee));
};

const createTimeInEvent = (empObj, dateStamp) => {
  const date = dateStamp.split(" ")[0];
  const hour = parseInt(dateStamp.split(" ")[1]);
  empObj.timeInEvents.push({ type: "TimeIn", hour, date });
  return empObj;
};

const createTimeOutEvent = (empObj, dateStamp) => {
  const date = dateStamp.split(" ")[0];
  const hour = parseInt(dateStamp.split(" ")[1]);
  empObj.timeOutEvents.push({ type: "TimeOut", hour, date });
  return empObj;
};

const hoursWorkedOnDate = (empObj, dateString) => {
  const timeIn = empObj.timeInEvents.find((event) => event.date === dateString);
  const timeOut = empObj.timeOutEvents.find(
    (event) => event.date === dateString
  );
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (empObj, dateString) => {
  const hours = hoursWorkedOnDate(empObj, dateString);
  return hours * empObj.payPerHour;
};

const allWagesFor = (empObj) => {
  const dates = empObj.timeInEvents.map((event) => event.date);
  return dates.reduce(
    (total, date) => total + wagesEarnedOnDate(empObj, date),
    0
  );
};

const calculatePayroll = (arr) => {
  return arr.reduce((total, empObj) => total + allWagesFor(empObj), 0);
};
