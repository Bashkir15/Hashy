const { rollup } = require('rollup');
const builtinModules = require('builtin-modules');
const args = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies).concat(builtinModules);

function getFormatAndFile() {
    if (args.es) {
        return {
            format: 'es',
            name: 'index.es.js'
        };
    }
    return {
        format: 'cjs',
        name: 'index.cjs.js'
    };
}

function build() {
    const { format, name } = getFormatAndFile();

    return rollup({
        entry: 'src/index.js',
        external
    })
    .then(({ write }) => write({
        file: `dist/${name}`,
        format
    }))
    .then(() => console.log(`Hashy built in ${format} format`))
    .catch(err => console.error(err));
}

build();
