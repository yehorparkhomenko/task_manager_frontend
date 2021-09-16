
export function buildErrorsText(errorsDict) {
  var errorText = ""
  for(let errorName in errorsDict) {
      console.log(errorName)
    errorText = errorText + errorName + " - " + errorsDict[errorName] + "\n"
  }
  return errorText
}

export function statusCodeToText(statusCode){
    switch(statusCode) {
      case 0:
        return "задача не выполнена";
      case 1:
        return "задача не выполнена, отредактирована админом"
      case 10: 
        return "задача выполнена"
      case 11:
        return "задача отредактирована админом и выполнена"
      default:
        return "Задача не выполнена"
    }
  }