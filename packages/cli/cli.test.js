const shelljs = require("shelljs");
const pkg = require("./package.json");

test("CLI should return version", () => {
  const version = shelljs.exec("yarn polemic -v", {
    silent: true,
    cwd: __dirname,
  }).stdout;
  expect(version.split("\n").filter(Boolean).slice(-1)[0]).toEqual(pkg.version);
});
