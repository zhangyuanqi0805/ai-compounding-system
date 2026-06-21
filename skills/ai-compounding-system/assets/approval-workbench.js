const ACS_PRIMARY_ACTIONS = [
  "写全局规则",
  "写项目规则",
  "写复利日志",
  "直接做 Skill",
  "主题摘要通过-写初稿",
  "初稿通过-写拓展稿",
  "再改主题摘要",
  "待定-看备注",
  "丢弃"
];

const ACS_ADDITIONAL_ACTIONS = [
  "补截图候选",
  "二次查重",
  "转项目线索",
  "标记教学案例",
  "补证据索引",
  "追问用户",
  "生成初稿后追问是否继续成稿"
];

const ACS_ASSET_ACTIONS = [
  "不处理资产库",
  "建议入库_复制正本",
  "暂留工作区",
  "待用户确认",
  "禁止入库",
  "不入库",
  "初稿候选入库",
  "另建素材包"
];

function acsCollectApprovalResult(meta = {}) {
  const cards = [...document.querySelectorAll("[data-acs-card-id]")];
  return {
    approvalVersion: meta.approvalVersion || document.body.dataset.approvalVersion || "v2-public-fixed-action-schema",
    exportedAt: new Date().toISOString(),
    decisions: cards.map((card) => {
      const id = card.dataset.acsCardId;
      const primary = card.querySelector(`input[name="primary-${CSS.escape(id)}"]:checked`)?.value || "";
      const asset = card.querySelector(`input[name="asset-${CSS.escape(id)}"]:checked`)?.value || "";
      const additional = [...card.querySelectorAll(`input[name="additional-${CSS.escape(id)}"]:checked`)].map((item) => item.value);
      const note = card.querySelector("[data-acs-note]")?.value || "";
      return {
        id,
        title: card.querySelector("[data-acs-title]")?.textContent?.trim() || "",
        primaryAction: primary,
        additionalActions: additional,
        digitalAssetAction: asset,
        note,
        changed: card.dataset.defaultPrimaryAction !== primary || card.dataset.defaultAssetAction !== asset || note.trim().length > 0
      };
    })
  };
}

async function acsCopyApprovalResult(meta = {}) {
  const output = document.querySelector("[data-acs-output]");
  const status = document.querySelector("[data-acs-copy-status]");
  const payload = JSON.stringify(acsCollectApprovalResult(meta), null, 2);

  if (output) {
    output.value = payload;
  }

  try {
    await navigator.clipboard.writeText(payload);
    if (status) status.textContent = "已复制，可以回到 Codex 粘贴。";
    return;
  } catch (error) {
    if (output) {
      output.focus();
      output.select();
      try {
        document.execCommand("copy");
        if (status) status.textContent = "已复制，可以回到 Codex 粘贴。";
        return;
      } catch (fallbackError) {
        if (status) status.textContent = "复制失败，请手动全选下面的审批结果，再粘贴回 Codex。";
      }
    }
  }
}

function acsMarkSelectedChoices() {
  document.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach((input) => {
    const update = () => {
      document.querySelectorAll(`input[name="${CSS.escape(input.name)}"]`).forEach((item) => {
        item.closest("label")?.classList.toggle("is-selected", item.checked);
      });
    };
    input.addEventListener("change", update);
    update();
  });
}

document.addEventListener("DOMContentLoaded", acsMarkSelectedChoices);
