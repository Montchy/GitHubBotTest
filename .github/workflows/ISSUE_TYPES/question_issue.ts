import { isSemVer } from "../UTILS/helpingMethods";
import {
  cleanBody,
  labels,
  errorTitle,
  returnErrorTitle,
} from "../UTILS/checkissues";

let error = "";
let tierror = "";

export function cleanBodyQuestion(title: string, body: string) {
  tierror = "" + cleanBody(title, body, "✨", error);

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
    } else errorAdd("_!_Question:  Not enough information\n");
  }
  if (key == " What I tried") {
    let value = labels[key];
    if (value != "" && value != null && value.length >= 5) {
    } else errorAdd("_!_What I tried:  Not enough information\n");
  }
  if (key == " VisionCamera Version") {
    let value = labels[key];
    const cleanvalue = value.replace(" ", "");

    if (isSemVer(cleanvalue) == true) {
      return null;
    } else errorAdd("_!_VisionCamera Version: Isn't SemVer!\n");
  }
  return "Fatal error";
}

function errorAdd(value: string) {
  if (error == "") {
    error = "**Errors in the Body:** \n" + value;
  } else {
    error = error + value;
  }
}

export function returnErrorQuestion() {
  if (tierror + "\n" + error != undefined) {
    return tierror + "\n" + error;
  } else {
    console.log("undefined error");
    return "";
  }
}
