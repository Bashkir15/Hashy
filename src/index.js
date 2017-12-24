import Big from 'big.js';
import { Stream } from 'xxhash';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const BaseTables = {
  26: "abcdefghijklmnopqrstuvwxyz",
  32: "123456789abcdefghjkmnpqrstuvwxyz", // no 0lio
  36: "0123456789abcdefghijklmnopqrstuvwxyz",
  49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", // no lIO
  52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", // no 0lIO
  62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
};

export function transformBuffer(buffer, base, max) {
    const table = BaseTables[base];
    if (!table) {
        throw new Error(`Hashy does not support ${base} encoding`);
    }

    const readLength = buffer.length;

    Big.DP = 0;
    Big.rm = 0;

    let b = new Big(0);
    for (let i = readLength - 1; i >= 0; i--) {
        b = b.times(256).plus(buffer[i]);
    }

    let output = '';
    while (b.gt(0)) {
        output = table[b.mod(base)] + output;
        b = b.div(base);
    }

    Big.DP = 20;
    Big.RM = 1;

    return max === null
        ? output
        : output.slice(0, max)
}

export function getHash(
    file,
    hash = 'xxhash',
    base = 52,
    max = 10
) {
    return new Promise((resolve, reject) => {
        try {
            const hasher = hash === 'xxhash'
                ? new Stream(0xcafebabe, 'buffer')
                : createHash(hash);

            createReadStream(file)
                .pipe(hasher)
                .on('finish', () => resolve(transformBuffer(hasher.read(), base, max)));
        } catch (err) {
            reject(err);
        }
    });
}
