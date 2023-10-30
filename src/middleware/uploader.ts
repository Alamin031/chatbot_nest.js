// Import the 'extname' function from the 'path' module
import { extname } from 'path';

// Function to edit the file name
export const editFileName = (req, file, callback) => {
  // Get the file extension using the 'extname' function
  const fileExtName = extname(file.originalname);

  // Generate a random name for the file by combining a random string and the current timestamp
  const randomName =
    Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('-') +
    '-' +
    Date.now();

  // Call the provided 'callback' function with the new file name
  callback(null, `${randomName}${fileExtName}`);
};

// Function to filter image files
export const imageFileFilter = (req, file, callback) => {
  // Check if the original file name matches a regular expression for image file extensions (jpg, jpeg, png, gif)
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|csv)$/)) {
    // If the file does not match the allowed extensions, return an error to the 'callback'
    return callback(new Error('Only image files are allowed!'), false);
  }

  // If the file matches an allowed extension, call the 'callback' with no errors
  callback(null, true);
};
