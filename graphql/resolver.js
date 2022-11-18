const utils = require('../utils')

const root = {
    getEvents: () => {
        return utils.getEvents();
    },
    getEventsByEmail:  ({ email }) => {
        return utils.getEventsByEmail(email)
    }
};

module.exports = root