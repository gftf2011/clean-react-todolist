import jsonServer from 'json-server'
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const database = {
  users: [],
  notes: []
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.get('/api/V1/find-notes', (req, res) => {
  const notes = database.notes
  return res.status(200).jsonp({
    statusCode: 200,
    body: {
      paginatedNotes: {
        notes,
        previous: false,
        next: false
      }
    }
  })
})

server.post('/api/V1/sign-up', (req, res) => {
  if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element'
      }
    })
  }
  const user = database.users.find(user => user.email === req.body.email)
  if (user) {
    return res.status(403).json({
      statusCode: 403,
      body: {
        name: 'Error',
        message: 'user already exists'
      }
    })
  }
  database.users.push({ ...req.body, id: database.users.length })
  return res.status(201).json({
    statusCode: 201,
    body: { accessToken: 'access_token-id:' + database.users.length }
  })
})

server.post('/api/V1/sign-in', (req, res) => {
  if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element'
      }
    })
  }
  const user = database.users.find(user => user.email === req.body.email)
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists'
      }
    })
  }
  return res.status(200).json({
    statusCode: 200,
    body: { accessToken: 'access_token-id:' + user.id }
  })
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})