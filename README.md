# monorepo-template

> with yarn berry workspace

## 📘 목차

1. [🐈 yarn berry 시작하기](#🐈-yarn-berry-시작하기)
2. [🛠 yarn workspace 설정하기](#🛠-yarn-workspace-설정하기)
3. [🍭 Next.js 패키지 추가하기](#🍭-nextjs-패키지-추가하기)
4. [✨ typescript 설정하기](#✨-typescript-설정하기)
   <br>
   <br>

## 🐈 yarn berry 시작하기

```bash
yarn set version berry
yarn -v
yarn init
```

프로젝트의 root폴더에서 yarn berry로 설정 및 버전 확인하고 프로젝트를 시작

## 🛠 yarn workspace 설정하기

```json
{
  "name": "monorepo-template",
  "private": true,
  "workspaces": {
    "packages": ["package/*"]
  },
  "packageManager": "yarn@3.2.1"
  //...
}
```

yarn workspace를 사용하기 위해, package폴더(다른 이름을 사용해도 된다)를 만들고 위와 같이 설정한다.  
앞으로 추가할 패키지들은 package폴더의 하위에 구성하면 된다.

## 🍭 Next.js 패키지 추가하기

```bash
cd package
yarn create next-app --typescript
```

package폴더로 이동하여 Next.js 프로젝트를 생성한다.

```bash
├── package
│   └── next-web
│       ├── //...
│       ├── tsconfig.json
│       └── package.json
└── package.json
```

대략 위와 같은 구조가 될 것이다.

```json
{
  //...
  "script": {
    "next-web": "yarn workspaces next-web"
  }
  //...
}
```

root의 package.json에 script를 추가하여, root경로에서 패키지의 script를 실행시킬 수 있다.

## ✨ Typescript 설정하기
