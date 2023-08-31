export function isSemVer(input: string) {
  const charArray = input.split("");
  if (charArray[1] == "." && charArray[3] == ".") {
    if (
      !isNaN(Number(charArray[0])) &&
      !isNaN(Number(charArray[2])) &&
      !isNaN(Number(charArray[4]))
    ) {
      return true;
    }
  } else return false;
}

export function errorAdd(value: string, error: string) {
  if (error == "") {
    error = "Errors in the Body: \n" + value;
  } else {
    error = error + value;
  }
}

export function errorAddTitle(value: string, error: string) {
  if (value != null || value != "") {
    error == "Erros in the Title: \n" + value + "\n" + "\n";
  } else {
    error = error + value;
  }
}

export function containsLetters(inputString: string): boolean {
  for (const char of inputString) {
    if (/[a-zA-Z]/.test(char)) {
      return true;
    }
  }
  return false;
}
