const presets = [
  [
    '@babel/env',
    {
      targets: '> 2%, not dead',
      useBuiltIns: 'usage',
    },
  ],
];

module.exports = { presets };
