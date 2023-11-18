import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSONStream from 'JSONStream';

const router = express.Router();
let jsonData; // Variable to store the loaded JSON data

// Load JSON data when the server starts
const currentFileURL = import.meta.url;
const currentDir = path.dirname(fileURLToPath(currentFileURL));
const filePath = path.join(currentDir, '..', 'files', 'top_cities.json');

try {
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const jsonStream = JSONStream.parse('*');

    stream.pipe(jsonStream);

    jsonStream.on('data', data => {
        jsonData = data;
    });

    jsonStream.on('end', () => {
        console.log('JSON data loaded successfully.');
    });

    jsonStream.on('error', error => {
        console.error('Error parsing JSON data:', error);
    });
} catch (error) {
    console.error('Error loading JSON data:', error);
}

router.get('/getData', (req, res) => {
    const keyAtLevel1 = req.query.key1;
    const keyAtLevel2 = req.query.key2;

    try {
        const value = getValue(jsonData, keyAtLevel1, keyAtLevel2);

        if (value !== null) {
            res.json({ key1: keyAtLevel1, key2: keyAtLevel2, value });
        } else {
            res.status(404).json({ error: `Key not found: ${keyAtLevel1}.${keyAtLevel2}` });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function getValue(data, keyAtLevel1, keyAtLevel2) {
    if (data && data[keyAtLevel1] && data[keyAtLevel1][keyAtLevel2]) {
        return data[keyAtLevel1][keyAtLevel2];
    }
    return null;
}

export default router;
