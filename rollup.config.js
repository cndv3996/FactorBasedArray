import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'build/src/index.d.ts',
        output: {
            file: 'index.d.ts'
        },
        plugins: [dts()]
    }
]