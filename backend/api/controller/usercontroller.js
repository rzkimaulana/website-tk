const { user } = require("../../models");
const loginValidation = require("../../validation/user");
require("dotenv/config");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const buatuser = async (req, res) => {
  try {
    const { errors } = loginValidation.validateCreatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const { username, email, password, passwordConfirm, } = req.body;
    if (password != passwordConfirm) {
      return res.status(400).json({
        message: "Password Tidak Sama",
      });
    }

    const cekEmail = await user.findOne({ where: { email: email } });
    if (cekEmail) {
      return res.status(400).json({
        errors: ["Email sudah terdaftar"],
      });
    }

    const userbaru = await user.create({
      username,
      email,
      password,
    });

    const token = signToken(userbaru.id)

    return res.status(201).json({
      message: "Registration Berhasil",
      user:userbaru,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Registration Gagal",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "Fail",
        message: "Gagal login failed",
        errors: "Email dan Password di isi dong",
      });
    }

    const userLogin = await user.findOne({ where: { email: req.body.email } });
    if (!userLogin || !(await userLogin.cariPassword(req.body.password))) {
      return res.status(400).json({
        status: "Gagal",
        message: "Gagal login",
        errors: "Email atau password tidak di temukan",
      });
    }

    const token = signToken(userLogin.id);

    return res.status(200).json({
      status: "Success",
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan server",
      errors: error.message,
    });
  }

};




module.exports = {
  buatuser,
  loginUser
};