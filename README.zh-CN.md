# NeoRevived

[English](README.md) | [简体中文](README.zh-CN.md)

一个静态的、无需注册的 Pico Neo 2 头显复兴项目追踪站。所有内容均通过合并请求由社区贡献，无需编程。

## 追踪内容

- **规格参数**：硬件和软件参考文档，通过 adb 验证
- **兼容层**：运行现代应用的兼容层（部分带有嵌入式兼容性表格）
- **串流**：PC 和云串流方案
- **逆向**：系统和运行时的逆向工程
- **项目**：社区项目和研究
- **新闻**：更新和公告

## 工作原理

内容以带有 YAML 前置元数据的 Markdown 文件形式存放在 `/data/` 目录下。构建脚本（`build/build.mjs`）解析所有文件，将其内联到单个静态站点中，部署至 GitLab Pages。

## 如何贡献

1. 在 `/data/` 下选择一个目录（如 `shims`、`streaming`、`specs`）
2. 复制该目录下的 `example.md`，重命名为你的条目名称
3. 填写前置元数据和正文
4. 提交合并请求，CI 会自动验证和构建

`example.md` 文件是模板，构建时会自动跳过。

## 本地开发

```bash
npm install
npm run dev        # 在 localhost:3000 启动开发服务器，数据变更时自动重建
npm run build      # 构建静态站点到 public/
npm run validate   # 仅验证前置元数据，不构建
npm run clean      # 删除 public/
```

需要 Node 20+。

## 项目结构

```
data/          Markdown 内容（站点数据）
build/         构建脚本、模式验证、IO 辅助
src/           静态前端（HTML、CSS、JS）
public/        构建输出（自动生成，请勿手动编辑）
```

## 许可证

参见 [LICENSE](LICENSE)。
