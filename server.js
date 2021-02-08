const express = require('express')
const connectDB = require('./config/db')
const corsProtection = require('./middleware/corsProtection')
require('dotenv').config()
const app = express();
// Connect Database
connectDB()

app.get('/',(req,res) => res.send(`API Running`))
app.use(corsProtection)
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/appointment',require('./routes/appointments'))
app.use('/api/doctor',require('./routes/doctors'))
// app.use('/api/patient',require('./routes/patients'))
// app.use('/api/hospital',require('./routes/hospitals'))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./routes/api'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  