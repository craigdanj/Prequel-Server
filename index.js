const { ApolloServer, gql } = require('apollo-server');

const tasks = [
    {
        name: "Leo sed condimentum a sodales ante justo aliquam.",
        completed: false
    },
    {
        name: "Diam vulputate a condimentum scelerisque.",
        completed: false
    },
    {
        name: " Ligula eleifend cursus ullamcorper vel potenti",
        completed: false
    },
    {
        name: "Imperdiet eget netus gravida a mattis proin nullam.",
        completed: false
    },
    {
        name: "Curae ad cum ut dis vitae vestibulum diam.",
        completed: false
    }
];

const posts = [
    {
        title: "Leo sed condimentum a sodales ante justo aliquam.",
        content: "Lacinia eget nibh eu egestas etiam laoreet a a at vehicula cubilia nam mollis mus a ac lacinia a parturient suscipit sem molestie. Sociosqu nam a ac vivamus a dapibus faucibus duis amet sem vestibulum cursus id neque enim platea erat purus a vestibulum velit accumsan a elit. A sit rhoncus adipiscing sed a tellus feugiat commodo et duis consequat a cubilia rhoncus justo. Ligula a suspendisse ornare ut adipiscing parturient vulputate vestibulum vestibulum torquent odio pharetra a himenaeos a a suscipit primis sem a mus posuere adipiscing et. Senectus urna cum dui cum mi nulla aliquet praesent facilisis aenean commodo cum dictum ultrices conubia luctus inceptos phasellus quisque hac posuere congue magna. Posuere mauris a vel fringilla a a eu posuere dignissim eget hac inceptos odio proin a mollis sodales."
    },
    {
        title: "Diam vulputate a condimentum scelerisque.",
        content: "Maecenas morbi ac pharetra netus id consequat nam ullamcorper suspendisse ornare molestie augue eros donec scelerisque a parturient. Consectetur et hac vestibulum tristique nisl accumsan mi est in platea ut adipiscing mi a hac scelerisque natoque aliquet condimentum magna. Platea adipiscing commodo vestibulum duis quis fermentum eleifend mi montes facilisi consectetur adipiscing varius auctor a justo habitasse nam ut a orci integer tortor bibendum. Laoreet quam varius vestibulum pretium ullamcorper parturient nam dis hendrerit malesuada eleifend consectetur risus iaculis adipiscing platea auctor consectetur diam hac rhoncus. Consectetur habitant ad sit a montes condimentum suspendisse penatibus a curabitur nisi cubilia est risus adipiscing."
    },
    {
        title: " Ligula eleifend cursus ullamcorper vel potenti.",
        content: "Interdum volutpat class cubilia erat vestibulum id duis ut bibendum porta tempus dictumst laoreet sagittis erat consectetur malesuada. Hendrerit enim ligula massa hac parturient risus commodo odio a parturient suspendisse a volutpat condimentum consectetur vestibulum dapibus. Facilisis hendrerit donec aptent porttitor fringilla est leo quisque conubia posuere diam urna netus non urna et ac. Dis adipiscing a sed vestibulum cursus parturient cum ullamcorper per vel diam parturient aliquam conubia a cubilia turpis elit imperdiet."
    },
    {
        title: "Imperdiet eget netus gravida a mattis proin nullam.",
        content: "Netus sem inceptos parturient id ullamcorper class est adipiscing mus at eleifend suspendisse a at penatibus porttitor vestibulum per ullamcorper urna. Suspendisse dictum per duis condimentum ante laoreet nam dictumst sit ultricies enim fermentum nibh torquent molestie ridiculus ridiculus augue parturient magnis senectus convallis gravida dolor a enim. Mollis pulvinar posuere a ullamcorper consectetur et a feugiat rutrum facilisi consequat accumsan eu vestibulum a posuere. Aliquet a quis mi ullamcorper nisi ullamcorper adipiscing vestibulum id vehicula ut leo lorem netus natoque suspendisse feugiat."
    },
    {
        title: "Curae ad cum ut dis vitae vestibulum diam.",
        content: "A sed a adipiscing nam mi parturient orci faucibus sagittis aliquet libero inceptos morbi ultricies a ullamcorper a bibendum iaculis a blandit hendrerit luctus ac a a ad. A tortor eros volutpat mattis mi hac a penatibus tristique adipiscing nullam et venenatis tincidunt vestibulum pulvinar proin erat. Fames a a auctor facilisis felis ullamcorper parturient nibh malesuada penatibus quis fermentum netus ipsum nascetur ligula. Ullamcorper phasellus tempus pretium montes eget vestibulum felis diam id platea nam a gravida egestas mi scelerisque a consequat ut. Parturient eleifend fermentum nec rutrum nam sit ullamcorper nec laoreet a cum adipiscing ac vestibulum eget a condimentum netus. Consequat ligula nibh a suspendisse in a a nec quis ut ultricies scelerisque id donec sociis."
    }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Task" type can be used in other type declarations.
  type Task {
    name: String
    completed: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    tasks: [Task]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve tasks from the "tasks" array above.
const resolvers = {
  Query: {
    tasks: () => tasks,
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
