import { hash, verify } from "argon2";
import User from "./user.model.js"

export const getUserById = async(req, res) => {
    try{
        const {uid} = req.params
        const user = await User.findById(uid)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            user
        })


    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async(req, res) =>{
    try{
        const {limit = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, users ] = await Promise.all([
            User.countDocuments(query), 
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar el usuario",
            error: err.message
        })
    }
}

export const deleteUser = async(req, res) =>{
    try{
        const {uid} = req.params

        const user = await User.findByIdAnUpdate(uid, {status: false}, {new:true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async(req, res) =>{
    try{
        const{ uid } = req.params
        const{ newPassword } = req.body

        const user = await User.findById(uid)

        const matchPassword = await verify(user.password, newPassword)
        
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAnUpdate(uid, {password: encryptedPassword})

        return res.estatus(200).json({
            success: true,
            message: "Constraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        })
    }
}