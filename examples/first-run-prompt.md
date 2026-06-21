# First Run Prompt

## 安装提示词

```text
请使用 skill-installer 从 https://github.com/zhangyuanqi0805/codex-compounding-system/tree/main/skills/ai-compounding-system 安装 Codex 复利系统 Skill。安装完成后提醒我重启 Codex；重启后先用 3 分钟介绍告诉我它能解决什么问题、最终会得到什么，然后启动首次配置向导，逐个问题问我完成个性化设置，并先跑一个指定日期的小样。小样完成后请使用中文产物名，必须生成 `00_全局审批台.html` 和 `01_单日审批台_YYYY-MM-DD.html`，使用 Skill 自带模板和完整动作列表，并优先推荐我打开全局审批台。
```

## 重启 Codex 后

```text
Use $ai-compounding-system. 我是第一次使用，请先用 3 分钟介绍告诉我这个系统解决什么问题、我最后会得到什么；然后启动首次配置向导。你要一个问题一个问题问我，不要一次问太多；每一步告诉我推荐选项和为什么。首次小样推荐高档优先，如果我额度紧张可以先用当前默认档。
```

## 跑第一天小样

```text
Use $ai-compounding-system. 请复盘昨天的 Codex/Code Desk 工作。只生成可审批材料，不自动写规则、不自动做 Skill、不自动入库、不自动发布。产物请使用中文文件名，必须有 `00_全局审批台.html` 和 `01_单日审批台_YYYY-MM-DD.html`，最后优先推荐我打开全局审批台。
```

如果昨天没有什么工作：

```text
Use $ai-compounding-system. 昨天工作量不高，请帮我选最近 Codex/Code Desk 工作量比较高的一天，先跑一天小样。
```
