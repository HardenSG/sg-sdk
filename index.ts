const progress = require('src/terminal/progress')
const { emitProgressUpdate } = progress({ maxValue: 100 })
emitProgressUpdate(1)
