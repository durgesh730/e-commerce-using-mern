import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('not valid email')
         }
      }
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   type: {
      type: String,
      enum: ["user", "admin"],
      required: true,
   }

});

export default mongoose.model("user", userSchema);