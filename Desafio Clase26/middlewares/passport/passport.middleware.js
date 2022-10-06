const passport = require("passport");
const Users = require("../../users");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//  FUNCION PARA VALIDAR PASSWORD

const isValidePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

// MIDDLEWARES PARA VER SI EXISTE USUARIO
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    let user = Users.find((user) => user.username === username);

    if (!user) {
      console.log(`No existe el usuario ${username}`);
      return done(null, false, { message: "User not found" });
    }

    if (!isValidePassword(user, password)) {
      console.log("Password Incorrecto");
      return done(null, false, { message: "Password Incorrecto" });
    }

    done(null, user);
  })
);

passport.use(
  "singup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      let user = Users.find((user) => user.username === username);
      const { name, email } = req.body;

      if (user) {
        console.log(`El usuario ${username} ya existe`);
        return done(null, false, { message: "User already exists" });
      }

      let newUser = {
        id: Users.length + 1,
        username,
        // password: createHash(password),
        password,
        name,
        email,
      };

      Users.push(newUser);

      return done(null, newUser.id);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = User.find((user) => user.id === id);

  done(null, user);
});

module.exports = passport;
