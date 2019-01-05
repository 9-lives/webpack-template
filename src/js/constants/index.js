import { regExp } from 'constants/regExp'

import { utils } from 'utils'

const constants = {
  regExp,
}

utils.object.deepFreeze(constants)

export {
  constants,
}
