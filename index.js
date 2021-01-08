const fs = require("fs");
const Mustache = require("mustache");

const data = (() => {
    const documentName = "CURRICULUM VITAE";

    return { documentName };
})();

const template = fs.readFileSync("./index.mustache.tex", "utf8");

console.log(Mustache.render(template, data));
