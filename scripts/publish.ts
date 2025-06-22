import { execSync as exec } from 'node:child_process'
import { copyFile, readFile, rm } from 'node:fs/promises'
import { consola } from 'consola'

consola.info('Clean up')
exec('pnpm run clean', { stdio: 'inherit' })

consola.info('Vite Build')
exec('pnpm build', { stdio: 'inherit' })

const { name, version } = JSON.parse(await readFile('package.json', { encoding: 'utf8' }))

const command = 'pnpm -r publish --access public --no-git-checks'

const readmePath = 'README.md'
const mapReadmePath = 'packages/map/README.md'
const coreReadmePath = 'packages/core/README.md'

await copyFile(readmePath, mapReadmePath)
await copyFile(readmePath, coreReadmePath)

exec(`${command}`, { stdio: 'inherit' })

await rm(mapReadmePath)
await rm(coreReadmePath)
consola.success(`Published ${name} v${version}`)
