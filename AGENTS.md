請使用繁體中文與我溝通。

## Agent skills

### Issue tracker

Issues live as GitHub issues in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical labels with default names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout. See `docs/agents/domain.md`.

## 部署注意事項

正式站是 Cloudflare Pages（`https://hulab.pages.dev`），不是 `/Web` project path。部署前必須用 `ASTRO_BASE=none ASTRO_SITE=https://hulab.pages.dev ASTRO_OUT_DIR=dist npm run build`，再執行 `npx wrangler pages deploy dist --project-name hulab`。不要在 bash/Git Bash 使用 `set ASTRO_BASE=none`，也不要直接部署預設 `npm run build` 的 `/Web` 產物；否則 CSS、圖片與 JS 會全部指向錯誤路徑。部署前確認 `dist` 沒有 `"/Web/_astro/`，並先檢查 `git diff`。
