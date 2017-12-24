import test from 'ava';
import { getHash, getHashedName } from '../src/index';

test('Should encode text', async t => {
    const hash = await getHash('./test/fixtures/text.md');
    t.snapshot(hash);
});

test('Should encode WOFF', async t => {
    const hash = await getHash('./test/fixtures/font.woff');
    t.snapshot(hash);
});

test('Should encode jpeg', async t => {
    const hash = await getHash('./test/fixtures/image.jpeg');
    t.snapshot(hash);
});
