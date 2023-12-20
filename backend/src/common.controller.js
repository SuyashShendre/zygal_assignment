import jwt from "jsonwebtoken";
import cookie from "cookie";
import { data } from "./data.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    let user = data.reduce((ele) => {
      if (ele.email_id == email && ele.password == password) {
        console.log(ele);
        return true;
      } else {
        return false;
      }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, "secretkey", { expiresIn: "1h" });

    const myCookie = cookie.serialize("token", token, {
      maxAge: 100000,
      httpOnly: true,
      path: "/",
    });
    res.setHeader("Set-Cookie", myCookie);
    res
      .status(200)
      .send({ success: true, message: "login successfully", token });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const storeMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Please provide a message" });
    }

    const serializedCookie = cookie.serialize("userMessage", message, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.setHeader("Set_Cookie", serializedCookie);
    res.json({ success: true, message: "Message stored in cookie." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const clearCookie = async (req, res) => {
  try {
    const expiredCookie = cookie.serialize("userMessage", "", {
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", expiredCookie);

    res.json({ success: true, message: "Cookie removed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  try {
    const expiredCookie = cookie.serialize("token", "", {
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", expiredCookie);

    res.json({ success: true, message: "successfully logout." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
