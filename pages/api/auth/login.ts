import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import prisma from "lib/prisma";
const jwt = require("jsonwebtoken");

const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email) res.status(402).json({ errors: "Email Required" });
  else if (!password) res.status(402).json({ errors: "Password Required" });

  // check user exists or not in db
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });

  if (user) {
    const authenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (authenticated) {
      const token = jwt.sign({ id: user.id }, "kiran", { expiresIn: "1h" });
      res.status(200).json({ xtoken: token });
    } else {
      res.status(401).json({ message: "please provide valid details" });
    }
  } else {
    res.status(400).json({ message: "please provide valid details" });
  }
});
