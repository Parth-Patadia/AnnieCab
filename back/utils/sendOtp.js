const accountSid = "AC78cf87e287c71f0640642db3ff0631f5";
const authToken = "807b585bbad4b796c2aa8937c7d36062";
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = async (phone, msg) => {
  return client.messages
    .create({
      to: `+91 ${phone}`,
      from: "+1 5046134954",
      body: `${msg} expiresIn 5 minit`,
    })
    .then((message) => {})
    .catch((err) => console.log(err.message));
};
