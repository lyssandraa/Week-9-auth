const postTest = async (req, res) => {
  console.log("postTest controller hit and username: ", req.body.username);
  try {
    res.status(201).json({ message: "success", body: req.body });
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

module.exports = {
  postTest,
};
