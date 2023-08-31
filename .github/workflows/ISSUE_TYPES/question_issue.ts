import { isSemVer } from "../UTILS/helpingMethods";
import {
  cleanBody,
  labels,
  errorTitle,
  returnErrorTitle,
} from "../UTILS/checkissues";

let error = "";

export function cleanBodyQuestion(title: string, body: string) {
  cleanBody(title, body, "✨", error);

  for (const key in labels) {
    if (labels.hasOwnProperty(key)) {
      const value = labels[key];
      cleanup(key);
    }
  }
}

function cleanup(key: string) {
  if (key == " Question") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!Question: Empty or less than 5 letters\n");
  }
  if (key == " What I tried") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("!What I tried: Empty or less than 5 letters\n");
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

export function returnErrorQuestion() {
  return returnErrorTitle + "\n" + error;
}
