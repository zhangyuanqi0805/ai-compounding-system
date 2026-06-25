#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mainSkill = "skills/codex-compounding-system";
const legacySkill = "skills/ai-compounding-system";

const checks = [];

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function expectFile(relativePath) {
  checks.push({
    label: `exists: ${relativePath}`,
    ok: fs.existsSync(file(relativePath)),
  });
}

function expectIncludes(relativePath, text) {
  const content = fs.existsSync(file(relativePath)) ? read(relativePath) : "";
  checks.push({
    label: `${relativePath} includes ${text}`,
    ok: content.includes(text),
  });
}

function expectAllIncludes(relativePath, texts) {
  for (const text of texts) {
    expectIncludes(relativePath, text);
  }
}

function expectNotIncludes(relativePath, text) {
  const content = fs.existsSync(file(relativePath)) ? read(relativePath) : "";
  checks.push({
    label: `${relativePath} does not include ${text}`,
    ok: !content.includes(text),
  });
}

for (const relativePath of [
  `${mainSkill}/SKILL.md`,
  `${mainSkill}/agents/openai.yaml`,
  `${mainSkill}/templates/00_全局审批台.template.html`,
  `${mainSkill}/templates/01_单日审批台.template.html`,
  `${mainSkill}/assets/approval-workbench-mac.css`,
  `${mainSkill}/assets/approval-workbench.js`,
  `${mainSkill}/schemas/approval-actions.json`,
  `${legacySkill}/SKILL.md`,
  `${legacySkill}/agents/openai.yaml`,
]) {
  expectFile(relativePath);
}

expectAllIncludes("README.md", [
  "# Codex 复利系统",
  "https://github.com/zhangyuanqi0805/codex-compounding-system",
  "skills/codex-compounding-system",
  "主技术调用名是 `$codex-compounding-system`",
  "旧 `$ai-compounding-system` 和 `$single-day-review` 只作为兼容入口",
]);

expectAllIncludes(`${mainSkill}/SKILL.md`, [
  "name: codex-compounding-system",
  "# Codex Compounding System",
  "Codex 复利系统",
  "templates/00_全局审批台.template.html",
  "templates/01_单日审批台.template.html",
  "schemas/approval-actions.json",
  "local approval workbench are the source of truth",
  "public/open-source package",
  "Stability And Sync Gate",
  "Claiming the Skill, templates, or public package are stable without running the stability and sync gate",
  "太棒了",
  "全局复利与踩坑日志",
  "高档优先",
  "超高档",
]);

expectAllIncludes(`${legacySkill}/SKILL.md`, [
  "name: ai-compounding-system",
  "compatibility alias for codex-compounding-system",
  "load and follow the new main entry",
]);

expectAllIncludes(`${mainSkill}/agents/openai.yaml`, [
  "display_name: \"Codex复利系统\"",
  "$codex-compounding-system",
]);

expectAllIncludes(`${legacySkill}/agents/openai.yaml`, [
  "Codex复利系统（旧入口兼容）",
  "$codex-compounding-system",
]);

expectAllIncludes(`${mainSkill}/references/onboarding-guide.md`, [
  "第 0.4 步",
  "愿意",
  "暂时不",
  "忽略",
  "我可以建议在你的文档目录下新建一个 `数字资产库` 文件夹",
  "全局复利与踩坑日志",
]);

expectAllIncludes(`${mainSkill}/references/approval-calibration-learning.md`, [
  "This is a template",
  "Keep it local",
  "Do not publish real approval data without permission",
  "Common Difference Types",
  "Do not turn one correction into a permanent rule too quickly",
]);

expectAllIncludes(`${mainSkill}/references/writing-feedback-learning.md`, [
  "Keep it local",
  "Default Writing Checks",
  "Ask whether the user wants to continue from first draft to polished draft or public draft",
  "Do not paste sensitive transcripts into this file",
]);

expectAllIncludes(`${mainSkill}/references/approval-ui-style-guide.md`, [
  "必须优先复制模板",
  "不允许从零生成另一套审批台",
  "canonical source is local first",
  "human approval",
  "trial-run",
  "approved compact total-desk layout",
  "approval state must be derived from durable result files",
  "Do not downgrade a date to `待审批`, `无主审卡`, or `仅回看`",
  "每张卡必须提供完整主动作列表",
  "输出后自检",
]);

expectAllIncludes(`${mainSkill}/templates/01_单日审批台.template.html`, [
  "太棒了",
  "复制审批结果",
  "app-shell",
  "windowbar",
  "sidebar",
  "card",
  "写全局规则",
  "写项目规则",
  "写复利日志",
  "直接做 Skill",
  "主题摘要通过-写初稿",
  "初稿通过-写拓展稿",
  "再改主题摘要",
  "待定-看备注",
  "丢弃",
]);

expectAllIncludes(`${mainSkill}/assets/approval-workbench.js`, [
  "apcMaintenanceManualAction",
]);

expectAllIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, [
  "app-shell",
  "windowbar",
  "sidebar",
  "inspector",
  "total-date-card",
  "flex-wrap: wrap",
  ".total-shell .inspector { display: none; }",
  "grid-template-columns: minmax(0, 1fr)",
  "总审批台",
  "审批规则",
  "主动作单选",
  "备注需复制审批结果",
]);

for (const relativePath of [
  `${mainSkill}/templates/00_全局审批台.template.html`,
  `${mainSkill}/templates/01_单日审批台.template.html`,
]) {
  expectNotIncludes(relativePath, "acs-shell");
}

expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "class=\"wrap\"");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "class=\"search\"");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "<section class=\"hero\"");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "{{INTERNAL_REVIEW_HREF}}");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, ">内部稿<");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "本地成熟口径");
expectNotIncludes(`${mainSkill}/templates/00_全局审批台.template.html`, "恢复来源");
expectNotIncludes(`${mainSkill}/assets/approval-workbench-mac.css`, ".acs-shell");

for (const relativePath of [
  "README.md",
  "examples/config-template.md",
  "examples/first-run-prompt.md",
  "examples/one-line-install-prompt.txt",
  "examples/three-minute-intro.md",
  `${mainSkill}/SKILL.md`,
  `${mainSkill}/agents/openai.yaml`,
  `${legacySkill}/SKILL.md`,
  `${legacySkill}/agents/openai.yaml`,
  `${mainSkill}/references/first-run-value-intro.md`,
  `${mainSkill}/references/onboarding-guide.md`,
]) {
  expectNotIncludes(relativePath, "AI 复利系统");
  expectNotIncludes(relativePath, "AI复利系统");
  expectNotIncludes(relativePath, "Codex/Code Desk");
  expectNotIncludes(relativePath, "CodeDesk");
  expectNotIncludes(relativePath, "Code Desk");
  expectNotIncludes(relativePath, "zhangyuanqi0805/ai-compounding-system");
}

for (const relativePath of [
  `${mainSkill}/SKILL.md`,
  `${legacySkill}/SKILL.md`,
  `${mainSkill}/references/approval-calibration-learning.md`,
  `${mainSkill}/references/writing-feedback-learning.md`,
]) {
  expectNotIncludes(relativePath, "/Users/zhangyuanqi");
  expectNotIncludes(relativePath, "2026-06-");
  expectNotIncludes(relativePath, "老大");
}

const failed = checks.filter((check) => !check.ok);
if (failed.length) {
  console.error(`FAILED ${failed.length}/${checks.length} checks`);
  for (const item of failed) {
    console.error(`- ${item.label}`);
  }
  process.exit(1);
}

console.log(`PASS ${checks.length} checks`);
