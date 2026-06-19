module.exports = {

default: {

require: [
'features/step-definitions/*.js'
],

format: [
'progress'
],

timeout: 60000,
publish: false,
parallel: 1
}
};
