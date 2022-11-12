# Medium Clone (API)

It is an API to simulate Medium Blog. There is only 3 resources on this application: Writers, Posts and Topics.
Plus it be a backend service, this API is been used also in the Medium Clone (Fronted) project.

### Routes:
- [*GET*] **/writer:** Endpoint to get all writers already registred in database;
- [*POST*] **/writer:** Endpoint to add a new writer. It requires name (*string*) and avatarUrl (*string*) as an optional parameter in JSON body;
- [*PUT*] **/writer/:id:** Endpoint to update data of an already registred writer. It asks whether a name (*string*) or an avatarUrl (*string*) in JSON body;
- [*DELETE*] **/writer/:id:** Endpoint to delete a writer.
<br>
- [*GET*] **/topic:** Endpoint to get all topics already registred in database;
- [*POST*] **/topic:** Endpoint to add a new topic. It requires label (*string*) in JSON body;
- [*PUT*] **/topic/:id:** Endpoint to update data of an already registred topic. It asks a label (*string*) in JSON body;
- [*DELETE*] **/topic/:id:** Endpoint to delete a topic.
<br>
- [*GET*] **/post:** Endpoint to get all posts already registred in database;
- [*POST*] **/post:** Endpoint to add a new post. It requires title (*string*), description (*string optional*), imageUrl (*string*), readingTime (*number*), numOfLike (*number*), content (*string*), writerId (*number*) and topicId (*number*) in JSON body;
- [*PUT*] **/post/:id:** Endpoint to update data of an already registred post. It can recieve one or more of these params in JSON body: title (*string*), description (*string*), imageUrl (*string*), readingTime (*number*), numOfLike (*number*), content (*string*) or topicId (*number*);
- [*DELETE*] **/post/:id:** Endpoint to delete a post.
