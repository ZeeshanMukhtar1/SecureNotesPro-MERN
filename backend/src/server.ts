import app from './app';
import mongoose from 'mongoose';
import  Validated__Env  from './Utill/ValidEnv';
const PORT = Validated__Env.PORT;

mongoose.connect(Validated__Env.Mongo__connection__String).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
})
.catch((err) => {
  console.error('Error occured',err);
})

