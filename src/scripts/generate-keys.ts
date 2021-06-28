import * as fs from 'fs';
import * as starkbank from 'starkbank';

const [privateKey, publicKey] = starkbank.key.create();

const errorHandler = (err: Error) => console.log(err || '');

fs.writeFile('private-key.pem', privateKey, errorHandler);
fs.writeFile('public-key.pem', publicKey, errorHandler);

console.log(privateKey);
console.log(publicKey);
