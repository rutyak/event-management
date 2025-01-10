const fetchController = (type) => {
  return async (req, res) => {
    try {
      const data = await type.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = fetchController;