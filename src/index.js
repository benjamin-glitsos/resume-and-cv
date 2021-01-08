const path = require("path");
const fs = require("fs");
const Mustache = require("mustache");
const chalk = require("chalk");
const match = require("switchcase");
const { STATE } = require("./state");
const { metadata } = require("./metadata");
const {
    identity,
    reverse,
    logOutput,
    argSettingOrDefault,
    execSyncPrint
} = require("./utilities");

try {
    console.log(process.cwd());
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

        output.introduction = (() => {
            const BAIntro =
                "Two years' experience in business analysis and project management of web applications and information systems. Additional years' experience in web development and professional writing. Skilled in verbal and written communication and driven by a strong passion for technology.";

            const PMIntro =
                "Two years' experience in project management and business analysis of web applications and information systems. Additional years' experience in web development and professional writing. Skilled in verbal and written communication and driven by a strong passion for technology.";

            const QAIntro =
                "Two years' experience in quality assurance and business analysis of web applications and information systems. Additional years' experience in web development and professional writing. Skilled in verbal and written communication and driven by a strong passion for technology.";

            return match({
                [jobTypes.PM]: PMIntro,
                [jobTypes.QA]: QAIntro,
                default: BAIntro
            })(jobType);
        })();

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

    const templatePathTex = path.join(
        ".",
        "resources",
        "template.mustache.tex"
    );
    const outputPath = extension =>
        path.join(".", `${data.documentName} of Benjamin Glitsos.${extension}`);
    const outputPathTex = outputPath("tex");
    const outputPathPdf = outputPath("pdf");

    const template = fs.readFileSync(templatePathTex, "utf8");

    fs.writeFileSync(outputPathTex, Mustache.render(template, data));

    logOutput(outputPathTex);

    execSyncPrint(`pdflatex "${outputPathTex}"`);

    logOutput(outputPathPdf);
} catch (error) {
    console.error(error);
}
