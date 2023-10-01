import jsonServer from 'json-server';
import { v4 } from 'uuid';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const database = {
  users: [],
  notes: [],
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.get('/api/V1/find-notes', (req, _res, next) => {
  req.headers.userId = req.headers.authorization.replace('access_token-id:', '');
  next();
}, (req, res) => {
  const page = parseInt(req.headers.page);
  const limit = parseInt(req.headers.limit);

  if (!database.users.find((user) => user.id === req.headers.userId)) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }

  const filteredNotes = database.notes.filter((note) => note.userId === req.headers.userId);
  const notes = filteredNotes.slice(page * limit, (page + 1) * limit).map(note => ({
    id: note.id,
    title: note.title,
    description: note.description,
    finished: note.finished,
    timestamp: note.updatedAt,
  }));

  const nextNotes = filteredNotes.slice((page + 1) * limit, (page + 2) * limit).map(note => ({
    id: note.id,
    title: note.title,
    description: note.description,
    finished: note.finished,
    timestamp: note.updatedAt,
  }));

  return res.status(200).json({
    statusCode: 200,
    body: {
      paginatedNotes: {
        notes,
        previous: page > 0,
        next: (nextNotes && nextNotes.length > 0),
      },
    },
  });
});

server.post('/api/V1/sign-up', (req, res) => {
  if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element',
      },
    });
  }
  const user = database.users.find((user) => user.email === req.body.email);
  if (user) {
    return res.status(403).json({
      statusCode: 403,
      body: {
        name: 'Error',
        message: 'user already exists',
      },
    });
  }
  const id = v4();
  database.users.push({ ...req.body, id });
  return res.status(201).json({
    statusCode: 201,
    body: { accessToken: `access_token-id:${id}` },
  });
});

server.post('/api/V1/sign-in', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element',
      },
    });
  }
  const user = database.users.find((user) => user.email === req.body.email);
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }
  if (user.password !== req.body.password) {
    return res.status(403).json({
      statusCode: 403,
      body: {
        name: 'Error',
        message: 'password does not match',
      },
    });
  }
  return res.status(200).json({
    statusCode: 200,
    body: { accessToken: `access_token-id:${user.id}` },
  });
});

server.post('/api/V1/create-note', (req, _res, next) => {
  req.headers.userId = req.headers.authorization.replace('access_token-id:', '');
  next();
}, (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element',
      },
    });
  }

  const { title, description } = req.body;

  if (!database.users.find((user) => user.id === req.headers.userId)) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }

  const date = new Date().toISOString();

  const note = {
    id: v4(),
    title,
    description,
    finished: false,
    userId: req.headers.userId,
    createdAt: date,
    updatedAt: date,
  };

  database.notes.push(note);

  const mappedNote = {
    id: note.id,
    title: note.title,
    description: note.description,
    finished: false,
    timestamp: date,
  }

  return res.status(201).json({
    statusCode: 201,
    body: mappedNote,
  });
});

server.patch('/api/V1/update-finished-note', (req, _res, next) => {
  req.headers.userId = req.headers.authorization.replace('access_token-id:', '');
  next();
}, (req, res) => {
  const { id, finished } = req.body;

  if (!database.users.find((user) => user.id === req.headers.userId)) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }

  const date = new Date().toISOString();

  database.notes = database.notes.map((note) => {
    if (note.id === id) {
      note.finished = finished;
      note.updatedAt = date;
    }
    return note;
  });

  const note = database.notes.find(note => note.id === id);

  const mappedNote = {
    id,
    title: note.title,
    description: note.description,
    finished,
    timestamp: date,
  };

  return res.status(200).json({
    statusCode: 200,
    body: mappedNote,
  });
});

server.delete('/api/V1/delete-note', (req, _res, next) => {
  req.headers.userId = req.headers.authorization.replace('access_token-id:', '');
  next();
}, (req, res) => {
  const { id } = req.body;

  if (!database.users.find((user) => user.id === req.headers.userId)) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }

  const foundNote = database.notes.find(note => note.id === id);

  if (!foundNote?.finished) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'not does not exists OR not finished',
      },
    });
  }

  database.notes = database.notes.filter((note) => note.id !== id);

  return res.status(204).end();
});

server.put('/api/V1/update-note', (req, _res, next) => {
  req.headers.userId = req.headers.authorization.replace('access_token-id:', '');
  next();
}, (req, res) => {
  const { id, title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'missing request body element',
      },
    });
  }

  if (!database.users.find((user) => user.id === req.headers.userId)) {
    return res.status(401).json({
      statusCode: 401,
      body: {
        name: 'Error',
        message: 'user does not exists',
      },
    });
  }

  const foundNote = database.notes.find(note => note.id === id);

  if (!foundNote) {
    return res.status(400).json({
      statusCode: 400,
      body: {
        name: 'Error',
        message: 'note does not exists',
      },
    });
  }

  const date = new Date().toISOString();

  database.notes = database.notes.map((note) => {
    if (note.id === id) {
      note.title = title;
      note.description = description;
      note.finished = foundNote.finished;
      note.updatedAt = date;
    }
    return note;
  });

  const mappedNote = {
    id,
    title,
    description,
    finished: foundNote.finished,
    timestamp: date,
  };

  return res.status(200).json({
    statusCode: 200,
    body: mappedNote,
  });
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
