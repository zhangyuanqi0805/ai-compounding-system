# Approval Calibration Learning

This is a template for a local approval-calibration file. Keep it local. Do not publish real approval data without permission.

Use this file to make default approval suggestions closer to the user's actual decisions over time. It should not be shown as the user's main review material.

## When To Read

- Before generating approval-card defaults.
- After receiving approval results from the user.
- Before the next daily review, so yesterday's corrections influence the next run.

## What To Record

For every returned approval result, append a short dated sample:

| Card | Original Default | User Changed To | User Note Or Reason | Difference Type | Next Strategy |
| --- | --- | --- | --- | --- | --- |
| Example card title | `待定-看备注` | `丢弃` | The item was already absorbed elsewhere. | duplicate / over-preservation | Do not turn already-absorbed process items into new cards. |

If the user accepts all defaults, record one line saying the defaults were verified.

## Common Difference Types

| Type | Signal | Better Next Default |
| --- | --- | --- |
| over-preservation | A useful-looking item is changed to `丢弃` | Keep evidence but avoid creating a new action unless there is a clear result or repeated use. |
| missed achievement | A completed or materially advanced goal was not included | Audit achieved goals separately from rules, drafts, and Skill candidates. |
| duplicate asset | A rule, Skill, draft, or asset already exists | State `已有` first and avoid recommending a duplicate action. |
| unclear next step | The user cannot tell what will happen after approval | Use `推荐下一步` to combine the suggested action, agent work, and user's decision boundary. |
| draft/asset confusion | A draft action is treated as asset-library approval | Separate writing approval from asset-library approval. |
| manual/update confusion | A handbook/manual update action is mixed with asset-library action | Keep handbook or manual updates as a separate approval dimension. |

## Boundary

- Do not turn one correction into a permanent rule too quickly.
- If the same difference appears twice or the user explicitly says "以后都这样", create a rule candidate for approval.
- Do not publish real user paths, thread IDs, notes, transcripts, or approval payloads in an open package.
