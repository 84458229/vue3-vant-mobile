export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 设计稿的宽度
      viewportHeight: 1334, // 设计稿的高度，可以不设置 高度一般是不固定所以不需要设置
      unitPrecision: 3, // 单位转换后保留的精度
      viewportUnit: 'vw', // 转换后的单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
      minPixelValue: 1, // 小于或等于 1px 不转换
      mediaQuery: false, // 允许在媒体查询中转换 px
      exclude: [/node_modules\/vant/i], // 忽略转换 Vant 组件
      propList: ['*', '!max-width'] // 排除 max-width 属性
    }
  }
}
