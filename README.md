# Medium Clone (API)

It is an API to simulate Medium Blog. There is only 3 resources on this application: Writers, Posts and Topics.
Plus it be a backend service, this API is been used also in the Medium Clone (Fronted) project.

### Routes:
- [*GET*] **/writer:** Endpoint to get all writers already registred in database;
- [*POST*] **/signup:** Endpoint to add a new writer. It requires name (*string*), password (*string*) and avatarUrl (*string*) as an optional parameter in JSON body;
- [*POST*] **/signin:** Endpoint to login writer. It requires name (*string*) and password (*string*) in JSON body;
- [*PUT*] **/writer:** Endpoint to update data of an already registred writer. It asks whether a name (*string*) or an avatarUrl (*string*) in JSON body and a JWT token to identify user;
- [*DELETE*] **/writer:** Endpoint to delete a writer. It asks a JWT token to identify user.

- [*GET*] **/topic:** Endpoint to get all topics already registred in database;
- [*POST*] **/topic:** Endpoint to add a new topic. It requires label (*string*) in JSON body;
- [*PUT*] **/topic/:id:** Endpoint to update data of an already registred topic. It asks a label (*string*) in JSON body;
- [*DELETE*] **/topic/:id:** Endpoint to delete a topic.

- [*GET*] **/post:** Endpoint to get all posts already registred in database;
- [*POST*] **/post:** Endpoint to add a new post. It requires title (*string*), description (*string optional*), imageUrl (*string*), readingTime (*number*), numOfLike (*number*), content (*string*), writerId (*number*) and topicId (*number*) in JSON body;
- [*PUT*] **/post/:id:** Endpoint to update data of an already registred post. It can recieve one or more of these params in JSON body: title (*string*), description (*string*), imageUrl (*string*), readingTime (*number*), numOfLike (*number*), content (*string*) or topicId (*number*);
- [*DELETE*] **/post/:id:** Endpoint to delete a post.

- [*GET*] **/home:** Endpoint to get all information that is used in home page;
<br>

### Usage:
First, clone this repository and run `npm install` in your terminal to get all dependencies.
To run application, you should use `npm run dev`. You can also configure the database settings in *database.config.ts* and *src/lib/sequelize.ts* files.

<br>

**NOTE:** Before run tests of *post* routes, you need at least one writer and one topic in your database. Then add their *id* in *post.test.ts* file:
```javascript
const data = {
	// ...
	topicId: 1,  // Topic id here
	writerId: 1  // Writer id here
}
```
You can create a new writer calling the [*POST*] **/signup** route and a new topic calling the [*POST*] **/topic** route.
