const { ApolloServer, gql } = require('apollo-server');
const Sequelize = require('sequelize');
const _ = require('lodash');

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


// =========================
// TASKS
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
            name: 'AAAAAA',
            completed: false
        });
    })
});


// =========================
// POSTS
// =========================

const PostModel = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
PostModel.sync({force: true}).then(() => {
    // Table created

    _.times(10, () => {
        return PostModel.create({
            title: 'Leo sed condimentum a sodales ante justo aliquam.',
            content: "Lacinia eget nibh eu egestas etiam laoreet a a at vehicula cubilia nam mollis mus a ac lacinia a parturient suscipit sem molestie. Sociosqu nam a ac vivamus a dapibus faucibus duis amet sem vestibulum cursus id neque enim platea erat purus a vestibulum velit accumsan a elit. A sit rhoncus adipiscing sed a tellus feugiat commodo et duis consequat a cubilia rhoncus justo. Ligula a suspendisse ornare ut adipiscing parturient vulputate vestibulum vestibulum torquent odio pharetra a himenaeos a a suscipit primis sem a mus posuere adipiscing et. Senectus urna cum dui cum mi nulla aliquet praesent facilisis aenean commodo cum dictum ultrices conubia luctus inceptos phasellus quisque hac posuere congue magna. Posuere mauris a vel fringilla a a eu posuere dignissim eget hac inceptos odio proin a mollis sodales."
        });
    })
});


// =========================
// EVENTS
// =========================

const EventModel = sequelize.define('events', {
    name: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    dateTime: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW
    }
});

// force: true will drop the table if it already exists
EventModel.sync({force: true}).then(() => {
    // Table created

    _.times(10, (index) => {
        return EventModel.create({
            name: 'Leo sed condimentum a sodales ante justo aliquam.',
            place: index + "Geneva"
        });
    })
});


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
    dateTime: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    tasks: [Task]
    posts: [Post]
    events: [Event]

  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve tasks from the "tasks" array above.
const resolvers = {
  Query: {
    tasks: () =>  TaskModel.findAll(),
    posts: () => PostModel.findAll(),
    events: () => EventModel.findAll()
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });


// This `listen` method launches a web-server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
