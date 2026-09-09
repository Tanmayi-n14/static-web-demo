const fs = require('fs');
const assert = require('assert');

console.log("🔍 Running CI test suite...");

// 1. Verify critical files exist
assert(fs.existsSync('src/index.html'), "❌ Error: src/index.html is missing!");
assert(fs.existsSync('src/style.css'), "❌ Error: src/style.css is missing!");

const html = fs.readFileSync('src/index.html', 'utf8');

// 2. Base tabs verification
const requiredTabs = ['PES University', 'About me', 'CI/CD Pipeline', 'Instructable'];

requiredTabs.forEach(tabName => {
  const tabRegex = new RegExp(
    `<button[^>]*class=["'][^"']*tab-btn[^"']*["'][^>]*>\\s*${tabName}\\s*</button>`,
    'i'
  );

  assert(
    tabRegex.test(html),
    `❌ Test Failed: Mandatory tab "${tabName}" was not found in navigation!`
  );
});

// 3. New Test Case: Verify Page Title
assert(
  html.includes('<title>PES University - CI/CD Course</title>'),
  "❌ Test Failed: Missing or incorrect HTML <title> tag!"
);

// 4. New Test Case: Verify Student Tab Exists
assert(
  html.includes('student-about') || html.includes('about-me'),
  "❌ Test Failed: Student About Me tab target was not found in index.html!"
);

console.log("[PASSED] All static tab content checks passed successfully!");
