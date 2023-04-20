const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const {matricula, password} = req.body

        // find user
        const user = await User.findOne({where: {matricula: matricula }})

        if(!user){

            
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')

            return

        }

        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){

            req.flash('message', 'Senha inválida')
            res.render('auth/login')

            return

        }

            // initialize session
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res) {

        const {name,  matricula, password, confirmpassword } = req.body

        //password match validation
        if(password != confirmpassword){
            //mensagem

            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return

        }



        // check if user exists
        const checkIfUserExists = await User.findOne({where: {matricula:  matricula}})

        if(checkIfUserExists){
            req.flash('message', 'A  matricula já está em uso!')
            res.render('auth/register')

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(8)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            matricula,
            password: hashedPassword
        }

        try {
           const createdUser =  await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

          
        } catch (err) {
            console.log(err)
        }
    
    }
    
    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

}


