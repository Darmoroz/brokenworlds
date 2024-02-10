import fs from 'fs';
import chalk from 'chalk';

export async function saveToJSONFile(filePath, fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 4), err => {
      if (err) {
        return reject(err);
      }
      console.log(`File was saved successfully: ${chalk.green(filePath + fileName)}`);
      resolve();
    });
  });
}

export async function appendToJSONFile(filePath, fileName, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(`${filePath}${fileName}`, `${JSON.stringify(data, null, 4)},\n`, err => {
      if (err) {
        reject(err);
      } else {
        console.log(`Info was add successfully to file: ${chalk.green(filePath + fileName)}`);
        resolve();
      }
    });
  });
}

export async function saveDataCSV(data, fileName) {
  const savePath = `../data/${fileName}.csv`;
  return new Promise((resolve, reject) => {
    fs.writeFile(savePath, data, err => {
      if (err) {
        return reject(err);
      }
      console.log(
        chalk.green('File was saved successfully: ') + chalk.blue.bgWhite.bold(fileName) + '\n'
      );
      resolve();
    });
  });
}
