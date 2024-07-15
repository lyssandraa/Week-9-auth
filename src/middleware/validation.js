const isData = async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.status(422).json({ message: "data is incomplete" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

// const isLowerCase = async (req, res, next) => {
//   try {
//     const isDataLowerCase = (data) => {
//       return data === String(data).toLowerCase();
//     };
//     if (!isDataLowerCase(req.body.username)) {
//       req.body.username = req.body.username.toLowerCase();
//     }
//     next();
//   } catch (err) {
//     res.status(500).json({ message: err.message, err: err });
//   }
// };

const isLowerCase = async (req, res, next) => {
  try {
    req.body.username = req.body.username.toLowerCase();
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

const isValidEmail = async (req, res, next) => {
  try {
    const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regex.test(req.body.email)) {
      res.status(422).json({ message: "Invalid email format" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

const isValidPassword = async (req, res, next) => {
  try {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!regex.test(req.body.password)) {
      res.status(422).json({ message: "Invalid password" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

module.exports = {
  isData,
  isLowerCase,
  isValidEmail,
  isValidPassword,
};
