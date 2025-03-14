const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
// const { MongoClient } = require('mongodb');
const path = require('path');
const categoryRoutes = ('./src/routes/category')
const mainRoutes = ('./src/routes/main')

require('dotenv').config();

// MongoDB Connection
// const connectDB = async () => {
//     try {
//       const client = new MongoClient(process.env.MONGO_URI, {
//         serverApi: { version: '1', strict: true, deprecationErrors: true }
//       });
//       await client.connect();
//       console.log("Connected to MongoDB");
//       app.locals.db = client.db("...."); // Store DB reference
//     } catch (error) {
//       console.error("MongoDB Connection Error:", error);
//       process.exit(1);
//     }
//   };
  
// connectDB();


//Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(expressLayouts);

//Routes 
app.get('/', (req, res) =>{
    res.send('Welcome to the Pharmacy API!')
})


//Sever Starting Point
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
