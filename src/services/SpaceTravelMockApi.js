// SpaceTravelMockApi.js — localStorage-based mock backend
// NOTE: In the original starter, this file is provided and shouldn't be edited.
// This implementation mirrors the expected behavior so this repo is self-contained.

const STORAGE_KEYS = {
  PLANETS: 'space_travel_planets',
  SPACECRAFTS: 'space_travel_spacecrafts'
}

function load(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try { return JSON.parse(raw) } catch { return fallback }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)) }

function seed() {
  const planets = load(STORAGE_KEYS.PLANETS, null)
  const spacecrafts = load(STORAGE_KEYS.SPACECRAFTS, null)
  if (!planets) {
    const seeded = [
      { id: 1, name: 'Earth', currentPopulation: 5_000_000_000, pictureUrl: 'https://images.unsplash.com/photo-1451186859696-371d9477be93?q=80&w=600' },
      { id: 2, name: 'Mars', currentPopulation: 120_000_000, pictureUrl: 'https://images.unsplash.com/photo-1580421920725-918b9f56a1c6?q=80&w=600' },
      { id: 3, name: 'Venus', currentPopulation: 80_000_000, pictureUrl: 'https://images.unsplash.com/photo-1580421795691-1d9e9ecc7ef0?q=80&w=600' },
      { id: 4, name: 'Titan', currentPopulation: 45_000_000, pictureUrl: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=600' }
    ]
    save(STORAGE_KEYS.PLANETS, seeded)
  }
  if (!spacecrafts) {
    const seeded = [
      { id: 'SC-0001', name: 'Odyssey', capacity: 100_000_000, description: 'A reliable interplanetary transport vessel.', pictureUrl: '', currentLocation: 1 },
      { id: 'SC-0002', name: 'Seraphim', capacity: 60_000_000, description: 'High-efficiency quantum drive.', pictureUrl: '', currentLocation: 2 }
    ]
    save(STORAGE_KEYS.SPACECRAFTS, seeded)
  }
}
seed()

function assertRequired(obj, fields) {
  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null || String(obj[f]).trim() === '') {
      throw new Error(`${f} is required`)
    }
  }
}

const Mock = {
  getPlanets() {
    return load(STORAGE_KEYS.PLANETS, [])
  },

  getSpacecrafts() {
    return load(STORAGE_KEYS.SPACECRAFTS, [])
  },

  getSpacecraftById({ id }) {
    const list = load(STORAGE_KEYS.SPACECRAFTS, [])
    const found = list.find(s => String(s.id) === String(id))
    if (!found) throw new Error('Spacecraft not found')
    return found
  },

  buildSpacecraft({ name, capacity, description, pictureUrl }) {
    assertRequired({ name, capacity, description }, ['name', 'capacity', 'description'])
    const crafts = load(STORAGE_KEYS.SPACECRAFTS, [])
    const id = `SC-${Date.now().toString().slice(-6)}`
    const craft = {
      id,
      name: String(name),
      capacity: Number(capacity),
      description: String(description),
      pictureUrl: pictureUrl || '',
      currentLocation: 1 // Earth
    }
    crafts.push(craft)
    save(STORAGE_KEYS.SPACECRAFTS, crafts)
    return craft
  },

  destroySpacecraftById({ id }) {
    const crafts = load(STORAGE_KEYS.SPACECRAFTS, [])
    const idx = crafts.findIndex(s => String(s.id) === String(id))
    if (idx === -1) throw new Error('Spacecraft not found')
    crafts.splice(idx, 1)
    save(STORAGE_KEYS.SPACECRAFTS, crafts)
    return true
  },

  sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    const crafts = load(STORAGE_KEYS.SPACECRAFTS, [])
    const planets = load(STORAGE_KEYS.PLANETS, [])
    const craft = crafts.find(s => String(s.id) === String(spacecraftId))
    if (!craft) throw new Error('Spacecraft not found')
    const from = planets.find(p => p.id === craft.currentLocation)
    const to = planets.find(p => p.id === Number(targetPlanetId))
    if (!from || !to) throw new Error('Invalid planet')
    if (from.id === to.id) throw new Error('Target planet must differ from current location')

    const passengers = Math.min(Number(craft.capacity), Number(from.currentPopulation))
    from.currentPopulation = Number(from.currentPopulation) - passengers
    to.currentPopulation = Number(to.currentPopulation) + passengers
    craft.currentLocation = to.id

    save(STORAGE_KEYS.PLANETS, planets)
    save(STORAGE_KEYS.SPACECRAFTS, crafts)
    return { passengers }
  }
}

export default Mock
