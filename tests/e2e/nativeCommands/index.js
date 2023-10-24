const adbTypeText = require('./adbTypeText');
const {NativeCommandsAction} = require('./NativeCommandsAction');

const executeFromPayload = (actionName, payload) => {
    switch (actionName) {
        case NativeCommandsAction.scroll:
            throw new Error('Not implemented yet');
        case NativeCommandsAction.type:
            return adbTypeText(payload.text);
        default:
            throw new Error(`Unknown action: ${actionName}`);
    }
};

module.exports = {
    NativeCommandsAction,
    executeFromPayload,
    adbTypeText,
};
