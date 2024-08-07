// 标签 item
interface TabItem {
  id: number,
  name: string,
  icon: string,
  title: string,
  to: string
}

// tabbar列表
export const TABBAR_LIST: TabItem[] = [
  { id: 1, name: 'home', icon: 'home-o', title: '首页', to: '/home/index' },
  { id: 2, name: 'components', icon: 'apps-o', title: '组件说明', to: '/home/components' },
  { id: 3, name: 'user', icon: 'user-o', title: '我的', to: '/home/profile' }
]

// 调试白名单
export const DEBUG_WHITE_LIST: string[] = ['development', 'teste']

// 路由白名单
export const ROUTE_WHITE_LIST: string[] = ['Login']

// 聚合数据key
export const JH_NEWS_KEY = 'd61a65b248651c9598bcccbd7670d566'

// 首页tab
export const NEWS_TABS = [

]
