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
