# Prequel-Server
GraphQL APIs that serve up dummy data for you to test your UIs with. Built with Node JS and Apollo Server.
(Only querying supported as of now. Will have mutations in the future hopefully.)

Requirements:
------------------
1. Node JS v6+

Setup:
-----------
1. Clone repo.
2. `cd` into the folder.
3. Run `npm start`.
4. Open up the server url in the browser to access the GraphQL playground. You can test your queries out in the playground before you use them in your client.

The server can be queried for the following types of data:
-----------------------------------------------------------
1. Task list.
```graphql
query {
  tasks{
    name
    completed
  }
}
```
2. Blog Posts.
```graphql
query {
  posts{
    title
    content
  }
}
```
3. Events.
```graphql
query {
  events{
    name
    dateTime
    place
  }
}
```


To do:
---------
- [ ] Add mutations.