### 目录结构说明

```
1、如果 模块 不复杂，直接在 modules 文件夹里定义一个 .js 文件即可，文件命名采用 kebab-case、camelCase、 PascalCase 模式，最终挂在到 store 上的是 相应文件夹名称的 camelCase 模式
2、如果 模块 复杂，在 modules 文件夹里定义一个文件夹 进行划分，文件夹命名采用 kebab-case、camelCase、 PascalCase 模式，文件夹的 index.js 为唯一引用文件，最终挂在到 store 上的是 相应文件夹名称的 camelCase 模式
```
