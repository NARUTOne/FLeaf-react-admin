import Mock from 'mockjs'

const homeTotal = Mock.mock({
  expectPoor: {
    "village|1-200": 100,
    "people|1-100": 10
  },
  alreadyPoor: {
    "village|1-200": 100,
    "people|1-100": 10
  },
  poor: {
    "village|1-200": 100,
    "people|1-100": 10
  },
  returnPoor: {
    "village|1-200": 100,
    "people|1-100": 10
  }
})

const homeChartLine = Mock.mock({
  'expectPoor|12': ['@integer(5, 100)'],
  'alreadyPoor|12': ['@integer(5, 100)'],
  'poor|12': ['@integer(5, 100)'],
  'returnPoor|12': ['@integer(5, 100)'],
})

const homeBarTwo = Mock.mock({
  'households|8': ['@integer(1000, 3000)'],
  'people|8': ['@integer(3000, 20000)'],
})

const homeBar = Mock.mock({
  'data|8': ['@integer(2000, 10000)']
})

export {
  homeTotal,
  homeChartLine,
  homeBarTwo,
  homeBar
}