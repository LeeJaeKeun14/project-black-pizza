const movieCount = [11588401, 4942629, 307866, 146076, 220161, 2786453, 4691845, 7377554, 1359285, 3561425, 2868649, 612027, 139399, 680320]
export const movie = {
  yearMonth: ['2020_1', '2020_2', '2020_3', '2020_4', '2020_5', '2020_6', '2020_7', '2020_8', '2020_9', '2020_10', '2020_11', '2020_12', '2021_1', '2021_2'].map(e => e.split('_').map((item, i) => i === 0 ? item + '년 ' : item + '월').join('')),
  count: movieCount.map(e => ((e - Math.min(...movieCount)) / Math.max(...movieCount)) * 100)
}
const netflixCount = [4704524, 5012431, 5813026, 7109803, 7390568, 7040598, 7205743, 7816590, 7857064, 7898026, 7604538, 8840698, 9806897, 10013283];
export const netflix = {
  yearMonth: ['2020_1', '2020_2', '2020_3', '2020_4', '2020_5', '2020_6', '2020_7', '2020_8', '2020_9', '2020_10', '2020_11', '2020_12', '2021_1', '2021_2'].map(e => e.split('_').map((item, i) => i === 0 ? item + '년 ' : item + '월').join('')),
  count: netflixCount.map(e => ((e - Math.min(...netflixCount)) / Math.max(...netflixCount)) * 100)
}

const increaseData = {

  '2020_01': 7,
  '2020_02': 80,
  '2020_03': 391,
  '2020_04': 156,
  '2020_05': 229,
  '2020_06': 459,
  '2020_07': 281,
  '2020_08': 2415,
  '2020_09': 1306,
  '2020_10': 733,
  '2020_11': 2904,
  '2020_12': 10432,
  '2021_01': 4878,
  '2021_02': 4060,
  '2021_03': 3897,
  '2021_04': 5803,
  '2021_05': 6030,
  '2021_06': 6258,
  '2021_07': 14504,
  '2021_08': 15193,
  '2021_09': 21382,
  '2021_10': 18840,
  '2021_11': 36267,
  '2021_12': 33827
}

export const increase = {
  yearMonth: Object.keys(increaseData).map(e => e.split('_').map((item, i) => i === 0 ? item + '년 ' : item + '월').join('')),
  count: Object.values(increaseData).map(e => (e - Math.min(...Object.values(increaseData))) / Math.max(...Object.values(increaseData)) * 100)
}
export const chartColor = [
  "#b84f55",
  "#ffeea1",
  "#fbefb5",
  "#F4EBC1",
  "#f9f2d1",
  "#ffff30"
]
