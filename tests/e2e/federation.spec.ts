import { test, expect } from '@playwright/test';
test.beforeEach(async({page})=>{
 await page.route('**/api/v1/session',r=>r.fulfill({json:{authenticated:true,subject:'synthetic',displayName:'Usuario de prueba',membershipReady:false}}));
 await page.route('**/api/v1/platform/*',r=>r.fulfill({json:{service:'test-service',domain:'test',stage:'foundation',businessFeaturesReady:false}}));
});
test('loads two real remote bundles and keeps shell navigation',async({page})=>{
 const loaded:string[]=[];page.on('response',r=>{if(r.url().includes('remoteEntry.js'))loaded.push(r.url());});
 await page.goto('/');await expect(page.getByRole('heading',{name:'Tu comunidad. Un mismo lugar.'})).toBeVisible();await page.screenshot({path:'test-results/foundation-desktop.png',fullPage:true});await page.getByRole('link',{name:'Académico',exact:true}).click();await expect(page.getByTestId('academic-remote')).toBeVisible();
 await page.getByRole('link',{name:'Aprendizaje',exact:true}).click();await expect(page.getByTestId('learning-remote')).toBeVisible();
 expect(loaded.some(x=>x.includes(':4174/'))).toBeTruthy();expect(loaded.some(x=>x.includes(':4175/'))).toBeTruthy();
});
test('remote unavailable leaves shell and other remote usable',async({page})=>{
 await page.route('http://localhost:4175/**',r=>r.abort());await page.goto('/#/learning');
 await expect(page.getByRole('heading',{name:'Este módulo no está disponible'})).toBeVisible({timeout:20000});
 await page.getByRole('link',{name:'Académico',exact:true}).click();await expect(page.getByTestId('academic-remote')).toBeVisible();
});
test('anonymous visitor is asked to authenticate',async({page})=>{
 await page.route('**/api/v1/session',r=>r.fulfill({json:{authenticated:false}}));await page.goto('/#/academic');
 await expect(page.getByRole('heading',{name:'Accede a tu espacio'})).toBeVisible();await expect(page.getByTestId('academic-remote')).toHaveCount(0);
});
test('mobile navigation stays usable',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.screenshot({path:'test-results/foundation-mobile.png',fullPage:true});await page.getByRole('link',{name:'Aprendizaje',exact:true}).click();await expect(page.getByTestId('learning-remote')).toBeVisible();
});
