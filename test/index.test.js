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

test('Should encode text with SHA256', async t => {
    const hash = await getHash('./test/fixtures/text.md', 'sha256');
    t.snapshot(hash);
});

test('Should encoding WOFF with SHA256', async t => {
    const hash = await getHash('./test/fixtures/font.woff', 'sha256');
    t.snapshot(hash);
});

test('Should encode JPEG with SHA256', async t => {
    const hash = await getHash('./test/fixtures/image.jpeg');
    t.snapshot(hash);
});

test('Get hashed name for text', async t => {
    const hash = await getHashedName('./test/fixtures/text.md');
    t.snapshot(hash);
});

test('Get hashed name for WOFF', async t => {
    const hash = await getHashedName('./test/fixtures/font.woff');
    t.snapshot(hash);
});

test('Get hashed named for JPEG', async t => {
    const hash = await getHashedName('./test/fixtures/image.jpeg');
    t.snapshot(hash);
});
