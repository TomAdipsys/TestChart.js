const PORT = 3000; // ou récupéré depuis une variable d'environnement si besoin
const BASE_URL = `http://localhost:${PORT}`;

// Pour fetch :
const parameters = new URL(`${BASE_URL}/nbraccess`);