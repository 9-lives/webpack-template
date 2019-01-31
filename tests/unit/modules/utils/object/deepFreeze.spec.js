import {
  expect,
} from 'chai'
import {
  deepFreeze,
} from 'utils/object/deepFreeze'

describe('utils/object/deepFreeze', () => {
  const o = deepFreeze({
    a: 0,
    b: {
      ba: 0,
      bb: {},
    },
  })

  it('freeze an object recursively', () => {
    recursiveExpect(o)
  })
})

function recursiveExpect(o) {
  if (typeof o === 'object' && o !== null) {
    expect(o).to.be.frozen

    for (let p of Object.values(o)) {
      recursiveExpect(p)
    }
  }
}
