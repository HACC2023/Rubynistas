const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sendPaymentEmail = async (user, subject) => {
  if (user && user.email) {
    const msg = {
      to: user.email,
      from: 'ZeroWaste@gmail.com',
      subject: subject,
    };

    try {
      await sgMail.send(msg);
      console.log('Payment simulation email sent successfully.');
    } catch (error) {
      console.error('Error sending payment simulation email:', error);
    }
  } else {
    console.error('Invalid user or missing email address.');
  }
};

module.exports = sendPaymentEmail;
