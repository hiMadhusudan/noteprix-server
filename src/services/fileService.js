// src/services/fileService.js

const File = require('../models/fileModel');

const saveFile = async (sender, receiver, file) => {
  const newFile = new File({
    sender,
    receiver,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size
  });

  await newFile.save();
  return newFile;
};

const getFiles = async (senderId, receiverId) => {
  return await File.find({
    sender: senderId,
    receiver: receiverId
  });
};

module.exports = {
  saveFile,
  getFiles
};
