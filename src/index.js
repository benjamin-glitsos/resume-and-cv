const fs = require("fs");
const Mustache = require("mustache");
const { execSync } = require("child_process");
const chalk = require("chalk");
const match = require("switchcase");
const { STATE } = require("./state");
const { metadata } = require("./metadata");
const { logNumber, argSettingOrDefault } = require("./utilities");

const data = (() => {
    const commandLineArguments = process.argv.slice(2);

    const { documentTypes, jobTypes } = metadata.selections;

    const documentType = argSettingOrDefault(
        commandLineArguments,
        documentTypes,
        documentTypes.RESUME
    );

    const jobType = argSettingOrDefault(
        commandLineArguments,
        jobTypes,
        jobTypes.BA
    );

    const documentNameText = match({
        [documentTypes.CV]: "CV",
        default: "Resume"
    })(documentType);

    const documentNameLatex = match({
        [documentTypes.CV]: "CURRICULUM VITAE",
        default: String.raw`R\'{E}SUM\'{E}`
    })(documentType);

    const outputPath = "./output/output.tex";

    return { outputPath, documentNameLatex };
})();

try {
    const template = fs.readFileSync(
        "./resources/template.mustache.tex",
        "utf8"
    );

    fs.writeFileSync(
        data.outputPath,
        Mustache.render(template, data, {}, metadata.mustache.customTags)
    );

    console.log(logNumber() + chalk`Wrote to {blue ${data.outputPath}}`);
} catch (error) {
    console.error(error);
}

try {
    // execSync(`pdflatex ${data.outputPath}`);
} catch (error) {
    console.error(error);
}
