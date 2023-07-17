
const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryptjs = require ('bcryptjs')

const userSchema = new mongoose.Schema ( {
    username : {
        type: String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(value)){
                throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
  
    roles: {
        type: [String],
        default: ['Employee']
      },
      active: {
        type: Boolean,
        default: true
      }
  
})




userSchema.virtual ('notes' , {
    ref: 'Note',
    localField : "_id",
    foreignField :"user"
 }) 

 userSchema.pre ("save" , async function ()  {
    const user = this   //  => Document 

    if (user.isModified('password')) {
     user.password = await bcryptjs.hash(user.password, 10)
    }
})
const User = mongoose.model( 'User' , userSchema  )


module.exports = User