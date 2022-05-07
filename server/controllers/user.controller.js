const User = require('../models/user.model');

const { generateToken } = require('../utils/generatewebtoken');

const loginUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userExists = await User.findOne({ userId });
    console.log('userexists', userExists);
    if (!userExists) {
      //has not signed in before
      //uses google sign-in
      console.log('doesnt exist fired');
      const userCreated = await User.create(req.body);
      const token = generateToken(userId);

      res.status(201).send({ ...userCreated, token, newUser: true });
    } else {
      console.log('token fired');

      const token = generateToken({ userId });
      //   console.log('token', token);
      res.status(201).send({ ...userExists, token });
      // jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' }),
    } 
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  //   const { userId } = req.body;
  try {
    //conso
    console.log('registering', req.body);
    const userCreated = await User.create(req.body);
    res.status(201).send(userCreated);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

// function getAllUsers(req, res) {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

// function createUser(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const categories = req.body.categories;
//   const image = req.body.image;

//   const newUser = new User({
//     username,
//     password,
//     categories,
//     image,
//   });

//   newUser
//     .save()
//     .then(() => res.json('User added'))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

// function deleteUser(req, res) {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User deleted'))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

module.exports = {
  //   getAllUsers,
  //   createUser,
  //   deleteUser,
  registerUser,
  loginUser,
};