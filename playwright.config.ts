import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:60000,workers:1,use:{headless:true,launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}}});
