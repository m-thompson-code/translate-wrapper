const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'fake-i18n-assets'; // node_modules/<PACKAGE_NAME>
const ROOT = process.cwd();
const PACKAGE_DIRECTORY = path.join(ROOT, 'node_modules', PACKAGE_NAME);
const ASSETS_DIRECTORY = path.join(PACKAGE_DIRECTORY, 'assets', 'i18n', 'core');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function create() {
  ensureDir(ASSETS_DIRECTORY);

  // Minimal package.json so it resembles a real dependency.
  const pkgJson = {
    name: PACKAGE_NAME,
    version: '0.0.0',
    private: true,
    description: 'Fake i18n assets for local testing',
    files: ['assets/'],
  };
  writeJson(path.join(PACKAGE_DIRECTORY, 'package.json'), pkgJson);

  // Sample translations
  const en = {
    app: {
      core: 'en From core',
      hello: 'en hello {{value}}',
      title: 'en Translation Demo',
    },
    core: {
      test: 'en Core Test',
    },
    override: {
      test: 'en Override Test - Core',
    },
  };
  const de = {
    app: {
      core: 'de From core',
      hello: 'de hello {{value}}',
      title: 'de Translation Demo',
    },
    core: {
      test: 'de Core Test',
    },
    override: {
      test: 'de Override Test - Core',
    },
  };

  writeJson(path.join(ASSETS_DIRECTORY, 'en.json'), en);
  writeJson(path.join(ASSETS_DIRECTORY, 'de.json'), de);

  console.log(`✅ Created ${PACKAGE_NAME} at ${PACKAGE_DIRECTORY}`);
  console.log(`   Assets: ${path.relative(ROOT, ASSETS_DIRECTORY)}/en.json, de.json`);
}

function remove() {
  if (!fs.existsSync(PACKAGE_DIRECTORY)) {
    console.log('Nothing to remove.');
    return;
  }
  // Recursively remove the fake package
  fs.rmSync(PACKAGE_DIRECTORY, { recursive: true, force: true });
  console.log(`🧹 Removed ${PACKAGE_DIRECTORY}`);
}

remove();
create();
