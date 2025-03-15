const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const { MongoClient } = require('mongodb');
const setupSwagger = require("./swagger");
const path = require('path');
// const categoryRoutes = require('./src/routes/categories/category')
const drugRoutes = require('./src/routes/drugs/medication')

require('dotenv').config();

setupSwagger(app);

// MongoDB Connection
const connectDB = async () => {
    try {
      const client = new MongoClient(process.env.MONGO_URI, {
        serverApi: { version: '1', strict: true, deprecationErrors: true }
      });
      await client.connect();
      console.log("Connected to MongoDB");
      app.locals.db = client.db("pharmacyAPI"); // Store DB reference
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  };
  
connectDB();


//Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(expressLayouts);

//Routes 
app.get('/', (req, res) =>{
    res.send('Welcome to the Pharmacy API!')
});

app.use('/medication', drugRoutes);
// app.use('/category', categoryRoutes);


//Sever Starting Point
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`SwaggerAPI running on http://localhost:${PORT}/api-docs`);
});
