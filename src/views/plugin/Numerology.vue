<script lang="ts" setup>
import { solarTerms, solarTermsName, type SolarTerms } from '@/common/solarTerms.ts'
import { NumerologyDatabase, type NumerologyData } from '@/common/Numerology-database'


// 生辰八字
const dateStr = ref('')
// 天干数组
const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
                    // 0     1     2     3     4     5     6     7    8     9  
// 地支数组
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
//                        0     1     2     3    4     5     6     7     8    9     10    11
// 天干对应五行
const heavenlyStemsFive = ['阳木', '阴木', '阳火', '阴火', '阳土', '阴土', '阳金', '阴金', '阳水', '阴水']
// 地支对应五行
const earthlyBranchesFive = [
  '癸水（100%）', '己土（60%）、癸水（30%）、辛金（10%）', '甲木（60%）、丙火（30%）、戊土（10%）', '乙木（100%）',
  '戊土（60%）、乙木（30%）、癸水（10%）', '丙火（60%）、戊土（30%）、庚金（10%）', '丁火（70%）、己土（30%）',
  '己土（60%）、丁火（30%）、乙木（10%）', '庚金（60%）、壬水（30%）、戊土（10%）', '辛金（100%）',
  '戊土（60%）、辛金（30%）、丁火（10%）', '壬水（70%）、甲木（30%）']

// 四柱索引：年干、年支、月干、月支、日干、日支、时干、时支
let adjustedStemIndex: number;
let adjustedBranchIndex: number;
let mounthStemIndex: number;
let mounthBranchIndex: number;
let dayStemIndex: number;
let dayBranchIndex: number;
let hourStemIndex: number;
let hourBranchIndex: number;
// 是否显示四柱
let show = ref(false)
// 排运，顺逆
let forwardSequence: string[];
let backwardSequence: string[];
// 起运年龄，顺逆
let forwardAge: number;
let backwardAge: number;
// 十神
let tenGods: any[];
// 查库
let database: NumerologyData | null;

// 选择四柱相关参数
const adjustedStemIndexValue = ref(0)
const adjustedBranchIndexValue = ref(0)
const mounthStemIndexValue= ref(0)
const mounthBranchIndexValue = ref(0)
const dayStemIndexValue = ref(0)
const dayBranchIndexValue = ref(0)
const hourStemIndexValue = ref(0)
const hourBranchIndexValue = ref(0)
let forwardSequenceOptions = ref<string[]>([]);
let backwardSequenceOptions = ref<string[]>([]);
let raftingShow = ref(false)
let tenGodsOptions = ref<any[]>([]);
let tenGodsShow = ref(false)
let databaseOptions = ref<NumerologyData | null>(null)

const earthlyBranchesOptions = [
  { value: 0, label: '子0', },
  { value: 1, label: '丑1', },
  { value: 2, label: '寅2', },
  { value: 3, label: '卯3', },
  { value: 4, label: '辰4', },
  { value: 5, label: '巳5', },
  { value: 6, label: '午6', },
  { value: 7, label: '未7', },
  { value: 8, label: '申8', },
  { value: 9, label: '酉9', },
  { value: 10, label: '戌10', },
  { value: 11, label: '亥11', },
]

const heavenlyStemsOptions = [
  { value: 0, label: '甲0' },
  { value: 1, label: '乙1' },
  { value: 2, label: '丙2' },
  { value: 3, label: '丁3' },
  { value: 4, label: '戊4' },
  { value: 5, label: '己5' },
  { value: 6, label: '庚6' },
  { value: 7, label: '辛7' },
  { value: 8, label: '壬8' },
  { value: 9, label: '癸9' }
]

// 测算
function calculation() {
  const date = new Date(dateStr.value);

  // 提取各个部分
  const year = date.getFullYear();  // 2025
  const month = date.getMonth() + 1; // 8 (月份从0开始，所以要+1)
  const day = date.getDate();       // 20
  const hours = date.getHours();    // 22
  const minutes = date.getMinutes();// 0

  // console.log({year, month, day, hours, minutes});

  // 获取年柱
  // console.log('年柱')
  adjustedStemIndex = getGanZhiYear(year).adjustedStemIndex
  adjustedBranchIndex = getGanZhiYear(year).adjustedBranchIndex
  // console.log(heavenlyStems[adjustedStemIndex] + earthlyBranches[adjustedBranchIndex])

  // 获取月支
  // console.log('月支')
  mounthBranchIndex = getEarthlyBranchIndex(date, solarTerms, year)
  // console.log(earthlyBranches[mounthBranchIndex]); // 1 (丑月)

  // 获取月干
  // console.log('月干')
  mounthStemIndex = getMonthStemIndex(getGanZhiYear(year).adjustedStemIndex, getEarthlyBranchIndex(date, solarTerms, year))
  // console.log(heavenlyStems[mounthStemIndex])

  // 获取日柱
  // console.log('日柱')
  dayStemIndex = getDayStemBranch(year, month, day).dayStemIndex
  dayBranchIndex = getDayStemBranch(year, month, day).dayBranchIndex
  // console.log(heavenlyStems[dayStemIndex] + earthlyBranches[dayBranchIndex])

  // 获取时柱
  // console.log('时柱')
  hourStemIndex = getHourStemBranch(year, month, day, hours, minutes).hourStemIndex
  hourBranchIndex = getHourStemBranch(year, month, day, hours, minutes).hourBranchIndex
  // console.log(heavenlyStems[hourStemIndex] + earthlyBranches[hourBranchIndex])

  show.value = true

  // 排运顺逆
  forwardSequence = calculateStemsBranches(mounthStemIndex, mounthBranchIndex).forwardSequence
  backwardSequence = calculateStemsBranches(mounthStemIndex, mounthBranchIndex).backwardSequence
  // console.log(backwardSequence.join("\n"))

  // 起运
  backwardAge = calculateStartingAge(dateStr.value, solarTerms).backwardAge
  forwardAge = calculateStartingAge(dateStr.value, solarTerms).forwardAge
  // console.log(calculateStartingAge(dateStr.value, solarTerms))

  // 十神
  tenGods = calculateTenGods([adjustedStemIndex, adjustedBranchIndex, mounthStemIndex, mounthBranchIndex, dayStemIndex, dayBranchIndex, hourStemIndex, hourBranchIndex])
  // console.log(tenGods)

  // 查询八字数据库
  const indices = adjustedStemIndex + ',' + adjustedBranchIndex + ',' + mounthStemIndex + ',' + mounthBranchIndex + ',' + dayStemIndex + ',' + dayBranchIndex + ',' + hourStemIndex + ',' + hourBranchIndex
  // console.log(findNumerologyData(indices))
  database = findNumerologyData(indices)
}

// 下拉选八字查库
function searchDatabase() {
  const indicesOptions = adjustedStemIndexValue.value + ',' + adjustedBranchIndexValue.value + ',' + mounthStemIndexValue.value + ',' + mounthBranchIndexValue.value + ',' + dayStemIndexValue.value + ',' + dayBranchIndexValue.value + ',' + hourStemIndexValue.value + ',' + hourBranchIndexValue.value
  databaseOptions.value = findNumerologyData(indicesOptions)
}

// 给下拉选八字排运
function rafting() {
  forwardSequenceOptions.value = calculateStemsBranches(mounthStemIndexValue.value, mounthBranchIndexValue.value).forwardSequence
  backwardSequenceOptions.value = calculateStemsBranches(mounthStemIndexValue.value, mounthBranchIndexValue.value).backwardSequence
  raftingShow.value = true
}

// 给下拉选八字添加十神
function tenGodsAdd() {
  tenGodsOptions.value = 
  calculateTenGods([adjustedStemIndexValue.value, adjustedBranchIndexValue.value, mounthStemIndexValue.value, mounthBranchIndexValue.value,
  dayStemIndexValue.value, dayBranchIndexValue.value, hourStemIndexValue.value, hourBranchIndexValue.value])
  tenGodsShow.value = true
  // console.log(tenGodsOptions.value)
}

// 清空
function clear() {
  show.value = false
  dateStr.value = ''
}

/**
 * 根据公历年份计算对应的干支纪年（年柱），以立春为准
 * @param {number} year - 公历年份（如1990）
 * @returns {object} 干支纪年的数组索引（如{6， 2}对应天干庚，地支寅）
 */
function getGanZhiYear(year: number) {
  const checkDate = new Date(dateStr.value);
  const SpringDate = new Date(solarTerms[year.toString()][2]);
  let realYear = year

  if (checkDate < SpringDate) {
    realYear -= 1
  }
  // 计算天干索引（年份-3然后模10）
  const stemIndex = (realYear - 3) % 10;
  // 计算地支索引（年份-3然后模12）
  const branchIndex = (realYear - 3) % 12;
  
  // 天干索引
  const adjustedStemIndex = stemIndex > 0 ? stemIndex - 1 : stemIndex + 9;
  // 地支索引
  const adjustedBranchIndex = branchIndex > 0 ? branchIndex - 1 : branchIndex + 11;
  
  // 返回天干+地支的索引组合
  return { adjustedStemIndex, adjustedBranchIndex };
}

/**
 * 获取日期对应的月支索引
 * @param date 输入日期
 * @param solarTerms 节气数据
 * @returns 地支索引(0-11)
 */
function getEarthlyBranchIndex(date: Date, solarTerms: SolarTerms, year: number): number {
  // 节气对应的地支索引（从立春开始）
  const termToBranchIndex = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 0, 0, 1, 1];

  const yearKey = year.toString();
  
  // 获取该年的节气数据
  const terms = solarTerms[yearKey];
  if (!terms || terms.length < 24) {
    throw new Error(`缺少${year}年的节气数据`);
  }

  // 将节气转为Date对象
  const termDates = terms.map(t => new Date(t));

  // 查找输入日期所在的节气区间
  let termIndex = -1;
  for (let i = 0; i < termDates.length; i++) {
    if (date < termDates[i]) {
      termIndex = i - 1;
      break;
    }
  }

  // 如果比所有节气都晚，则是最后一个节气之后
  if (termIndex === -1) {
    termIndex = termDates.length - 1;
  }

  // 特殊处理：如果正好是节气当天，则属于下一个区间
  if (termIndex >= 0 && date.getTime() === termDates[termIndex].getTime()) {
    termIndex++;
  }

  // 计算对应的地支索引
  const branchIndex = termToBranchIndex[termIndex];
  return branchIndex;
}

/**
 * 根据年干索引和月支索引计算月干索引
 * @param yearStemIndex 年干索引(0-9)
 * @param monthBranchIndex 月支索引(0-11)
 * @returns 月干索引(0-9)
 */
function getMonthStemIndex(yearStemIndex: number, monthBranchIndex: number): number {
  // 确定起头天干（根据口诀）
  let startingStem: number;
  
  // 甲己之年丙作首
  if (yearStemIndex === 0 || yearStemIndex === 5) {
    startingStem = 2; // 丙
  }
  // 乙庚之岁戊为头
  else if (yearStemIndex === 1 || yearStemIndex === 6) {
    startingStem = 4; // 戊
  }
  // 丙辛必定寻庚起
  else if (yearStemIndex === 2 || yearStemIndex === 7) {
    startingStem = 6; // 庚
  }
  // 丁壬壬位顺行流
  else if (yearStemIndex === 3 || yearStemIndex === 8) {
    startingStem = 8; // 壬
  }
  // 戊癸甲寅好追求
  else if (yearStemIndex === 4 || yearStemIndex === 9) {
    startingStem = 0; // 甲
  } else {
    throw new Error("无效的年干索引");
  }

  // 计算月干索引（寅月=2，从寅月开始算）
  // 地支索引从0开始，但计算月干时寅月对应索引2
  // 所以需要调整偏移量：monthBranchIndex - (2 - 0)
  const offset = (monthBranchIndex - 2 + 12) % 12; // 确保为正数
  const monthStemIndex = (startingStem + offset) % 10;
  
  return monthStemIndex;
}

/**
 * 计算日柱的天干地支索引
 * @param {year, month, day} number 输入年月日
 * @returns {Object} 包含日干索引和日支索引的对象
 */
function getDayStemBranch(year: number, month: number, day: number) {
  // 1. 计算日干支基数
  let baseNumber;
  const lastTwoDigits = year % 100;
  
  if (year >= 1900 && year <= 1999) {
    // 1900-1999年公式
    baseNumber = (lastTwoDigits + 3) * 5 + 55 + Math.floor((lastTwoDigits - 1) / 4);
  } else if (year >= 2000) {
    // 2000年后公式
    baseNumber = (lastTwoDigits + 7) * 5 + 15 + Math.floor((lastTwoDigits + 19) / 4);
  } else {
    throw new Error("不支持1900年之前的日期");
  }
  
  // 2. 计算当年到指定日期的总天数
  let totalDays = 0;
  for (let m = 1; m < month; m++) {
    totalDays += daysInMonth(year, m);
  }
  totalDays += day;
  
  // 3. 计算日干支
  const dayNumber = (baseNumber + totalDays) % 60;
  
  // 4. 转换为天干地支索引（60甲子循环）
  const stemIndex = (dayNumber - 1) % 10;
  const branchIndex = (dayNumber - 1) % 12;
  
  // 处理余数为0的情况
  return {
    dayStemIndex: stemIndex >= 0 ? stemIndex : stemIndex + 10,
    dayBranchIndex: branchIndex >= 0 ? branchIndex : branchIndex + 12
  };
}

// 获取某年某月的天数
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

/**
 * 计算时柱的天干地支索引
 * @param {year, month, day, hours, minutes} number 输入年月日时分
 * @returns {Object} 包含时干索引和时支索引的对象
 */
function getHourStemBranch(year: number, month: number, day: number, hours: number, minutes: number) {
  // 有效性检查
  if (minutes < 0 || minutes >= 60 || hours < 0 || hours >= 24) {
    throw new Error("无效的时间");
  }

  // 1. 确定时支索引（根据时间范围）
  let branchIndex;
  if (hours >= 23 || hours < 1) { // 23:00-00:59
    branchIndex = 0; // 子
  } else if (hours >= 1 && hours < 3) {
    branchIndex = 1; // 丑
  } else if (hours >= 3 && hours < 5) {
    branchIndex = 2; // 寅
  } else if (hours >= 5 && hours < 7) {
    branchIndex = 3; // 卯
  } else if (hours >= 7 && hours < 9) {
    branchIndex = 4; // 辰
  } else if (hours >= 9 && hours < 11) {
    branchIndex = 5; // 巳
  } else if (hours >= 11 && hours < 13) {
    branchIndex = 6; // 午
  } else if (hours >= 13 && hours < 15) {
    branchIndex = 7; // 未
  } else if (hours >= 15 && hours < 17) {
    branchIndex = 8; // 申
  } else if (hours >= 17 && hours < 19) {
    branchIndex = 9; // 酉
  } else if (hours >= 19 && hours < 21) {
    branchIndex = 10; // 戌
  } else if (hours >= 21 && hours < 23) {
    branchIndex = 11; // 亥
  } else {
    throw new Error("无法确定时支");
  }
  
  // 2. 处理早子时和晚子时的日干
  let dayStemIndex;
  const isLateZi = hours >= 23; // 晚子时(23:00-23:59)
  const isEarlyZi = hours < 1;  // 早子时(0:00-0:59)
  
  if (isLateZi) {
    // 晚子时使用次日日干
    const nextDay = day + 1
    dayStemIndex = getDayStemBranch(year, month, nextDay).dayStemIndex;
  } else {
    // 其他时间使用当日日干
    dayStemIndex = getDayStemBranch(year, month, day).dayStemIndex;
  }
  
  // 3. 根据日干和时支计算时干（五鼠遁）
  const stemIndex = (dayStemIndex % 5) * 2 + Math.floor(branchIndex / 2);
  
  return {
    hourStemIndex: stemIndex % 10,
    hourBranchIndex: branchIndex
  };
}

/**
 * 根据月柱天干地支索引计算顺排和逆排结果
 * @param {number} monthStemIndex 月柱天干索引（0-9）
 * @param {number} monthBranchIndex 月柱地支索引（0-11）
 * @returns {Object} 包含顺排和逆排结果的对象
 */
function calculateStemsBranches(monthStemIndex: number, monthBranchIndex: number) { 
  // 顺排计算
  const forwardSequence = [];
  for (let i = 0; i < 10; i++) {
    const currentStemIndex = (monthStemIndex + i) % 10;
    const currentBranchIndex = (monthBranchIndex + i) % 12;
    
    const stem = heavenlyStems[currentStemIndex];
    const branch = earthlyBranches[currentBranchIndex];
    const stemFive = heavenlyStemsFive[currentStemIndex];
    const branchFive = earthlyBranchesFive[currentBranchIndex];
    
    forwardSequence.push(`${stem}${branch}（${stemFive} ${branchFive}）`);
  }
  
  // 逆排计算
  const backwardSequence = [];
  for (let i = 0; i < 10; i++) {
    const currentStemIndex = (monthStemIndex - i + 10) % 10;
    const currentBranchIndex = (monthBranchIndex - i + 12) % 12;
    
    const stem = heavenlyStems[currentStemIndex];
    const branch = earthlyBranches[currentBranchIndex];
    const stemFive = heavenlyStemsFive[currentStemIndex];
    const branchFive = earthlyBranchesFive[currentBranchIndex];
    
    backwardSequence.push(`${stem}${branch}（${stemFive} ${branchFive}）`);
  }
  
  return {
    forwardSequence,
    backwardSequence
  };
}

/**
 * 根据修正的阴阳规则计算十神
 * 规则：
 * - 财官印：阴阳不同为正星，阴阳相同为偏星
 * - 食神比肩：阴阳相同
 * - 伤官劫财：阴阳不同
 * @param {Array} indices 四柱索引数组，顺序为[年干,年支,月干,月支,日干,日支,时干,时支]
 * @returns {Object} 十神对象，键为位置索引，值为十神名称
 */
function calculateTenGods(indices: any[]) {
  // 天干五行映射：0-木, 1-火, 2-土, 3-金, 4-水
  const stemElements = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  // 天干阴阳映射：0-阳, 1-阴（甲阳、乙阴、丙阳、丁阴...）
  const stemYinYang = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
  // 地支对应本气天干索引映射（取本气作为代表）
  const branchToStem = [9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8];
  
  // 获取日干核心信息（我）
  const dayStemIdx = indices[4]; // 日干索引
  const myElement = stemElements[dayStemIdx]; // 日干五行
  const myYinYang = stemYinYang[dayStemIdx]; // 日干阴阳（0阳1阴）
  
  // 需要计算的位置：年干(0)、年支(1)、月干(2)、月支(3)、日支(5)、时干(6)、时支(7)
  const positions = [0, 1, 2, 3, 5, 6, 7];
  const result = [];
  
  for (const pos of positions) {
    // 确定目标天干（地支取本气天干）
    let targetStemIdx;
    if ([0, 2, 6].includes(pos)) {
      // 天干位置（年干、月干、时干）
      targetStemIdx = indices[pos];
    } else {
      // 地支位置（年支、月支、日支、时支）
      const branchIdx = indices[pos];
      targetStemIdx = branchToStem[branchIdx];
    }
    
    // 目标天干属性
    const targetElement = stemElements[targetStemIdx];
    const targetYinYang = stemYinYang[targetStemIdx];
    const isSameYinYang = myYinYang === targetYinYang; // 阴阳是否相同
    
    // 十神判断逻辑（严格按照用户指定规则）
    let tenGod;
    if (myElement === targetElement) {
      // 同五行：比肩（同阴阳）、劫财（异阴阳）
      tenGod = isSameYinYang ? "比肩" : "劫财";
    } else if ((myElement + 1) % 5 === targetElement) {
      // 我生（我五行生目标五行）：食神（同阴阳）、伤官（异阴阳）
      tenGod = isSameYinYang ? "食神" : "伤官";
    } else if ((myElement + 2) % 5 === targetElement) {
      // 我克（我五行克目标五行）：正财（异阴阳）、偏财（同阴阳）
      tenGod = !isSameYinYang ? "正财" : "偏财";
    } else if ((myElement + 3) % 5 === targetElement) {
      // 克我（目标五行克我五行）：正官（异阴阳）、七杀（同阴阳）
      tenGod = !isSameYinYang ? "正官" : "七杀";
    } else if ((myElement + 4) % 5 === targetElement) {
      // 生我（目标五行生我五行）：正印（异阴阳）、偏印（同阴阳）
      tenGod = !isSameYinYang ? "正印" : "偏印";
    }
    // @ts-ignore
    result.push(tenGod);
  }
  
  return result;
}

/**
 * 计算起运年龄（精确到年）
 * @param {string} birthDate 出生日期时间，格式：YYYY-MM-DD HH:mm:ss
 * @param {Object} solarTerms 节气数据，格式：{年份: [节气日期时间数组]}
 * @returns {Object} 包含顺排和逆排起运年龄的对象
 */
function calculateStartingAge(birthDate: string, solarTerms: SolarTerms) {
  // 解析出生日期
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) {
    throw new Error("出生日期格式不正确，请使用YYYY-MM-DD HH:mm:ss格式");
  }
  
  const birthYear = birth.getFullYear();
  
  // 获取当前年份的节气数据
  const currentYearTerms = solarTerms[birthYear];
  if (!currentYearTerms || currentYearTerms.length !== 24) {
    throw new Error(`缺少${birthYear}年的完整节气数据（需要24个节气）`);
  }
  
  // 将节气数据转换为Date对象
  const termDates = currentYearTerms.map((term: string | number | Date) => new Date(term));
  
  // 找出出生日期前后的节气
  let prevTerm, nextTerm;
  for (let i = 0; i < termDates.length; i++) {
    if (birth < termDates[i]) {
      prevTerm = i > 0 ? termDates[i - 1] : termDates[termDates.length - 1];
      nextTerm = termDates[i];
      break;
    }
  }
  
  // 如果没有找到下一个节气，说明出生在最后一个节气之后，使用下一年的第一个节气
  if (!nextTerm) {
    const nextYearTerms = solarTerms[birthYear + 1];
    if (!nextYearTerms || nextYearTerms.length < 1) {
      throw new Error(`缺少${birthYear + 1}年的节气数据`);
    }
    nextTerm = new Date(nextYearTerms[0]);
    prevTerm = termDates[termDates.length - 1];
  }
  
  // 计算顺排天数（到下一个节气的天数）
  // @ts-ignore
  const forwardDays = Math.floor((nextTerm - birth) / (1000 * 60 * 60 * 24));
  const forwardAge = calculateAgeInYears(forwardDays);
  
  // 计算逆排天数（到上一个节气的天数）
  // @ts-ignore
  const backwardDays = Math.floor((birth - prevTerm) / (1000 * 60 * 60 * 24));
  const backwardAge = calculateAgeInYears(backwardDays);
  
  return {
    forwardAge,
    backwardAge
  };
}

/**
 * 根据天数计算起运年龄（3天=1年，余1舍，余2进1）
 * @param {number} days 天数
 * @returns {number} 起运年龄
 */
function calculateAgeInYears(days: number) {
  const years = Math.floor(days / 3);
  const remainder = days % 3;
  
  // 余1舍去，余2进1
  return remainder >= 2 ? years + 1 : years;
}

/**
 * 查询匹配的八字数据
 * @param {string} indices - 四柱索引字符串，如 "6,8,8,6,7,9,9,5"
 * @returns {object|null} 返回匹配的八字对象，未找到返回null
 */
function findNumerologyData(indices: string): NumerologyData | null {
  // 去除空格并统一格式
  const formattedIndices = indices.replace(/\s/g, '');
  
  // 在数据库中查找匹配项
  const matchedData = NumerologyDatabase.find(item => 
    item.indexString.replace(/\s/g, '') === formattedIndices
  );
  
  return matchedData || null;
}
</script>

<template>
  <div class="p-16">
    <el-card header="八字测算" class="card-w">
      <el-date-picker
        v-model="dateStr"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY-MM-DD HH:mm"
        date-format="MMM DD, YYYY"
        time-format="HH:mm"
        value-format="YYYY-MM-DD HH:mm"
        style="width: 280px;margin-right: 10px;"
      />
      <el-button class="margin-top" type="primary" @click="calculation" :disabled="dateStr == ''">测算</el-button>
      <el-button type="danger" class="m-l-10 margin-top" @click="clear">清空</el-button>
      <div class="m-t-15" v-if="show">
        <h3>测算八字：</h3>
        <div class="p-10-0">
          ({{ tenGods[0] }}){{ heavenlyStems[adjustedStemIndex] }} &nbsp;&nbsp; {{ earthlyBranches[adjustedBranchIndex] }}({{ tenGods[1] }})&nbsp;&nbsp;
          <span>
            {{ heavenlyStemsFive[adjustedStemIndex] }} &nbsp;&nbsp; {{ earthlyBranchesFive[adjustedBranchIndex] }}
          </span>
        </div>
        <div class="p-10-0">
          ({{ tenGods[2] }}){{ heavenlyStems[mounthStemIndex] }} &nbsp;&nbsp; {{ earthlyBranches[mounthBranchIndex] }}({{ tenGods[3] }})&nbsp;&nbsp;
          <span>
            {{ heavenlyStemsFive[mounthStemIndex] }} &nbsp;&nbsp; {{ earthlyBranchesFive[mounthBranchIndex] }}
          </span>
        </div>
        <div class="p-10-0">
          (日主){{ heavenlyStems[dayStemIndex] }} &nbsp;&nbsp; {{ earthlyBranches[dayBranchIndex] }}({{ tenGods[4] }})&nbsp;&nbsp;
          <span>
            {{ heavenlyStemsFive[dayStemIndex] }} &nbsp;&nbsp; {{ earthlyBranchesFive[dayBranchIndex] }}
          </span>
        </div>
        <div class="p-10-0">
          ({{ tenGods[5] }}){{ heavenlyStems[hourStemIndex] }} &nbsp;&nbsp; {{ earthlyBranches[hourBranchIndex] }}({{ tenGods[6] }})&nbsp;&nbsp;
          <span>
            {{ heavenlyStemsFive[hourStemIndex] }} &nbsp;&nbsp; {{ earthlyBranchesFive[hourBranchIndex] }}
          </span>
        </div>
        <div class="p-10-0" v-if="database">
          <div>
            推算：{{ database.narrate }}
          </div>
          <div class="p-10-0">
            结果：{{ database.content }}
          </div>
        </div>
        <div class="flex">
          <div class="m-r-40">
            <h3>顺 {{ forwardAge }}</h3>
            <div class="m-t-10" v-for="(item, index) in forwardSequence" :key="index">
              {{ item }}
            </div>
          </div>
          <div>
            <h3>逆 {{ backwardAge }}</h3>
            <div class="m-t-10" v-for="(item, index) in backwardSequence" :key="index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="m-t-20">
        <h3>选择八字：</h3>
        <div class="p-10-0">
          <span v-if="tenGodsShow">({{ tenGodsOptions[0] }})</span>
          <el-select
            v-model="adjustedStemIndexValue"
            placeholder="Select"
            style="width: 140px"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in heavenlyStemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="adjustedBranchIndexValue"
            placeholder="Select"
            style="width: 140px"
            class="m-0-20"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in earthlyBranchesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select><span v-if="tenGodsShow">({{ tenGodsOptions[1] }})</span>&nbsp;&nbsp;
          <span class="padding-top">
            {{ heavenlyStemsFive[adjustedStemIndexValue] }} &nbsp;&nbsp; {{ earthlyBranchesFive[adjustedBranchIndexValue] }}
          </span>
        </div>
        <div class="p-10-0">
          <span v-if="tenGodsShow">({{ tenGodsOptions[2] }})</span>
          <el-select
            v-model="mounthStemIndexValue"
            placeholder="Select"
            style="width: 140px"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in heavenlyStemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="mounthBranchIndexValue"
            placeholder="Select"
            style="width: 140px"
            class="m-0-20"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in earthlyBranchesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select><span v-show="tenGodsShow">({{ tenGodsOptions[3] }})</span>&nbsp;&nbsp;
          <span class="padding-top">
            {{ heavenlyStemsFive[mounthStemIndexValue] }} &nbsp;&nbsp; {{ earthlyBranchesFive[mounthBranchIndexValue] }}
          </span>
        </div>
        <div class="p-10-0">
          <span v-if="tenGodsShow">(日主)</span>
          <el-select
            v-model="dayStemIndexValue"
            placeholder="Select"
            style="width: 140px"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in heavenlyStemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="dayBranchIndexValue"
            placeholder="Select"
            style="width: 140px"
            class="m-0-20"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in earthlyBranchesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select><span v-if="tenGodsShow">({{ tenGodsOptions[4] }})</span>&nbsp;&nbsp;
          <span class="padding-top">
            {{ heavenlyStemsFive[dayStemIndexValue] }} &nbsp;&nbsp; {{ earthlyBranchesFive[dayBranchIndexValue] }}
          </span>
        </div>
        <div class="p-10-0">
          <span v-if="tenGodsShow">({{ tenGodsOptions[5] }})</span>
          <el-select
            v-model="hourStemIndexValue"
            placeholder="Select"
            style="width: 140px"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in heavenlyStemsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="hourBranchIndexValue"
            placeholder="Select"
            style="width: 140px"
            class="m-0-20"
            popper-class="custom-select"
          >
            <el-option
              v-for="item in earthlyBranchesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select><span v-if="tenGodsShow">({{ tenGodsOptions[6] }})</span>&nbsp;&nbsp;
          <span class="padding-top">
            {{ heavenlyStemsFive[hourStemIndexValue] }} &nbsp;&nbsp; {{ earthlyBranchesFive[hourBranchIndexValue] }}
          </span>
        </div>
        <el-button type="primary" class="m-t-10" @click="rafting">排运</el-button>
        <el-button type="primary" class="m-t-10" @click="tenGodsAdd">十神</el-button>
        <el-button type="primary" class="m-t-10" @click="searchDatabase">查库</el-button>
        <div class="p-10-0" v-if="databaseOptions">
          <div>
            推算：{{ databaseOptions.narrate }}
          </div>
          <div class="p-10-0">
            结果：{{ databaseOptions.content }}
          </div>
        </div>
        <div v-if="raftingShow">
          <div class="flex">
            <div class="m-r-40">
              <h3>顺</h3>
              <div class="m-t-10" v-for="(item, index) in forwardSequenceOptions" :key="index">
                {{ item }}
              </div>
            </div>
            <div>
              <h3>逆</h3>
              <div class="m-t-10" v-for="(item, index) in backwardSequenceOptions" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* 移动端样式（通常指屏幕宽度小于768px） */
@media (max-width: 767px) {
  .margin-top {
    margin-top: 10px;
  }
  .padding-top {
    display: inline-block;
    padding-top: 10px;
  }
}
</style>

<style>
.custom-select .el-scrollbar .el-select-dropdown__wrap {
  max-height: none !important;
  overflow-y: auto !important;
}
.custom-select.el-select-dropdown {
  max-height: none !important;
}
</style>