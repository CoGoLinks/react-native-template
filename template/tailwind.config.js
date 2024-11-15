const plugin = require('tailwindcss/plugin');
const colors = require('./theme/colors');
const styles = require('./theme/styles');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    // border-*
    borderWidth: {
      0: '0px',
      DEFAULT: '1px',
      1: '1rpx',
      2: '2rpx',
      4: '4rpx',
      6: '6rpx',
      8: '8rpx',
      10: '10rpx',
    },
    // p-* pt-* pb-* pl-* pr-* px-* py-*
    padding: {
      0: '0px',
      10: '10rpx',
      20: '20rpx',
      30: '30rpx',
      40: '40rpx',
      50: '50rpx',
      60: '60rpx',
      70: '70rpx',
      80: '80rpx',
      90: '90rpx',
      100: '100rpx',
    },
    // mp-* mt-* mb-* ml-* mr-* mx-* my-*
    margin: {
      0: '0px',
      10: '10rpx',
      20: '20rpx',
      30: '30rpx',
      40: '40rpx',
      50: '50rpx',
      60: '60rpx',
      70: '70rpx',
      80: '80rpx',
      90: '90rpx',
      100: '100rpx',
    },
    // rounded-*
    borderRadius: {
      4: '4rpx',
      6: '6rpx',
      8: '8rpx',
      10: '10rpx',
      12: '12rpx',
      14: '14rpx',
      16: '16rpx',
      18: '18rpx',
      20: '20rpx',
      22: '22rpx',
      24: '24rpx',
      26: '26rpx',
      28: '28rpx',
      30: '30rpx',
      32: '32rpx',
      34: '34rpx',
      36: '36rpx',
      38: '38rpx',
      40: '40rpx',
      42: '42rpx',
      44: '44rpx',
      46: '46rpx',
      48: '48rpx',
      50: '50rpx',
      52: '52rpx',
    },
    // w-*
    width: {
      0: 0,
      1: '10rpx',
      2: '20rpx',
      3: '30rpx',
      4: '40rpx',
      5: '50rpx',
      6: '60rpx',
      7: '70rpx',
      8: '80rpx',
      9: '90rpx',
      10: '100rpx',
      11: '110rpx',
      12: '120rpx',
      13: '130rpx',
      14: '140rpx',
      15: '150rpx',
      16: '160rpx',
      17: '170rpx',
      18: '180rpx',
      19: '190rpx',
      20: '200rpx',
      22: '220rpx',
      24: '240rpx',
      26: '260rpx',
      28: '280rpx',
      30: '300rpx',
      35: '350rpx',
      40: '400rpx',
      45: '450rpx',
      50: '500rpx',
      60: '600rpx',
      70: '700rpx',
      80: '800rpx',
      '1/2': '50%',
      '1/3': '33.33333%',
      '1/4': '25%',
      '1/5': '20%',
      '2/3': '66.66667%',
      '3/4': '75%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      full: '100%',
    },
    // h-*
    height: {
      0: 0,
      1: '10rpx',
      2: '20rpx',
      3: '30rpx',
      4: '40rpx',
      5: '50rpx',
      6: '60rpx',
      7: '70rpx',
      8: '80rpx',
      9: '90rpx',
      10: '100rpx',
      11: '110rpx',
      12: '120rpx',
      13: '130rpx',
      14: '140rpx',
      15: '150rpx',
      16: '160rpx',
      17: '170rpx',
      18: '180rpx',
      19: '190rpx',
      20: '200rpx',
      22: '220rpx',
      24: '240rpx',
      26: '260rpx',
      28: '280rpx',
      30: '300rpx',
      35: '350rpx',
      40: '400rpx',
      45: '450rpx',
      50: '500rpx',
      60: '600rpx',
      70: '700rpx',
      80: '800rpx',
      '1/2': '50%',
      '1/3': '33.33333%',
      '1/4': '25%',
      '1/5': '20%',
      '2/3': '66.66667%',
      '3/4': '75%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      full: '100%',
      'btn-lg': '96rpx',
      'btn-xl': '88rpx',
      'btn-sm': '64rpx',
      'btn-xs': '56rpx',
    },
    // text-*
    fontSize: {
      xs: ['24rpx', '32rpx'],
      sm: ['26rpx', '36rpx'],
      base: ['28rpx', '40rpx'],
      xl: ['30rpx', '44rpx'],
      '2xl': ['32rpx', '48rpx'],
      '3xl': ['34rpx', '54rpx'],
      '4xl': ['36rpx', '56rpx'],
      '5xl': ['38rpx', '58rpx'],
      '6xl': ['40rpx', '60rpx'],
      '7xl': ['46rpx', '62rpx'],
      '8xl': ['52rpx', '64rpx'],
      24: ['24rpx', '32rpx'],
      26: ['26rpx', '36rpx'],
      28: ['28rpx', '40rpx'],
      30: ['30rpx', '44rpx'],
      32: ['32rpx', '48rpx'],
      34: ['34rpx', '54rpx'],
      36: ['36rpx', '56rpx'],
      38: ['38rpx', '58rpx'],
      40: ['40rpx', '60rpx'],
      42: ['42rpx', '62rpx'],
      44: ['44rpx', '64rpx'],
      46: ['46rpx', '66rpx'],
      48: ['48rpx', '68rpx'],
      50: ['50rpx', '70rpx'],
      52: ['52rpx', '72rpx'],
    },
    // font-*
    fontWeight: {
      w1: '100',
      w2: '200',
      w3: '300',
      w4: '400',
      w5: '500',
      w6: '600',
      w7: '700',
      w8: '800',
      w9: '900',
    },
    // bg-*
    colors: colors.colors,
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(styles.style);
    }),
  ],
};
