const { execSync } = require("child_process");
const chalk = require("chalk");
const { metadata } = require("./metadata");

module.exports.identity = x => x;

module.exports.reverse = ls => ls.slice().reverse();

module.exports.logMessage = message =>
    console.log(
        chalk`{magenta.bold ${metadata.general.programName}:} {blue ${message}}`
    );

module.exports.argSettingOrDefault = (
    commandLineArguments,
    selections,
    defaultVal
) =>
    commandLineArguments.find(el => Object.values(selections).includes(el)) ||
    defaultVal;

module.exports.execSyncPrint = command => {
    execSync(command, { stdio: "inherit" });
};
