import { tw } from '@/style';
const styles = {
  normalText: {
    fontSize: '32rpx',
  },
  currentText: {
    color: tw.color('c-primary'),
    fontSize: '32rpx',
  },
  currentIcon: {
    width: '54rpx',
    height: '8rpx',
    backgroundColor: `${tw.color('c-primary')}47`,
    marginTop: '4rpx',
  },
  normalIcon: {
    width: '54rpx',
    height: '8rpx',
    marginTop: '4rpx',
  },
  normalInput: {
    borderColor: 'transparent',
  },
  headerView: {
    marginBottom: '34rpx',
  },
  inputView: {
    backgroundColor: tw.color('c-n2'),
    borderRadius: '4rpx',
    overflow: 'hidden',
  },
  borderLine: {
    width: '2rpx',
    height: '56rpx',
    backgroundColor: '#DEDEDE',
  },
  codeText: {
    color: tw.color('c-primary'),
    fontSize: '26rpx',
  },
  normalCodeText: {
    fontSize: '26rpx',
    color: '#787B80',
  },
  ruleText: {
    color: tw.color('c-mw'),
  },
  checkBox: { backgroundColor: tw.color('c-w'), borderColor: '#CFCFCF' },
};
export default styles;
