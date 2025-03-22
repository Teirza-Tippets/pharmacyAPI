const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cors = require("cors");
const passport = require('./config/passport');
const { MongoClient } = require('mongodb');
const setupSwagger = require("./swagger");
const path = require('path');
// const categoryRoutes = require('./src/routes/categories/category')
const drugRoutes = require('./src/routes/drugs/medication')
const authRoutes = require('./src/routes/authRoutes')

require('dotenv').config();

setupSwagger(app);

//session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookie in production
//   })
// );

// // app.use(passport.initialize());
// // app.use(passport.session());


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
app.use(cors());


// app.use('/category', categoryRoutes);
app.use('/medication', drugRoutes);
app.use('/authRoutes', authRoutes);

//Routes 
app.get("/login", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/', (req, res) =>{
    res.render('main/medication')
});




//Sever Starting Point
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Auth running on port http://localhost:${PORT}/login`);
  console.log(`SwaggerAPI running on http://localhost:${PORT}/api-docs`);
});
