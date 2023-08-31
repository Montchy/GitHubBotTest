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
