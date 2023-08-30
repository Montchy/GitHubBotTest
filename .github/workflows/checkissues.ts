export function identify(s: string) {
  console.log("Identifier is running...");
  if (("" + s).startsWith("🐛")) {
    console.log("Identity: BUG");
    return "bug";
  }
  if (("" + s).startsWith("✨")) {
    console.log("Identity: FEATURE");
    return "feature";
  }
  if (("" + s).startsWith("❓")) {
    console.log("Identity: QUESTION");
    return "question";
  } else {
    return "unsure";
  }
}

function checkUnsure(s) {
  if (s == "unsure") {
    //Title was wrong, close / delete after
    return "Something with you title seems to be wrong, check if the right emoji is at the beginning of your title";
  }
  console.log("Check:" + s);
}

function checkQuestion(s) {
  if (s == "question") {
    //TODO: check for valid information
  }
}

function checkBug(s) {
  if (s == "bug") {
    //TODO: check for valid information
  }
  console.log("Check:" + s);
}

function checkFeature(s) {
  if (s == "bug") {
    //TODO: check for valid information
  }
  console.log("Check:" + s);
}
