const chalk = require("chalk");
const { STATE } = require("./state");
const { settings } = require("./settings");

module.exports.logNumber = () =>
    chalk`{magenta.bold ${settings.general.programName.toUpperCase()} (${STATE.taskNumber++}):} `;
