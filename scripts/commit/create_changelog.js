/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
// const { promisify } = require('util')
// const { exec } = require('child_process')
const gitlog = require('git-log-command')

async function generateChangelog() {
  try {
    // 获取 Git 提交记录
    const commits = await gitlog({
      fields: ['subject'],
    })

    console.log('Parsed commits:', commits)

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
