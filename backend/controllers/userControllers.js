const Users = require('../modules/user-schema')
module.exports.user_post = async (req,res) => {
    console.log(req.body);
    const {email} = req.body
    const ifExist = User.find({email: email});
    if(ifExist.length === 0) {
     try {
         const res = await Users.create(req.body);
         return res.status(200).send('User added succesfully');
     } catch (error) {
        return res.status(500).send(error.message) ;
     }
    }else{
        res.status(409).send('User already exist');
    }
}