import { execSync } from 'child_process';
try {
  console.log(execSync('git checkout src/constants.ts').toString());
} catch (e) {
  console.error(e.stderr ? e.stderr.toString() : e.message);
}
