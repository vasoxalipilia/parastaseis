import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  // Get the destination path based on the file type or any other criteria
  const destinationPath = getDestinationPath(file);

  callback(null, `${destinationPath}/${name}-${randomName}${fileExtName}`);
};

// Customize the destination path based on the file type or other criteria
// function getDestinationPath(file) {
//   if (file.mimetype.startsWith('image')) {
//     return './uploads/images';
//   } else if (file.mimetype.startsWith('audio')) {
//     return './uploads/audios';
//   } else if (file.mimetype.startsWith('video')) {
//     return './uploads/videos';
//   } else {
//     return './uploads/others';
//   }
// }
function getDestinationPath(file) {
  if (file.originalname.startsWith('cover')) {
    return './static/uploads/coverImages';
  } else if (file.originalname.startsWith('simple')) {
    return './static/uploads/simpleImages';
  } else {
    return './static/uploads';
  }
}
