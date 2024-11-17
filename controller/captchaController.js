const svgCaptcha = require("svg-captcha");
const User = require("../model/userModel");
const Captcha = require("../model/capchaModel");

let captchas = {}; // Temporary store for captchas

//generateCaptcha
exports.generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create();
  const captchaId = Date.now().toString();
  captchas[captchaId] = captcha.text;

  setTimeout(() => delete captchas[captchaId], 60000); // Remove after 1 minute

  res.status(200).json({ id: captchaId, svg: captcha.data });
};

//verifyCaptcha
exports.verifyCaptcha = async (req, res) => {
  const { userId, captchaId, input } = req.body;

  if (!captchas[captchaId] || captchas[captchaId] !== input) {
    return res.status(400).json({ message: "Invalid CAPTCHA" });
  }

  delete captchas[captchaId];

  let user = await User.findOne({ username: userId })
  if (!user) {
    user = await User.create({ username: userId, coins: 0 });
  }

  user.coins += 10;
  // await User.findByIdAndUpdate(user._id, { $inc: {coins: 10} } ); // Update user coins
  await user.save();

  res.status(200).json({ message: "Correct CAPTCHA", coins: user.coins });

  // Automatically Replace Expired CAPTCHAs
  exports.replaceExpiredCaptchas = async () => {
    try {
      const expiredCaptchas = await captchas.find({
        createdAt: { $lte: new Date(Date.now() - 60000) }, // Captchas older than 60s
      });

      for (const expiredCaptcha of expiredCaptchas) {
        const newCaptcha = svgCaptcha.create();
        await Captcha.findByIdAndUpdate(
          expiredCaptcha._id, 
          { text: newCaptcha.text, createdAt: new Date() },
          { new: true }
        );
      }

      console.log(`${expiredCaptchas.length} CAPTCHAs replaced.`);
    } catch (error) {
      console.error("Error replacing expired CAPTCHAs:", error.message);
    }
  };
};

