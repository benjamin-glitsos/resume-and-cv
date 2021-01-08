const fs = require("fs");
const Mustache = require("mustache");
const { execSync } = require("child_process");
const chalk = require("chalk");
const match = require("switchcase");
const { STATE } = require("./state");
const { metadata } = require("./metadata");
const {
    identity,
    reverse,
    logNumber,
    argSettingOrDefault
} = require("./utilities");

try {
    Mustache.tags = metadata.mustache.customTags;
    Mustache.escape = identity;

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

        const output = {};

        output.documentName = match({
            [documentTypes.CV]: "CV",
            default: "Resume"
        })(documentType);

        output.headerName = match({
            [documentTypes.CV]: "CURRICULUM VITAE",
            default: String.raw`R\'{E}SUM\'{E}`
        })(documentType);

        output.introduction = match({
            default:
                "Three years' experience in account management involving business analysis and project management of web applications and information systems. Skilled in written and verbal communication and driven by a strong passion for technology."
        })(jobType);

        output.topItems = (() => {
            const items = [
                "Business analysis for an information system of an ASX50 company.",
                "Project management of large-scale web developments along with ERP integration."
            ];

            return match({
                [jobTypes.PM]: reverse(items),
                [jobTypes.QA]: reverse(items),
                default: items
            })(jobType);
        })();

        return output;
    })();

    const templatePath = "./resources/template.mustache.tex";
    const outputPath = `./output/${data.documentName} of Benjamin Glitsos.tex`;

    const template = fs.readFileSync(templatePath, "utf8");

    fs.writeFileSync(outputPath, Mustache.render(template, data));

    console.log(logNumber() + chalk`Wrote to {blue ${outputPath}}`);
} catch (error) {
    console.error(error);
}

try {
    // execSync(`pdflatex ${data.outputPath}`);
    console.log(logNumber() + chalk`Wrote to {blue ${""}}`);
} catch (error) {
    console.error(error);
}
