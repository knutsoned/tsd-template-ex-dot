import * as R from "../modules/remeda";

// Module import example
import { Template } from "../modules/template";

// Debugging support
import * as lldebugger from "lldebugger.debug";
lldebugger.start();

interface props {
  excitement: number;
  doOnce: boolean;
  template: Template;
}
go.property("excitement", 100);

export function init(this: props): void {
  this.template = new Template();

  print(
    "Welcome to defold-typescript; A dev environment for Defold that transpiles TypeScript into lua using typescript-to-lua."
  );
  print("");

  print("Testing 3rd party libs");
  const users = [
    { name: "john", age: 20, gender: "m" },
    { name: "marry", age: 22, gender: "f" },
    { name: "samara", age: 24, gender: "f" },
    { name: "paula", age: 24, gender: "f" },
    { name: "bill", age: 33, gender: "m" },
  ];

  R.pipe(
    users,
    R.filter((x) => x.gender === "f"),
    R.groupBy((x) => x.age)
  );

  // Get first 3 unique values
  const arr = [1, 2, 2, 3, 3, 4, 5, 6];

  const result = R.pipe(
    arr, // only four iterations instead of eight (array.length)
    R.map((x) => {
      print("iterate", x);
      return x;
    }),
    R.uniq(),
    R.take(3)
  ); // => [1, 2, 3]
  print(result);

  print("");

  print("Turnkey Defold TypeScript dev environment features:");
  this.doOnce = true;
}

export function update(this: props, _dt: number): void {
  if (this.doOnce) {
    msg.post("#", "features");
    this.doOnce = false;
  }
}

export function on_message(
  this: props,
  message_id: hash,
  _message: string,
  _sender: url
): void {
  if (message_id === hash("features")) {
    const features = this.template.features();
    for (let i = 0; i < features.length; ++i) {
      print(features[i]);
    }

    print("To get started simply use `npm run` and get going!");
    msg.post("#", "usage");
  } else if (message_id === hash("usage")) {
    print(
      "  ✔ Use `npm run dev` to start a watcher that compiles and emits lua and script when you save"
    );
    print("  ✔ Use `npm run build` to just compile your ts, sans watcher ");

    print("⌚ Stats!");
    msg.post("#", "stats");
  } else if (message_id === hash("stats")) {
    print("Collected Garbage Size:", collectgarbage("count") * 1024);
    print(
      `We ❤ TypeScript and are ${this.excitement}% excited for TypeScript in Defold!`
    );
  }
}
