const appSocket = require("./app");
const PORT = process.env.PORT || 3000;
appSocket.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
