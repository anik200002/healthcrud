const express = require('express');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');  
const profileRoutes=require('./routes/profileRoutes');
const addressRoutes = require('./routes/addressRoutes');
const healthInfoRoutes = require('./routes/healthInfoRoutes');
const lifestyleInfoRoutes = require('./routes/lifestyleInfoRoutes');
const insurancePolicyRoutes = require('./routes/insurancePolicyRoutes'); 
 const familyRoutes = require('./routes/familyRoutes');
 const planRoutes = require('./routes/planRoutes');
 const whitelistedDomainRoutes = require('./routes/whitelistedDomainRoutes');
 const branchRoutes = require('./routes/branchRoutes');
 const timeSlotRoutes = require('./routes/timeSlotRoutes');




require('dotenv').config();
const app = express();
const db=require('./config');

app.use(express.json());  
app.use('/api/auth', authRoutes); 
app.use('/api', doctorRoutes);
app.use('/api',profileRoutes);
app.use('/api', addressRoutes);
app.use('/api',healthInfoRoutes);
app.use('/api',lifestyleInfoRoutes);
app.use('/api',insurancePolicyRoutes);
app.use('/api', familyRoutes); 
app.use('/api',planRoutes);
app.use('/api', whitelistedDomainRoutes);  
app.use('/api',branchRoutes);
app.use('/api', timeSlotRoutes);  




app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
