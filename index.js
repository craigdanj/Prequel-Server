const { ApolloServer, gql } = require('apollo-server');
const Sequelize = require('sequelize');
const _ = require('lodash');
const faker = require('faker');

const sequelize = new Sequelize('db', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.\n');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Setting seed for consistent results
faker.seed(123);


// =========================
// TASKS MODEL
// =========================

const TaskModel = sequelize.define('tasks', {
    name: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN
    }
});

// force: true will drop the table if it already exists
TaskModel.sync({force: true}).then(() => {
    // Table created

    _.times(10, () => {
        return TaskModel.create({
            name: faker.random.words(),
            completed: false
        });
    })
});


// =========================
// POSTS MODEL
// =========================

const PostModel = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
});

PostModel.sync({force: true}).then(() => {

    _.times(10, () => {
        return PostModel.create({
            title: faker.lorem.sentence(),
            content: faker.lorem.sentences()
        });
    })
});


// =========================
// EVENTS MODEL
// =========================

const EventModel = sequelize.define('events', {
    name: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW
    }
});

EventModel.sync({force: true}).then(() => {
    _.times(10, () => {
        return EventModel.create({
            name: faker.random.words(),
            place: faker.address.city(),
            date: faker.date.future()
        });
    })
});


//-------------------------------------------------------------
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # These types can be used in other type declarations.
  type Task {
    name: String
    completed: Boolean
  }

  type Post {
    title: String
    content: String
  }

  type Event {
    name: String
    place: String
    date: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    tasks: [Task]
    posts: [Post]
    events: [Event]

  }
`;

//-------------------------------------------------------------
// Resolvers define the technique for fetching the types in the
// schema.

const resolvers = {
  Query: {
    tasks: () =>  TaskModel.findAll(),
    posts: () => PostModel.findAll(),
    events: () => EventModel.findAll()
  },
};

//-------------------------------------------------------------
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });


// This `listen` method launches a web-server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
