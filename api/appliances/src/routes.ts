import express, { Request, Response } from 'express'

import applianceDB, {
  createNew as createNewAppliance,
  findById as findApplianceById,
  update as updateAppliance,
} from './db'

const router = express.Router()

router.get('/list', (req: Request, res: Response) => {
  res.json(applianceDB)
})

// read
router.get('/:applianceId(\\d+)', (req: Request, res: Response) => {
  const applianceId = parseInt(req.params.applianceId)
  const appliance = findApplianceById(applianceId)
  if (!appliance) {
    res.status(404).json({ message: `appliance not found` })
    return
  }
  res.json(appliance)
})

//create
router.post('/', (req: Request, res: Response) => {
  // name, type
  const {
    applianceName,
    applianceType,
  }: { applianceName?: string; applianceType?: string } = req.body
  const appliance = createNewAppliance()
  const appliancePath = `${req.path}${appliance.id}`
  res.status(201).location(appliancePath).json(appliance)
})

//update
router.put('/:applianceId(\\d+)', (req: Request, res: Response) => {
  // id, name, type
  const applianceId = parseInt(req.params.applianceId)
  const { name, type }: { name?: string; type?: string } = req.body
  const appliance = findApplianceById(applianceId)
  if (!appliance) {
    res.status(404).json({ message: `appliance not found` })
    return
  }
  const updatedAppliance = updateAppliance(appliance, { name, type })
  const appliancePath = `${req.path}${updatedAppliance.id}`
  res.status(201).location(appliancePath).json(updatedAppliance)
})

export default router

/*
fetch('https://vocovorecruitmenttask-cnlx--3000.local-credentialless.webcontainer.io/appliances/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {console.log(response.status, response.headers.get('Location'));
  return response.json();
}).then(console.log);
*/

/*
fetch('https://vocovorecruitmenttask-cnlx--3000.local-credentialless.webcontainer.io/appliances/10', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: "new name", type: "new type"}),
}).then((response) => {console.log(response.status, response.headers.get('Location'));
  return response.json();
}).then(console.log);
*/
