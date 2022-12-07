import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import prisma from "lib/prisma";
const jwt = require("jsonwebtoken");

const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;
  // if (!firstName || !lastName || !email || !password || !mobileNumber) {
  //   res.status(402).json({ errors: "please details" });
  // }
  if (!firstName) res.status(402).json({ errors: "first name required" });
  else if (!lastName) res.status(402).json({ errors: "last name required" });

  // check email exists or not in db
  const user: any = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    //create new user
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        try {
          // hash the raw password
          const password_hash = hash;
          req.body.password = password_hash;
          // create new user
          const savedUser = await prisma.user.create({
            data: req.body,
          });
          //   res.status(200).json("user");
          // const token = jwt.sign({ id: savedUser.id }, "kiran", {
          //   expiresIn: "1h",
          // });
          // res
          //   .status(200)
          //   .json({ message: "signup is successful", xtoken: token });
          res.status(200).json({ message: "signup is successful" });
        } catch (error) {
          // if (error instanceof prisma.PrismaClientValidationError) {
          //   // res.status(400).json({ errors: error.message.split(/\n/) });
          // }
          res.status(400).json({ errors: "error" });
        }
      });
    });
  } else {
    res.status(400).json({ message: "email address already taken" });
  }
});
