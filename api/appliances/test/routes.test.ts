import app from '../src/app'
import supertest from 'supertest'

const requestWithSupertest = supertest(app)

describe('Get Appliance List', () => {
  test('GET /appliances/list should show all appliances', async () => {
    const res = await requestWithSupertest.get('/appliances/list')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveLength(100)
  })
})
