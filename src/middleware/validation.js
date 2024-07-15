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

const isLowerCase = async (req, res, next) => {
  try {
    const isDataLowerCase = (data) => {
      return data === String(data).toLowerCase();
    };
    if (!isDataLowerCase(req.body.username)) {
      res.status(422).json({ message: "username must be in lowercase" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

const isValidEmail = async (req, res, next) => {
  try {
    const emailRegEx = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegEx.test(req.body.email)) {
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
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!passwordRegEx.test(req.body.password)) {
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
