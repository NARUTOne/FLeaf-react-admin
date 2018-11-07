/**
 * mock navs
 */

export default [{
  name: '概览',
  icon: 'smile',
  key: '/app/home',
  href: '/app/home'
}, {
  name: 'todo',
  icon: 'ordered-list',
  key: '/app/todo',
  href: '/app/todo'
}, {
  name: '表单页',
  icon: 'form',
  key: '/app/formpage',
  href: '/app/formpage',
  children: [
    {
      name: '基础表单',
      key: '/app/formpage/base',
      href: '/app/formpage/base',
    }, {
      name: '表格表单',
      key: '/app/formpage/table-form',
      href: '/app/formpage/table-form',
    }, {
      name: '数据表单',
      key: '/app/formpage/map-form',
      href: '/app/formpage/map-form',
    }
  ]
}];
