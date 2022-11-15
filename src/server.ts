import app, { port } from './app'

import { bootstrap, syncStorage } from './helper/database';

// Start server application
app.listen(port, () => {
    // Used to start database in application
    bootstrap();
    // syncStorage();
    console.log(`Server is running on http://localhost:${port}`);
});