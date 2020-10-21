# Defold TypeScript
<a href="https://discord.gg/eukcq5m"><img alt="Chat with us!" src="https://img.shields.io/discord/766898804896038942.svg?colorB=7581dc&logo=discord&logoColor=white"></a>

A dev environment for [Defold](https://defold.com/) that transpiles TypeScript into lua using [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua).

## Features
- Full Lua and Defold API type definitions for TypeScript auto-complete and type checking
- Eslint config for handeling the caveats of TypeScriptToLua and keeping your code correct
- Handles script, gui_script, and module exports using familar ES6 export syntax
- Full BoilerPlate game project ready to transpile and go
- File watcher via `npm run dev` to transpile on save

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Getting Started
- Use `npm run dev` to start a watcher that compiles and emits lua and script when you save  
- Use `npm run build` to just compile your ts, sans watcher  

## Installation
1. Fork this tempalte or use [degit](https://www.npmjs.com/package/degit) to download the template locally
```bash
npx degit @ts-defold/tsd-template --force
```

2. Initialize
```bash
npm install
```

3. Generate
```bash
npm run build # Transpile the TypeScript files to lua
# or
npm run watch # Watch for changes and regenerate files on save
```

4. Code
```
code .
```

5. Open `app/game.project` in Defold
- Start making games with TypesSript!

<p align="center" class="h4">
  TypeScript :heart: Defold
</p>
