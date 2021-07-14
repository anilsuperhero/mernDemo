module.exports = {
  USER: "public/avatar",
  USER_IMAGE: "avatar",
  USER_THUMB: "public/avatar/thumb",
  USER_IMAGE_PATH: "userImage",
  DOCUMENT: "audit-document/sla",
  DOCUMENT_PATH: "public/audit-document/sla",
  DOCUMENT_IMAGE_PATH: "document",
  INVOICE_IMAGE_PATH: "invoice",
  USER_HEIGHT: 500,
  USER_WIDTH: 500,
  USER_DEFULTY_IMAGE: "static/user.svg",
  MAX_IMAGE_SIZE: 1,
  NodeMailertansport: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "manish.octalinfosolution@gmail.com", // generated ethereal user
      pass: "zjpcomprgnhqtraa", // generated ethereal password
    },
  },

  INVOICE_PATH: "public/invoices",
};
