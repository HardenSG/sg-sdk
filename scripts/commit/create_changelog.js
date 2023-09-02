/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')
const parseGitLog = require('git-log-parser')

const execAsync = promisify(exec)

async function generateChangelog() {
  try {
    // 获取 Git 提交记录
    const { stdout } = await execAsync('git log --pretty=format:"%s"')

    // 解析提交记录
    const commits = await parseGitLog.parse(stdout)

    // 生成 changelog
    let changelog = ''
    commits.forEach((commit) => {
      changelog += `- ${commit.subject}\n`
    })

    // 写入 changelog.md 文件
    fs.writeFileSync('./changelog.md', changelog)

    console.log('Changelog generated and saved to changelog.md')
  } catch (error) {
    console.error('Error generating changelog:', error)
  }
}

// 生成 changelog
generateChangelog()
