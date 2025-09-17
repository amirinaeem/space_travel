// SpaceTravelApi.js — thin async wrapper around the mock API with response envelope
import Mock from './SpaceTravelMockApi.js'

// Simulate a slight network delay for UX (and to show the loading component)
const delay = (ms) => new Promise(res => setTimeout(res, ms))
const LATENCY = 350

async function wrap(fn) {
  try {
    const data = await fn()
    await delay(LATENCY)
    return { isError: false, data }
  } catch (err) {
    await delay(LATENCY)
    const msg = (err && err.message) ? err.message : String(err)
    return { isError: true, data: msg }
  }
}

const Api = {
  getPlanets: () => wrap(() => Mock.getPlanets()),
  getSpacecrafts: () => wrap(() => Mock.getSpacecrafts()),
  getSpacecraftById: ({ id }) => wrap(() => Mock.getSpacecraftById({ id })),
  buildSpacecraft: (payload) => wrap(() => Mock.buildSpacecraft(payload)),
  destroySpacecraftById: ({ id }) => wrap(() => Mock.destroySpacecraftById({ id })),
  sendSpacecraftToPlanet: ({ spacecraftId, targetPlanetId }) =>
    wrap(() => Mock.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }))
}

export default Api
