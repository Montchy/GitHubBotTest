export function identify(title: string) {
  console.log("Identifier is running...");
  if (
    (title.includes("🐛") && title.includes("✨")) ||
    (title.includes("🐛") && title.includes("❓")) ||
    (title.includes("❓") && title.includes("✨"))
  ) {
    return "toManyEmojis";
  }
  if (title.includes("🐛")) {
    console.log("Identity: BUG");
    return "bug";
  }
  if (title.includes("✨")) {
    console.log("Identity: FEATURE");
    return "feature";
  }
  if (title.includes("❓")) {
    console.log("Identity: QUESTION");
    return "question";
  } else {
    return "l";
  }
}

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
