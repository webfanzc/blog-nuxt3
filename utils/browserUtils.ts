export function setCSSVariable(propertyName: string, value: string) {
  document.documentElement.style.setProperty(propertyName, value)
}

export function getCSSVariable(propertyName: string) {
  return document.documentElement.style.getPropertyValue(propertyName)
}

/**
 * 颜色混合工具函数
 * @param color1 颜色1
 * @param color2 颜色2
 * @param weight 权重
 * @returns
 */
export function colorMix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0)

  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)

  const r = Math.round(r1 * (1 - weight) + r2 * weight)
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
  const b = Math.round(b1 * (1 - weight) + b2 * weight)

  const rHex = `0${(r || 0).toString(16)}`.slice(-2)
  const gHex = `0${(g || 0).toString(16)}`.slice(-2)
  const bHex = `0${(b || 0).toString(16)}`.slice(-2)
  return `#${rHex}${gHex}${bHex}`
}
/**
 * 生成element-plus主题颜色
 * @returns {Record<string,string>} 变量及对应颜色
 */
export function genThemeColor(mainColor: string) {
  // const colorList = ['primary', 'success', 'warning', 'danger', 'error', 'info']
  const colorList = ['primary']
  const prefix = '--el-color-'
  const colors: Record<string, string> = {}

  colorList.forEach((colorItem) => {
    for (let i = 1; i < 10; i += 1) {
      colors[`${prefix}${colorItem}-light-${10 - i}`] = colorMix(
        '#ffffff',
        mainColor,
        i * 0.1,
      )
    }
    for (let i = 1; i < 10; i += 1) {
      colors[`${prefix}${colorItem}-dark-${10 - i}`] = colorMix(
        '#000000',
        mainColor,
        i * 0.1,
      )
    }
  })

  return colors
}

export function generateThemeString(mainColor: string) {
  return Object.entries(genThemeColor(mainColor))
    .map(([key, value]) => {
      return `${key}: ${value}!important;`
    })
    .join('\r\n')
}

export function genCustomThemeVars() {}

export function genElementColor(key: string, value: string) {
  setCSSVariable(key, value)
  for (let i = 1; i < 10; i += 1) {
    setCSSVariable(
      `${key}-light-${10 - i}`,
      colorMix('#ffffff', value, i * 0.1),
    )
    setCSSVariable(`${key}-dark-${10 - i}`, colorMix('#000000', value, i * 0.1))
  }
}
