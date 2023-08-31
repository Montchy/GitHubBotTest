export let labels: { [key: string]: string } = {};

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

function cleanTitle(title: string, emoji: string, error: string) {
  if (title.includes("emoji") && title.indexOf("emoji") > 0) {
    console.log("TITLEERROR1");
    errorAdd(
      "!Title: Emoji has to be at the beginning of your Title \n",
      error
    );
    return "w";
  } else if (title.length < 5) {
    console.log("TITITITTT ERROR 2");
    errorAdd("!Title: Title is to short \n", error);
    return "w";
  } else return "w";
}

export function cleanBody(
  title: string,
  body: string,
  emoji: string,
  error: string
) {
  const cT = cleanTitle(title, emoji, error);
  if (cT == "w") {
    const parts = body.split("###");

    parts.forEach((s) => {
      try {
        const twPart = s.split("\n");
        const key = twPart[0];
        const value = twPart.slice(1).join("\n");
        const valuec = value.replace(/`/g, "");
        const cleanvalue = valuec.replace(/\n/g, " ");

        labels[key] = cleanvalue;
      } catch (error) {}
    });
  }
}

export function errorAdd(value: string, error: string) {
  if (error == "") {
    error = "Errors: \n" + value;
  } else {
    error = error + value;
  }
}
