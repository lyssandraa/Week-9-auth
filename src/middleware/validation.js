const isData = async (req, res, next) => {
  console.log("isData middleware hit and username: ", req.body.username);
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

module.exports = {
  isData,
};
