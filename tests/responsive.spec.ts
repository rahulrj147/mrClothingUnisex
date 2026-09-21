import { test, expect } from '@playwright/test';
const maps = 'https://maps.app.goo.gl/uq1vDm5DUoYcRRG16';
for (const width of [320, 390, 768, 1024, 1440]) {
 test(`complete page at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height:900 }); await page.emulateMedia({reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.goto('http://localhost:3000/', {waitUntil:'networkidle'});
  await expect(page.locator('h1')).toHaveText('Style thatspeaksfor you.');
  await expect(page.locator('#visit')).toContainText('+91 77366 74966');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  for (const id of ['home','collections','about','gallery','visit']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  const badLinks=await page.locator('a').evaluateAll((links)=>links.filter(a=>a.textContent.includes('Directions')&&a.href!=='https://maps.app.goo.gl/uq1vDm5DUoYcRRG16').map(a=>a.href));
  expect(badLinks).toEqual([]);
  if(width<768){
   const toggle=page.getByRole('button',{name:'Open navigation'});
   await toggle.click(); await expect(page.locator('#mobile-menu')).toBeVisible();
   await page.keyboard.press('Escape'); await expect(page.locator('#mobile-menu')).toHaveCount(0);
   await expect(toggle).toBeFocused();
   await toggle.click(); await page.locator('#mobile-menu').getByRole('link',{name:'Collections'}).click();
   await expect(page.locator('#mobile-menu')).toHaveCount(0);
   await expect(page.locator('.mobile-actions')).toBeVisible();
   await expect(page.locator('.mobile-actions a').last()).toHaveAttribute('href',maps);
  } else { await expect(page.locator('.mobile-actions')).toBeHidden(); }
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
  await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager')); await page.waitForFunction(()=>Array.from(document.images).every(img=>img.complete && img.naturalWidth>0));
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
  expect(broken).toEqual([]);
  await page.screenshot({path:`test-results/desktop-${width}.png`,fullPage:true});
  expect(errors).toEqual([]);
 });
}

