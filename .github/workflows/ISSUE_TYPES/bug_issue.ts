import { isSemVer } from "../UTILS/helpingMethods";
import { cleanBody, labels, errorTitle } from "../UTILS/checkissues";
import { errorAddTitle } from "../UTILS/helpingMethods";

let error = "";

export function cleanBodyBug(title: string, body: string) {
  cleanBody(title, body, "🐛", error);
  console.log("LABELS:" + labels);

  errorAddTitle(errorTitle, error);

  for (const key in labels) {
    if (labels.hasOwnProperty(key)) {
      const value = labels[key];
      cleanup(key);
    }
  }
}

function cleanup(key: string) {
  if (key == " What were you trying to do?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else
      errorAdd("!What were you trying to do: Empty or less than 5 letters\n");
  }
  if (key == " Reproduceable Code") {
    let value = labels[key];

    if (value != "" && value != null && value.length >= 14) {
    } else errorAdd("!Reproducable Code: Empty or less than 5 letters\n");
  }
  if (key == " What happened instead?") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!What happened instead: Empty or less than 5 letters\n");
  }
  if (key == " Relevant log output") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 16) {
    } else errorAdd("!Relevant log output: Empty or less than 5 letters\n");
  }
  if (key == " Device") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Device: Empty or less than 5 letters\n");
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
    const cleanvalue = value.replace(" ", "");

    if (isSemVer(cleanvalue) == true) {
      return null;
    } else errorAdd("!VisionCamera Version: Isn't SemVer!\n");
  }
  return "Fatal error";
}

function errorAdd(value: string) {
  if (error == "") {
    error = "Errors: \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorBug() {
  return error;
}
