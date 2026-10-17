"""Screenshot every route at desktop and mobile widths into shots/. Usage: python3 scripts/shots.py [base_url]"""
import sys, os, asyncio
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
ROUTES = ["/", "/defense/iris", "/defense/mantis", "/defense/orin", "/civilian/iris-civ", "/company", "/company/careers", "/company/events", "/privacy-policy"]
OUT = os.path.join(os.path.dirname(__file__), "..", "shots")
os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for width, height, tag in [(1440, 900, "1440"), (390, 844, "390")]:
            ctx = await browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1)
            page = await ctx.new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            for r in ROUTES:
                await page.goto(BASE + r, wait_until="networkidle")
                await page.wait_for_timeout(600)
                name = (r.strip("/").replace("/", "-") or "home")
                await page.screenshot(path=os.path.join(OUT, f"{name}-{tag}.png"), full_page=True)
                print("shot", name, tag, "errors:", errors[-3:] if errors else "none")
                errors.clear()
            # nav open state on home (desktop only)
            if width == 1440:
                await page.goto(BASE + "/", wait_until="networkidle")
                await page.hover("text=For Defense")
                await page.wait_for_timeout(900)
                await page.screenshot(path=os.path.join(OUT, f"home-nav-open-{tag}.png"), full_page=False)
                await page.goto(BASE + "/defense/iris", wait_until="networkidle")
                await page.hover("text=For Defense")
                await page.wait_for_timeout(900)
                await page.screenshot(path=os.path.join(OUT, f"iris-nav-open-{tag}.png"), full_page=False)
                # tile hover
                await page.goto(BASE + "/", wait_until="networkidle")
                await page.mouse.wheel(0, 900)
                await page.wait_for_timeout(300)
                tile = page.locator(".t-iris")
                await tile.hover()
                await page.wait_for_timeout(500)
                await page.screenshot(path=os.path.join(OUT, f"home-tile-hover-{tag}.png"), full_page=False)
            await ctx.close()
        await browser.close()

asyncio.run(main())
