
export function buildErrorsText(errorsDict) {
  var errorText = ""
  for(let errorName in errorsDict) {
      console.log(errorName)
    errorText = errorText + errorName + " - " + errorsDict[errorName] + "\n"
  }
  return errorText
}
