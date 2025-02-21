import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    // font-size
    [/^f-([.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}%` })],
    // max-width min-w-10px max-h-100%
    [
      /^(min-w|max-w|min-h|max-h)-(\d+)(px|%|rem|em|vh|vw)$/,
      ([, type, num, unit]) => ({
        [`${type.replace('-', '-')}`]: `${num}${unit}`,
      }),
    ],
    // width | height  w-10px h-10%
    [
      /^(w|h)-(\d+)(px|%|rem|em|vh|vw)$/,
      ([, type, num, unit]) => ({
        [type === 'w' ? 'width' : 'height']: `${num}${unit}`,
      }),
    ],
    // display
    ['flex', { 'display': 'flex' }],
    ['justify-content-center', { 'justify-content': 'center' }],
    ['justify-content-around', { 'justify-content': 'space-around' }],
    ['justify-content-between', { 'justify-content': 'space-between' }],
    ['justify-content-end', { 'justify-content': 'flex-end' }],
    ['align-items-center', { 'align-items': 'center' }],
    ['d-c', { 'flex-direction': 'column' }],
    // 文本超出省略号
    // 单行
    ['ellipsis', {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }],
    // 多行
    [/^ellipsis-([.\d]+)$/, ([_, num]) => ({ 
      '-webkit-line-clamp': `${num}`,
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
      'word-break': 'break-all'
     })],
    // border-radius
    [/^radius-([.\d]+)$/, ([_, num]) => ({ "border-radius": `${num}px` })],
    // margin
    // 支持一个值两个值和四个值的 margin 规则 m-10 m-10-20 m-10-20-30-40 支持负值 m--10
    [/^m-(-?\d+)(?:-(-?\d+))?(?:-(-?\d+))?(?:-(-?\d+))?$/, ([, top, right, bottom, left]) => {
      // 如果只传入两个值，则上下为第一个值，左右为第二个值
      if (right !== undefined && bottom === undefined && left === undefined) {
        return {
        'margin-top': `${top}px`,
        'margin-bottom': `${top}px`,
        'margin-left': `${right}px`,
        'margin-right': `${right}px`,
        }
      }
      // 如果传入四个值，则分别对应上、右、下、左
      else if (right !== undefined && bottom !== undefined && left !== undefined) {
        return {
        'margin-top': `${top}px`,
        'margin-right': `${right}px`,
        'margin-bottom': `${bottom}px`,
        'margin-left': `${left}px`,
        }
      }
      // 如果只传入一个值，则应用到所有方向
      else {
        return {
        'margin-top': `${top}px`,
        'margin-right': `${top}px`,
        'margin-bottom': `${top}px`,
        'margin-left': `${top}px`,
        }
      }
    }],
    // 支持margin单独输入上右下左值m-t-10
    [/^m-([trbl])-(-?\d+)$/, ([, direction, value]) => {
      const directions: any = {
        t: 'margin-top',
        r: 'margin-right',
        b: 'margin-bottom',
        l: 'margin-left',
      }
      return { [directions[direction]]: `${value}px` }
    }],
    // padding
    // 支持一个值两个值和四个值的 margin 规则 m-10 m-10-20 m-10-20-30-40 支持负值 m--10
    [/^p-(-?\d+)(?:-(-?\d+))?(?:-(-?\d+))?(?:-(-?\d+))?$/, ([, top, right, bottom, left]) => {
      // 如果只传入两个值，则上下为第一个值，左右为第二个值
      if (right !== undefined && bottom === undefined && left === undefined) {
        return {
        'padding-top': `${top}px`,
        'padding-bottom': `${top}px`,
        'padding-left': `${right}px`,
        'padding-right': `${right}px`,
        }
      }
      // 如果传入四个值，则分别对应上、右、下、左
      else if (right !== undefined && bottom !== undefined && left !== undefined) {
        return {
        'padding-top': `${top}px`,
        'padding-right': `${right}px`,
        'padding-bottom': `${bottom}px`,
        'padding-left': `${left}px`,
        }
      }
      // 如果只传入一个值，则应用到所有方向
      else {
        return {
        'padding-top': `${top}px`,
        'padding-right': `${top}px`,
        'padding-bottom': `${top}px`,
        'padding-left': `${top}px`,
        }
      }
    }],
    // box-shadow
    [
      /^shadow-(.*)$/, // 匹配类名，如 shadow-10-20-30-0-0-0-50
      ([_, value]) => {
        const [x, y, blur, r, g, b, opacity] = value.split("-") // 解析传入的值
        return {
          "box-shadow": `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity ? opacity as any / 100 : 1})`
        }
      }
    ],
    ['box-shadow-1', { 'box-shadow': '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 16px 32px 0 rgba(0, 0, 0, 0.19)' }],
    ['box-shadow-2', { 'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }],
    ['box-shadow-3', { 'box-shadow': '-4px 0 8px 0 rgba(0, 0, 0, 0.2)' }],
    // el-card wrapper
    ['card-w', { 'border-radius': '8px', 'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.05)' }],
  ],
  shortcuts: {
    // box-shadow样式合集
    // 简单垂直阴影
    "shadow1": "shadow-0-4-8-0-0-0-20",
    // 偏移的阴影效果
    "shadow2": "shadow-2-2-10-0-0-0-20",
    // 柔和的圆角阴影
    "shadow3": "box-shadow-1",
    // 3D立体阴影
    "shadow4": "box-shadow-2",
    // 横向拉伸的阴影
    "shadow5": "box-shadow-3",

    // display
    "flex-c": "flex justify-content-center align-items-center",
    "flex-c-x": "flex justify-content-center",
    "flex-c-y": "flex align-items-center",
    "flex-b": "flex justify-content-between",
    "flex-a": "flex justify-content-around",
    "flex-e": "flex justify-content-end",
    "flex-d-c": "flex d-c"
  }
}