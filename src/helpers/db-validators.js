import User from "../user/user.model.js"
 
export const existeEmail = async(email= '') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El Email ${email} ya fue registrado previamente`)
    }
}
 
export const existeUsername = async(username = '') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El usuario ${username} ya fue registrado previamente`)
    }
}

export const userExists = async(uid = '') =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("El usuario no existe")
    }
}