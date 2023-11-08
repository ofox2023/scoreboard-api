const path = require("path");
const uid = require("harsh-uid");

const fileUpload = (req, resp) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.send({ status: "FAILURE", message: "File not found" });
    }

    const files = Array.isArray(req.files.file)
        ? req.files.file
        : [req.files.file];

    const _files = [];

    files.forEach((item, index) => {
        const fileName =
            uid(25) +
            "." +
            item.name.split(".")[item.name.split(".").length - 1];

        const uploadPath = path.join(process.cwd(), "files", fileName);

        item.mv(uploadPath, (err) => {
            if (err) {
                console.log(
                    "🚀 ~ file: fileUpload.js:13 ~ files[0].mv ~ err:",
                    err
                );
                return resp.send({ status: "FAILURE" });
            } else {
                _files.push("/files/" + fileName);
                if (files.length - 1 === index) {
                    return resp.send({ status: "SUCCESS", data: _files });
                }
            }
        });
    });
};

module.exports = fileUpload;
