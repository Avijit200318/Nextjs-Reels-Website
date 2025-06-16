import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

// to create the data type of the schema
export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    udpatedAt?: Date;
}

// this <> shape is used to declear the data type
const userSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

// creating pre hooks that will run before the data is saved to database. use this bellow function to use this
userSchema.pre('save', async function(next) {
    // this line will check if the password filled is updated or not
    if(this.isModified("password")){
        // this line automatically change the passwrod into hashed password
        this.password = await bcrypt.hash(this.password, 10);
    }
    // if we did't update the password then go next
    next();
})

// Since we created new model we have to add its type
const User = models?.User || model<IUser>("User", userSchema);

export default User;