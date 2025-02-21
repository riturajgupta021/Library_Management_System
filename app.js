const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const librarianRoutes = require('./routes/librarian.routes');
const memberRoutes = require('./routes/member.routes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/librarian', librarianRoutes);
app.use('/api/member', memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});