
import  {Request, Response} from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User'

const signupUser= async (req: Request, res: Response) =>{
   
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hashSync(password, salt);

          const newUser = new User({
            username,
            email,
            password: hashedPassword
          })
          await newUser.save();

          console.log(newUser);

          if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
              
            })
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }

    } catch (error) {
      res.status(500).send({ message: 'Error creating user' });
      console.log(error)
    }
}



const signinUser = async (req: Request, res: Response) =>{
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send({ message: 'Invalid email or password' });
        }
        
        console.log(user);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, "jwtsecret" , { expiresIn: '30d' });

        if (user && isPasswordValid) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token 
        })
    }

      } catch (error) {
        res.status(500).send({ message: 'Error signing in' });
        console.log(error)
      }
}


export { signupUser, signinUser }
