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
    return "l";
  }
}
