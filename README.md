# Prequel-Server
Dummy GraphQL APIs for you to test your UIs with. Built with Node JS and Apollo Server.
(Only querying supported as of now. Will have mutations in the future hopefully.)

Requirements:
------------------
1. Node JS v6+

Setup:
-----------
1. Clone repo into a folder
2. 'cd' into folder
3. Run 'node index.js'
4. Now open up the server url in the browser to access the GraphQL playground. You can test your queries out in the playground before you use them in your client.

The server can be queried for the following types of data:
-----------------------------------------------------------
1. Task list.
2. Blog Posts.
3. Events.


To do:
---------
- [ ] Setup sqlite db.
- [ ] Seed data into db using faker.