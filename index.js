const {createCompiler} = require('@mdx-js/mdx')
const detectFrontmatter = require('remark-frontmatter')
const vfile = require('vfile')
const visit = require('unist-util-visit')
const remove = require('unist-util-remove')
const yaml = require('yaml')
const file = vfile(`
---
title: Hello, MDX
---
I <3 Markdown and JSX
`)
function extractFrontmatter() {
  return function transformer(tree, file) {
    console.log('tree', tree)
    visit(tree, 'yaml', function visitor(node) {
      file.data.frontmatter = yaml.parse(node.value)
    })
    remove(tree, 'yaml')
  }
}
mdxCompiler = createCompiler({
  remarkPlugins: [detectFrontmatter, extractFrontmatter]
})
mdxCompiler.process(file, function done(err, file) {
  console.log(file.data.frontmatter)
  // { title: "Hello, MDX" }
})
