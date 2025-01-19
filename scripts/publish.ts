import { execSync as exec } from 'node:child_process'
import path, { resolve } from 'node:path'
import { consola } from 'consola'
import { copyFileSync, readJsonSync, removeSync } from 'fs-extra'

consola.info('Clean up')
exec('pnpm run clean', { stdio: 'inherit' })

consola.info('Vite Build')
exec('pnpm build', { stdio: 'inherit' })

const { name, version } = readJsonSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8',
)

const command = 'pnpm -r publish --access public --no-git-checks'

const readmePath = path.join(resolve(__dirname, '..'), 'README.md')
const mapReadmePath = path.join(resolve(__dirname, '../packages/map/README.md'))
const coreReadmePath = path.join(resolve(__dirname, '../packages/core/README.md'))

copyFileSync(readmePath, mapReadmePath)
copyFileSync(readmePath, coreReadmePath)

exec(`${command}`, { stdio: 'inherit' })

removeSync(mapReadmePath)
removeSync(coreReadmePath)
consola.success(`Published ${name} v${version}`)
