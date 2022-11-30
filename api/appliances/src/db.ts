import crypto from 'crypto'
import { isNullOrUndefined } from 'util'

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

type Appliance = {
  id: number
  name: string
  type: string
  createdAt: Date
}

type ApplianceUpdate = {
  name?: string
  type?: string
}

const types = ['Set top box', 'Lightbulb', 'Smoke detector']

const appliances: Array<Appliance> = []

for (let i = 0; i < 100; i++) {
  appliances.push({
    id: i,
    name: `Appliance ${crypto.randomBytes(2).toString('hex')}`,
    type: types[Math.floor(Math.random() * types.length)],
    createdAt: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30)),
  })
}

export function findApplianceById(id: number) {
  return appliances.find((thisAppliance) => thisAppliance.id === id)
}

export function createNewAppliance(fieldsToAdd: ApplianceUpdate): Appliance {
  const newId = appliances.length
  const newAppliance = {
    id: newId,
    name:
      fieldsToAdd.name || `Appliance ${crypto.randomBytes(2).toString('hex')}`,
    type: fieldsToAdd.type || types[Math.floor(Math.random() * types.length)],
    createdAt: new Date(),
  }
  appliances.push(newAppliance)
  return newAppliance
}

export function updateAppliance(
  appliance: Appliance,
  fieldsToUpdate: ApplianceUpdate
): Appliance {
  const index = appliances.findIndex(
    (thisAppliance) => thisAppliance.id === appliance.id
  )

  if (fieldsToUpdate.name) {
    appliance.name = fieldsToUpdate.name
  }
  if (fieldsToUpdate.type) {
    appliance.type = fieldsToUpdate.type
  }

  appliances[index] = appliance
  return appliance
}

export function deleteAppliance(applianceId: number) {
  const index = appliances.findIndex(
    (thisAppliance) => thisAppliance.id === applianceId
  )
  appliances.splice(index, 1)
}

export default appliances
