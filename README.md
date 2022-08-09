# monorepo-template

> with yarn berry workspace

## 📘 목차

1. [🐈 yarn berry 시작하기](#-yarn-berry-시작하기)
2. [🛠 yarn workspace 설정하기](#-yarn-workspace-설정하기)
3. [🍭 Next.js 패키지 추가하기](#-nextjs-패키지-추가하기)
4. [✨ typescript 설정하기](#-typescript-설정하기)
5. [🧳 여러 패키지의 스크립트 한번에 실행시키기](#-여러-패키지의-스크립트-한번에-실행시키기)
6. [🔍 commitlint, commitizen 설정하기](#-commitlint-commitizen-설정하기)
7. [🥠 cypress 설정하기](#-cypress-설정하기)
   <br>
   <br>

## 🐈 yarn berry 시작하기

```bash
yarn set version berry
yarn -v
yarn init
```

프로젝트의 root폴더에서 yarn berry로 설정 및 버전 확인하고 프로젝트를 시작  
<br>

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
<br>

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
예를 들어, `next-web` package의 `dev` script를 실행하고 싶다면, `yarn next-web dev`로 실행시킬 수 있다.
<br>

## ✨ Typescript 설정하기

```bash
yarn add -D typescript prettier eslint
```

패키지 전체에 공통으로 적용할 내용은 root에 설정해주고, 각 패키지별 개별적으로 관리가 필요한 설정은 분리하여 각 패키지에 설정해주면 된다.  
우선, root에 공통 설정을 해준다.  
<br>

> ✅ vscode를 사용한다면 yarn berry에 맞춰 [sdk설정](https://yarnpkg.com/getting-started/editor-sdks#vscode)을 해줘야한다.
>
> ```bash
> yarn dlx @yarnpkg/sdks vscode
> ```
>
> sdk를 설치한 뒤, command pallette에서 `Typescript: Select Typescript Version`을 선택하여 `Use Workspace Version`을 선택한다.

<br>

```json
// package/next-web/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "include": ["next-env.d.ts", "src/**/*"],
  "exclude": ["node_modules"]
}
```

이제 개별 패키지에 typescript 설정을 적용하자.  
root의 공통 설정을 불러오고, 개별적으로 설정을 추가할 수 있다.

추가적으로 패키지에 eslint를 적용하기 위해서 다음과 같이 설정을 추가해준다.

```js
// .eslintrc.js
module.exports = {
  // ...
  overrides: [
    // ...
    {
      files: [
        'package/next-web/src/**/*.ts?(x)',
        'package/next-web/src/**/*.js?(x)',
      ],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(
              `${__dirname}/package/next-web/tsconfig.json`
            ),
          },
        },
      },
    },
    // ...
  ],
};
```

<br>

## 🧳 여러 패키지의 스크립트 한번에 실행시키기

패키지들을 순회하며 스크립트를 실행시키기 위해서는 plugin을 설치해줘야 한다.

```bash
yarn plugin import plugin-workspace-tools
```

plugin을 설치했다면, root의 package.json에 scprit를 추가해준다.

```json
{
  // ...
  "scripts": {
    // ...
    "build:packages": "yarn workspaces foreach run build",
    "test:all": "yarn workspaces foreach --parallel run test"
  }
  // ...
}
```

`foreach`를 사용하여, 패키지를 순회하며 스크립트를 실행할 수 있다.  
<br>

## 🔍 commitlint, commitizen 설정하기

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

root에 commitlint를 설치한 뒤, `commitlint.config.js`에 설정을 추가한다.

이제 commit이 실행될때 자동으로 lint를 검사하도록 설정하자.

```bash
yarn add -D husky
yarn husky install
yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

이제 [husky](https://github.com/typicode/husky)의 도움으로, git hook을 이용하여 커밋 메세지의 형식을 검사할 수 있게 되었다.  
하지만 팀의 커밋 메세지 컨벤션을 완전히 외우지 않았다면, 커밋규칙을 확인해야하는 경우가 종종 발생한다.  
`commitizen`의 도움을 받아서, 위의 문제를 해결할 수 있다.

```bash
yarn add -D commitizen cz-conventional-changelog
```

```json
{
  // ...
  "scripts": {
    // ...
    "commit": "cz"
  },
  "devDependencies": {
    // ...
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
  // ...
}
```

`commitizen`을 설치하고, `cz-conventional-changelog` 어댑터를 설정하였다.  
하지만 사실 위와 같이 설정하면 설치한 `cz-conventional-changelog`가 적용되지 않고, 다른 버전의 어댑터가 적용된다.  
이를 해결하기 위해서는 어댑터를 `unplug`해야 한다.

```bash
yarn unplug cz-conventional-changelog
```

`.yarn/unplugged/cz-conventional-changelog-npm-3.3.0-46c1d2629a`폴더가 생겼다.  
이제 경로를 다시 잡아주면 된다.

```json
{
  // ...
  "scripts": {
    // ...
    "commit": "cz"
  },
  "devDependencies": {
    // ...
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0"
  },
  "config": {
    "commitizen": {
      "path": ".yarn/unplugged/cz-conventional-changelog-npm-3.3.0-46c1d2629a/node_modules/cz-conventional-changelog"
    }
  },
  "dependenciesMeta": {
    "cz-conventional-changelog@3.3.0": {
      "unplugged": true
    }
  }
  // ...
}
```

이제 설치해준 어댑터가 정상적으로 적용된다.  
<br>

## 🥠 cypress 설정하기
