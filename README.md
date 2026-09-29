# yyxx · 静态博客

一个零依赖的个人博客模板，全部由 HTML、CSS 和 JavaScript 构成。不需要安装任何软件，不需要服务器，双击 `index.html` 就能预览，发布也是免费的。

## 目录结构

```text
my-blog/
├─ index.html          # 首页
├─ posts.html          # 全部文章列表
├─ about.html          # 关于页
├─ 404.html            # 页面不存在时显示
├─ assets/
│  ├─ css/style.css    # 全部样式
│  ├─ js/main.js       # 深色模式、移动端菜单、阅读进度
│  └─ images/          # 文章封面图
└─ posts/              # 文章页面
```

## 本地预览

两种方式任选：

1. 直接双击打开 `index.html`
2. 在 `my-blog` 文件夹里打开终端，运行：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`

## 修改网站信息

- 站名、标语、首页介绍：修改 `index.html` 顶部 hero 区域
- 关于页：修改 `about.html`
- 网站标题和描述：修改每个页面 `<head>` 里的 `title` 和 `meta description`

## 写新文章

1. 复制 `posts/hello-world.html`，重命名为新文件名，比如 `posts/my-new-post.html`
2. 修改日期、分类、标题、摘要和正文内容
3. 封面图：把图片放进 `assets/images/`，然后在文章里修改 `img` 的 `src`；不用封面图的话删掉那一段 `img` 即可
4. 把新文章加进首页的“最近更新”和“最新文章”列表，以及 `posts.html` 的文章列表

每次新增文章后，把更新过的文件重新发布一次即可。

## 免费发布

### 方式一：GitHub Pages

1. 注册并登录 [github.com](https://github.com)
2. 点右上角 `+`，选择 `New repository` 新建仓库
3. 仓库名随意，比如 `my-blog`
4. 进入仓库，点 `Add file > Upload files`，把 `my-blog` 文件夹里的所有文件上传到仓库根目录，然后提交
5. 进入仓库的 `Settings > Pages`
6. `Source` 选 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`，点 `Save`
7. 等待 1 到 2 分钟，访问 `https://你的用户名.github.io/my-blog/`

如果仓库名是 `你的用户名.github.io`，发布后直接访问 `https://你的用户名.github.io/`。

### 方式二：Vercel

1. 注册并登录 [vercel.com](https://vercel.com)
2. 点 `Add New > Project`
3. 选择导入 GitHub 仓库，或直接上传 `my-blog` 文件夹
4. 保持默认设置，点 `Deploy`
5. 完成后会得到一个免费域名

### 方式三：Netlify

1. 注册并登录 [app.netlify.com](https://app.netlify.com)
2. 点 `Add new site > Deploy manually`
3. 把 `my-blog` 文件夹拖进页面
4. 网站会自动上线并生成免费域名

## 国内访问提示

- GitHub Pages 和 Vercel 在国内访问可能较慢或偶尔不稳定，可以试试 Cloudflare Pages
- 如果以后绑定自己的域名且服务部署在中国大陆，需要完成 ICP 备案；免费托管服务大多使用海外节点，通常不需要备案

## 小贴士

- `posts/` 里的页面要用 `../assets/...` 的路径，首页和列表页用 `assets/...`，别混用
- 想换封面图，直接替换 `assets/images/` 里同名图片即可
- 以后想加评论、搜索等功能，可以接入 giscus、utteranc、Algolia 等第三方服务
