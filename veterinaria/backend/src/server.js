import app from "./app.js";
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => console.log(`API Veterinaria en http://localhost:${puerto}`));
