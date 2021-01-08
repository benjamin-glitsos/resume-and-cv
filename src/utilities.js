const chalk = require("chalk");
const { STATE } = require("./state");
const { settings } = require("./settings");

module.exports.logNumber = () =>
    chalk`{magenta.bold ${
        settings.general.programName
    } (${STATE.taskNumber++}):} `;

module.exports.argSettingOrDefault = (
    commandLineArguments,
    selections,
    defaultVal
) =>
    commandLineArguments.find(el => Object.values(selections).includes(el)) ||
    defaultVal;
