import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'tests/e2e',use:{baseURL:'http://localhost:4173',browserName:'chromium',launchOptions:{executablePath:process.env.CHROMIUM_EXECUTABLE,args:process.env.CHROMIUM_EXECUTABLE?['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']:[]}},webServer:[
 {command:'npm run preview -w @vq/shell',url:'http://localhost:4173',reuseExistingServer:!process.env.CI},
 {command:'npm run preview -w @vq/academic',url:'http://localhost:4174',reuseExistingServer:!process.env.CI},
 {command:'npm run preview -w @vq/learning',url:'http://localhost:4175',reuseExistingServer:!process.env.CI},
]});
