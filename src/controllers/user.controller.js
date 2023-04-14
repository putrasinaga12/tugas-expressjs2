const {user} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = (req, res, next) => {
    res.send({
        message: 'respon api user',
        name: 'Putra',
        Alamat: 'Medan'
    });
};

exports.register = async (req, res) => {
    try {
        const insertData =req.body

        const hashedPassword = bcrypt.hashSync(insertData.password, 8)
        
        const regis = await user.create({
          firstname: insertData.firstname,  
          lastname: insertData.lastname,  
          username: insertData.username,  
          email: insertData.email,  
          password: hashedPassword
        })
        res.status(201).send({
            message: 'user created',
            id: regis.id
        })
    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const payLoad = req.body
        const getUser = await user.findOne({
            where: {email: payLoad.email}
        })

        if(!getUser) return res.status(404).send('user not found')

        const comparePassword = bcrypt.compareSync(payLoad.password, getUser.dataValues.password)

        if(comparePassword){
            const token = jwt.sign({id: getUser.dataValues.id, email: getUser.dataValues.email}, process.env.JWT_SECRET, {expiresIn: 3600})
            return res.status(200).send({
                message: 'login success',
                token: token
            })
        } else {
            return res.status(400).send('invalid password')
        }

    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}

exports.getDetailUser = async (req, res) => {
    try {
        const params = req.params.id
        const getUser = await user.findOne({
            where: {email: req.user.email}
        })

        if (req.user.id !== params) return res.status(403).send('cannot access another user details')

        res.status(200).send({
            message: 'data user retrieved',
            data: getUser
        })
    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const params = req.params.id
        const deletedUser = await user.destroy({
            where: {id: params}
        }) 

        res.status(200).send({
            message: 'data user deleted',
        })
    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const params = req.params.id
        let updatedUser = await user.update(req.body, {where: {id: params}})

        res.status(200).send({
            message: 'data user updated',
        })
    } catch (error) {
        return res.status(500).send({
            error: error
        })
    }
}