import { resolveGradientColor } from './index';

test('ResolveGradientColor', () => {
  const v0 =
    'linear-gradient(150deg, rgba(117,17,184,1) 0%, rgba(72,120,60,.8) 30%, rgba(72,120,60,1) 100%)';

  expect(resolveGradientColor(v0)).toEqual({
    functionType: 'linear',
    angle: '150deg',
    colorStopList: [
      {
        color: 'rgba(117,17,184,1)',
        stop: '0%',
      },
      {
        color: 'rgba(72,120,60,.8)',
        stop: '30%',
      },
      {
        color: 'rgba(72,120,60,1)',
        stop: '100%',
      },
    ],
  });
});
